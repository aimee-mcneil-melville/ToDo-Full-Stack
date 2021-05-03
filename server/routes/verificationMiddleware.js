function verifyUser (req, res, next) {
  const authenticatedUser = req.user
  const { userId } = req.body

  if (authenticatedUser.id !== userId) {
    res.status(401).json({
      error: {
        title: 'Unauthorized'
      }
    })
    return
  }

  next()
}

module.exports = {
  verifyUser
}
