const express = require('express')
const app = express()
// routes
const tasks = require('./routes/tasks')
const { connectDB } = require('./db/connect')
require('dotenv').config()
// Not found
const notFound = require('./utils/notFound')
// error handler
const errorHandler = require('./errors/errorHandler')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => console.log('connected to the database'))
      .catch((err) => console.log(err))
      app.listen(port, () => console.log(`Task Manager is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
