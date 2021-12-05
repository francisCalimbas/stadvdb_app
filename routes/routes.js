const express = require('express')
const path = require('path')

// include controllers here
const controller = require('../controllers/controller')

// add other controllers above this line^

const app = express()
app.set('views', path.join(__dirname, '../views'))

//GET requests
app.get('/', controller.getHome)
app.get('/directors', controller.getDirectors)
app.get('/movies', controller.getMovies)
app.get('/genres', controller.getGenres)
app.post('/fetchDirectors', controller.fetchDirectors)



module.exports = app
