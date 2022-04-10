const notFound = (req, res) => {
  res.status(404).send('Sorry, we cannot find what you are looking for...')
}

module.exports = notFound