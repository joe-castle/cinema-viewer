/**
 * Defines the structure of the parsed xml response from syndication/film_times.xml
 */
interface IXmlFilmTimes {
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

interface IParsedFilmTimes {
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
interface IXmlListings {
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
        film: IXmlFilmListing[]
      }]
    }]
  }
}

interface IXmlFilmListing {
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

interface IParsedListing {
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
interface IYoutubeSnippetSearch {
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