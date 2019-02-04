import axios from 'axios'
import { parseString } from 'xml2js'

import { getAllFilms, insertOrUpdateMultipleFilms } from '../data/models/films'

const { CINEMA_ACCESS_TOKEN } = process.env

function processTitle (title) {
  return title.match(/(?:\((.+?)\))?/)[1] || '2D'
}

function processShowtimes (filmObj) {
  return Object
    .keys(filmObj)
    .filter(time => time.startsWith('Time'))
    .reduce((prev, curr) => [...prev,
      ...filmObj[curr].split(' ').map(time =>
        new Date(`${filmObj[`Date${curr.slice(-2)}`].replace(/(\w+) (\d+) (\w+)/, `$2 $3 ${new Date().getFullYear()}`)} ${time}:00`)
      )
    ], [])
}

function fetchFilms (attempt) {
  return axios.all([
    axios.get(`https://www.cineworld.co.uk/api/quickbook/films?key=${CINEMA_ACCESS_TOKEN}&full=true&cinema=104`),
    axios.get('https://www.cineworld.co.uk/syndication/film_times.xml')
  ])
    .then(axios.spread((films, times) => {
      return new Promise((resolve) => {
        parseString(times.data, (err, results) => {
          if (err) console.log(err)

          const parsedXml = results.relatedData.row
            .filter((row) => row.$.key === '104')
            .map(({ column }) => column.reduce((prev, curr) => ({ ...prev, [curr.$.name]: curr._ }), {}))
            .reduce((prev, curr) => ({ ...prev, [curr.edi]: curr }), {})

          const processedFilms = []

          films.data.films.forEach((film) => {
            const format = processTitle(film.title)
            const existingFilm = processedFilms.find((found) => found.title === parsedXml[film.edi].Title)

            if (existingFilm) {
              existingFilm.edis.push(film.edi)
              existingFilm.showtimes[format] = processShowtimes(parsedXml[film.edi])
            } else {
              processedFilms.push({
                edis: [film.edi],
                title: parsedXml[film.edi].Title,
                poster: film.poster_url,
                url: film.film_url,
                date_added: new Date(),
                unlimited: /unlimited/gi.test(parsedXml[film.edi].Title),
                showtimes: {
                  [format]: processShowtimes(parsedXml[film.edi])
                }
              })
            }
          })

          resolve(processedFilms)
        })
      })
    }))
    .catch((err) => {
      console.log('Error fetching films:', err.message)

      if (attempt > 0) {
        console.log('\nTrying again, attempt number:', attempt)
        return fetchFilms(attempt - 1)
      } else {
        console.log('Tried 5 times with no success, stopping...')
      }
    })
}

module.exports = () =>
  fetchFilms(5)
    .then((results) => {
      insertOrUpdateMultipleFilms(results)

      getAllFilms()
        .then((results) => {
          const expiredFilms = results
            .filter((film) => !results.find((result) => result.title === film.title))
            .map((film) => ({ ...film, showTimes: null }))

          if (expiredFilms.length > 0) {
            insertOrUpdateMultipleFilms(expiredFilms)
          }
        })

      return results
    })
