const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=edcc04ac00488a205e418c2b56349f1f&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to contact to weather services', {})
        } else if (response.body.current == undefined) {
            callback('request failed', {})
        } else {
            callback(undefined, response.body.current.temperature)
        }
    })
}

module.exports = forecast