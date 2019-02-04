import { Router } from 'express'

import films from './films'
import users from './users'

const router = Router()

films(router)
users(router)

export default router
