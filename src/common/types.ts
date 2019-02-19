import { MongoClient, Db } from 'mongodb'

/**
 * Redux store state
 */
export interface State {
  films: Film[],
  user: User[]
}

/**
 * Defines the structure of a User object
 */
export interface User {
  _id: string,
  name: {
    givenName: string,
    familyName: string
  }
}

/**
 * Defines the structure of a film object
 */
export interface Film {
  _id?: string,
  title: string,
  dateAdded?: Date,
  edis: string[],
  poster: string,
  releaseDate: Date,
  showtimes: null | {
    [key: string]: Showtime[]
  },
  synopsis: string,
  trailer?: string,
  unlimited: boolean,
  url: string
  userData?: UserData,
  [key: string]: any
}

/**
 * Defines the structure of a showtime object
 */
export interface Showtime {
  time: Date,
  url: string,
  audioType?: string
}

/**
 * Defines the structure of a userData objcet
 */
export interface UserData {
  _id: string,
  filmId: string,
  userId: string,
  favourite?: boolean,
  hidden?: boolean,
  new?: boolean,
  watched?: Watched,
  [key: string]: any
}

/**
 * Defines the structure of a watched object
 */
export interface Watched {
  rating: number,
  format: string,
  notes: string,
  dateTime: Date
}

/**
 * Defines the object used to specify trailer height/width
 */
export interface Dimensions {
  width: number,
  height: number
}

/**
 * Connection interface for mongodb client connection
 */
export interface Connect {
  (url: string, db: string): Promise<MongoClient>,
  _db: Db
}

/**
 * Defines the structure of the parsed xml response from syndication/film_times.xml
 */
export interface XmlFilmTimes {
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

export interface ParsedFilmTimes {
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
export interface XmlListings {
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

export interface XmlFilmListing {
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

export interface ParsedListing {
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
export interface YoutubeSnippetSearch {
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

/**
 * Generic type for a function that returns a boolean based on a value
 */
export type Predicate <T> = (value: T) => boolean
