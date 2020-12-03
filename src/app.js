const express = require('express')
const app = express()
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// routes
const router = require('./router')
app.use(router)

module.exports = app