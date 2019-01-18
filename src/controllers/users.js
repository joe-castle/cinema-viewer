export default (router) => {
  router.get('/api/user', (req, res) => {
    res.json(req.user)
  })
}
