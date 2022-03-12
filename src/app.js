const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chandeshwar Kumar'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'get help contents',
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "YOu must provide the address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (!error) {
            forecast(longitude, latitude, (error, forecastData) => {
                if (!error) {
                    res.send({
                        location: location,
                        temperature: forecastData
                    })
                } else {
                    res.send({
                        error: error
                    })
                }
            })
        } else {
            res.send({
                error: error
            })
        }
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'not found'
    })
})



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})