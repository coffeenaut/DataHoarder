const storage = require('./util/storage')
const request = require('./util/request')
const toolkit = require('./util/tools')
const logger = require('./util/logger')
const fs = require('fs')
const dotenv = require('dotenv').config()
var argv = require('minimist-lite')(process.argv.slice(2))
const forcastApi = process.env.weather_api

var forecastFlag = argv.f
if(forecastFlag) {
    ( async () => {
        try {
            logger.writeLog("info", "main: querying weather api")
            const sunolForecast = await toolkit.GetWeatherForecast(94586, 1)
            logger.writeLog("info", "main: storing forecast data")
            storage.StoreData(sunolForecast)
        }
        catch (e) {
            logger.writeLog("error", e)
        }
        logger.writeLog("info", "main: forecast procedure finished")
    })()
}