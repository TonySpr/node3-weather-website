const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0743de7832252642127c43db468c3364&query=' + latitude + ',' + longitude + '&units=f'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined) 
               } else if  (response.body.error) {
                   callback('Unable to fine location!', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions + ' It is currently ' + response.body.current.temperature + ' but it feels like ' + response.body.current.feelslike)
        }
    })

}

module.exports = forecast
