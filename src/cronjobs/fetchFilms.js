import axios from 'axios'
import { parseString } from 'xml2js'

import { getAllFilms, insertOrUpdateMultipleFilms } from '../data/models/films'

const { YOUTUBE_API_KEY } = process.env

function processTitle (title) {
  return title.match(/^(?:\((.+?)\))? ?(.+)/)[1] || '2D'
}

// function processShowtimes (filmObj) {
//   return Object
//     .keys(filmObj)
//     .filter(time => time.startsWith('Time'))
//     .reduce((prev, curr) => [...prev,
//       ...filmObj[curr].split(' ').map(time =>
//         new Date(`${filmObj[`Date${curr.slice(-2)}`].replace(/(\w+) (\d+) (\w+)/, `$2 $3 ${new Date().getFullYear()}`)} ${time}:00`)
//       )
//     ], [])
// }

function parseXml (xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

export default async function fetchFilms () {
  try {
    const [ films, listings ] = await axios.all([
      axios.get('https://www.cineworld.co.uk/syndication/film_times.xml'),
      axios.get('https://www.cineworld.co.uk/syndication/listings.xml')
    ])
    const existingFilms = await getAllFilms()

    const filmsXml = await parseXml(films.data)
    const listingsXml = await parseXml(listings.data)

    const parsedFilms = filmsXml.relatedData.row
      .filter((row) => row.$.key === '104')
      .map(({ column }) => column.reduce((prev, curr) => ({ ...prev, [curr.$.name]: curr._ }), {}))
      .reduce((prev, curr) => ({ ...prev, [curr.edi]: curr }), {})

    const parsedListings = listingsXml.cinemas.cinema
      .filter((cinema) => cinema.$.id === '104')
      .reduce((prev, curr) => [...prev, ...curr.listing[0].film], [])
      .map((film) => ({ ...film.$, shows: film.shows[0].show.map((show) => ({ ...show.$, time: new Date(show.$.time) })) }))

    let processedFilms = []

    parsedListings.forEach((film) => {
      const format = processTitle(film.title)
      const existingFilm = processedFilms.find((found) => found.title === parsedFilms[film.edi].Title)

      if (existingFilm) {
        existingFilm.edis.push(film.edi)
        existingFilm.showtimes[format] = film.shows
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

    const expiredFilms = existingFilms
      .filter((film) => !processedFilms.find((processed) => processed.title === film.title))
      .map((film) => Object
        .keys(film)
        .filter((key) => key !== '_id' && key !== 'dateAdded')
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: curr === 'showtimes' ? null : film[curr]
        }), {})
      )

    let newFilms = processedFilms
      .filter((processed) => {
        const film = existingFilms.find((film) => {
          const found = film.title === processed.title
          return found
        })
        return !film
      })

    const trailers = (await axios
      .all(newFilms.map((film) => axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(`${film.title} trailer`)}&maxResults=1&key=${YOUTUBE_API_KEY}`))))
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
  }
}
