const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
})

const routes = require('./routes/routes')
const port = process.env.PORT || 8080;
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, '/public')))


// routes
app.use('/', routes)

// error page
app.use((req, res) => {
  res.render('error', {
    styles: ['style'],
    title: 'Error: Page Not Found'
  })
})

app.listen(port, function() {
  console.log('APP: Running at Port ' + port);
});

module.exports = app
