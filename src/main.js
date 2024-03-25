const storage = require('./util/storage')
const request = require('./util/request')
const toolkit = require('./util/tools')
const logger = require('./util/logger')
const fs = require('fs')
const dotenv = require('dotenv').config()
var argv = require('minimist-lite')(process.argv.slice(2))
const forcastApi = process.env.weather_api

var forecastFlag = argv.f
var currentFlag = argv.c
if(forecastFlag) {
    ( async () => {
        try {
            logger.writeLog("info", "main: querying weather api (forecast)")
            const sunolForecast = await toolkit.GetWeatherForecast(94586, 1)
            logger.writeLog("info", "main: storing forecast data")
            await storage.StoreData(sunolForecast)()
        }
        catch (e) {
            logger.writeLog("error", e)
        }
        logger.writeLog("info", "main: forecast procedure finished")
    })()
}
if(currentFlag) {
    (async () => {
        try {
            logger.writeLog("info", "main: querying weather api (current)")
            const currentWeather = await toolkit.GetCurrentWeather(94586)
            console.log(hour)
            let query = {
                "date": date[0],
                "entries.hour": hour
            }
            let loggedWeather = {
                "actual": currentWeather.actual
            }
            await storage.UpdateData(query, loggedWeather)()
            logger.writeLog("info", "main: updating weather document")
        }
        catch (e) {
            logger.writeLog("error", e)
        }
        logger.writeLog("info", "main: current weather procedure finished")
    })()
}