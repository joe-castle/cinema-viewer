import { scheduleJob } from 'node-schedule'

import fetchFilms from './fetchFilms'

scheduleJob('0 3 * * *', fetchFilms)
