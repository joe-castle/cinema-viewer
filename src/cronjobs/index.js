import schedule from 'node-schedule'

import fetchFilms from './fetchFilms'

schedule.scheduleJob('0 3 * * *', fetchFilms)
