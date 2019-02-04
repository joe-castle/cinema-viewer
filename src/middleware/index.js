export function ensureAuthenticated (req, res, next) {
  return req.isAuthenticated()
    ? next()
    : res.status(401).send('This actions requires authentication, please login and try again')
}
