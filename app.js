const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/routes')
const mongoUrl = require('./utils/config')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const loginRouter = require('./controllers/login')



mongoose.connect(mongoUrl)

app.use(express.json())
app.use(express.static('dist'))
morgan.token('body',(req) => JSON.stringify(req.body) || '{}')
app.use(morgan(':method :url :status :response-time ms :res[content-length] bytes :body'))
app.use(middleware.tokenExtractor)


app.use('/api/users',usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app