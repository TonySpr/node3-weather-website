const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./Utils/forecast')
const geocode = require('./Utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//Set up handlebars engine config views location
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const publicDirectoryPath2 = path.join(__dirname, '../public/help.html')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up static directories to serve
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dominique A. Spradley'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About Essential Reflections',
      name: 'Dominique A. Spradley'  
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page for essential detailing',
        name: 'Dominique A. Spradley',
        helpTxt: 'If you require help with price please contact Nick at 540-657-7837'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

 })
 
 app.get('/products', (req, res) => {
     if (!req.query.search) {
         return res.send({
             error: 'You must provide a location!'
         })
     }

     console.log(req.query.search)
     res.send({
         product: []
     })
 })
 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anthony Spradley',
        errorMsg: 'Help Article Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Anthony Spradley',
        errorMsg: 'Page Not Found?'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
