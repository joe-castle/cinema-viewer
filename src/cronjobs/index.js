import schedule from 'node-schedule'

import fetchFilms from './fetchFIlms'

schedule.scheduleJob('0 0 2 ? * * *', fetchFilms)
