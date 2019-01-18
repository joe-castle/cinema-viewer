import { Router } from 'express'

import { ensureAuthenticated } from '../middleware'
import films from './films'
import users from './users'

const router = Router()
router.use(ensureAuthenticated)

films(router)
users(router)

export default router
