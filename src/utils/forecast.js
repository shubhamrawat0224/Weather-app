const request = require('request')
//latitude, longitude

const forecast = (latitude,logitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=83d9269245f9646574356ea8fd579fd8&query=New%20York'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast