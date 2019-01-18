import { Router } from 'express'

import films from './films'

export default (db) => {
  const router = Router()

  films(router)

  return router
}
