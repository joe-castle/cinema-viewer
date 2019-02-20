import axios, { AxiosResponse } from 'axios'
import { parseString } from 'xml2js'

import { getAllFilms, insertOrUpdateMultipleFilms } from '../data/models/films'
import { Film } from '../common/types'

const { YOUTUBE_API_KEY } = process.env

function processTitle (title: string): string {
  const matchedTitle: RegExpMatchArray|null = title.match(/^(?:\((.+?)\))? ?(.+)/)

  return matchedTitle && matchedTitle[1]
    ? matchedTitle[1]
    : '2D'
}

function parseXml <T> (xml: string): Promise<T> {
  return new Promise((resolve, reject) => {
    parseString(xml, (err: Error, results: T) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

export default async function fetchFilms (): Promise<Object> {
  try {
    const [ films, listings ] = await axios.all<AxiosResponse<string>>([
      axios.get('https://www.cineworld.co.uk/syndication/film_times.xml'),
      axios.get('https://www.cineworld.co.uk/syndication/listings.xml')
    ])
    const existingFilms: Film[] = await getAllFilms()

    const filmsXml: XmlFilmTimes = await parseXml<XmlFilmTimes>(films.data)
    const listingsXml: XmlListings = await parseXml<XmlListings>(listings.data)

    const parsedFilms: { [key: string]: ParsedFilmTimes } = filmsXml.relatedData.row
      .filter((row) => row.$.key === '104')
      .map(({ column }) => <ParsedFilmTimes> column.reduce((prev, curr) => ({ ...prev, [curr.$.name]: curr._ }), {}))
      .reduce((prev, curr) => ({ ...prev, [curr.edi]: curr }), {})

    const parsedListings: ParsedListing[] = listingsXml.cinemas.cinema
      .filter((cinema) => cinema.$.id === '104')
      .reduce((prev: XmlFilmListing[], curr: XmlListings['cinemas']['cinema'][0]): XmlFilmListing[] => [...prev, ...curr.listing[0].film], [])
      .map((film) => <ParsedListing> ({ ...film.$, shows: film.shows[0].show.map((show) => ({ ...show.$, time: new Date(show.$.time) })) }))

    let processedFilms: Film[] = []

    parsedListings.forEach((film) => {
      const format: string = processTitle(film.title)
      const existingFilm: Film | undefined = processedFilms.find((found) => found.title === parsedFilms[film.edi].Title)

      if (existingFilm) {
        if (existingFilm.showtimes) {
          existingFilm.showtimes[format] = film.shows
        }

        existingFilm.edis.push(film.edi)
      } else {
        processedFilms.push({
          edis: [film.edi],
          title: parsedFilms[film.edi].Title,
          synopsis: parsedFilms[film.edi].synopsis,
          releaseDate: new Date(film.release.replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$2/$1')),
          poster: `https://www.cineworld.co.uk${parsedFilms[film.edi].poster}`,
          url: `https://www.cineworld.co.uk${film.url}`,
          unlimited: /unlimited/gi.test(parsedFilms[film.edi].Title),
          showtimes: {
            [format]: film.shows
          }
        })
      }
    })

    const expiredFilms: Film[] = existingFilms
      .filter((film) => film.showtimes && !processedFilms.find((processed) => processed.title === film.title))
      .map((film) => <Film> Object
        .keys(film)
        .filter((key) => key !== '_id' && key !== 'dateAdded')
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: curr === 'showtimes' ? null : film[curr]
        }), {})
      )

    let newFilms: Film[] = processedFilms
      .filter((processed) => !existingFilms.find((film) => film.title === processed.title))

    const trailers: YoutubeSnippetSearch[] = (await axios
      .all<AxiosResponse<YoutubeSnippetSearch>>(newFilms.map((film) => axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(`${film.title} trailer`)}&maxResults=1&key=${YOUTUBE_API_KEY}`))))
      .map((trailer) => trailer.data)

    newFilms = newFilms.map((film, index) =>
      ({ ...film, trailer: `https://www.youtube.com/watch?v=${trailers[index].items[0].id.videoId}` }))

    insertOrUpdateMultipleFilms(
      [
        ...expiredFilms,
        ...newFilms,
        ...processedFilms.filter((processed) =>
          !expiredFilms.find((film) => film.title === processed.title) && !newFilms.find((film) => film.title === processed.title))
      ],
      (film) => ({ $set: film, $setOnInsert: { dateAdded: new Date() } })
    )

    return {
      expiredFilms,
      newFilms,
      trailers,
      processedFilms
    }
  } catch (err) {
    console.log('Error whilst fetching films: ', err.message, '\n', err.stack)
    
    return {
      error: err.message
    }
  }
}

/**
 * Interfaces for all various stages of parsing in the fetchfilms function
 */

/**
 * Defines the structure of the parsed xml response from syndication/film_times.xml
 */
interface XmlFilmTimes {
  relatedData: {
    row: [{
      $: {
        key: string
      },
      column: [{
        _: string,
        $: {
          name: string
          [key: string]: string
        }
      }]
    }]
  }
}

interface ParsedFilmTimes {
  CinemaID: string,
  CinemaName: string,
  Title: string,
  Rating: string,
  Release: string,
  length: string,
  url: string,
  edi: string,
  poster: string,
  director: string,
  synopsis: string,
  cast: string,
  [key: string]: any
}

/**
 * Defines the structure of the parsed xml response from syndication/listings.xml
 */
interface XmlListings {
  cinemas: {
    cinema: [{
      $: {
        name: string,
        root: string,
        url: string,
        id: string,
        phone: string,
        address: string,
        postcode: string
      },
      listing: [{
        film: XmlFilmListing[]
      }]
    }]
  }
}

interface XmlFilmListing {
  $: {
    title: string,
    rating: string,
    url: string,
    edi: string,
    release: string
  },
  shows: [{
    show: [{
      $: {
        time: string,
        url: string
      }
    }]
  }]
}

interface ParsedListing {
  title: string,
  rating: string,
  url: string,
  edi: string,
  release: string,
  shows: [{
    time: Date,
    url: string
  }]
}

/**
 * Youtube snipper searchdata API response
 */
interface YoutubeSnippetSearch {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: [{
    kind: string,
    etag: string,
    id: {
      kind: string,
      videoId: string
    },
    snippet: {
      publishedAt: string,
      channelId: string,
      title: string,
      description: string,
      thumbnails: {
        default: {
          url: string,
          width: number,
          height: number
        },
        medium: {
          url: string,
          width: number,
          height: number
        },
        high: {
          url: string,
          width: number,
          height: number
        }
      },
      channelTitle: string,
      liveBroadcastContent: string
    }
  }]
}