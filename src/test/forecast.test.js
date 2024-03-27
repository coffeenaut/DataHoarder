const axios = require("axios")
const samples = require('../schema/sample')
const toolkit = require('../util/tools')
jest.mock("axios");
describe("API Query", function() {
    it("returns forecasted weather for a specified city", async () => {
        axios.get.mockResolvedValue(samples.forecast)
        const forecast = await toolkit.GetWeatherForecast(94583, 1)
        expect(forecast.city).toEqual("Sunol");
    })
    it("returns current weather data for a specified city", async () => {
        axios.get.mockResolvedValue(samples.currentWeather)
        const forecast = await toolkit.GetCurrentWeather(94583)
        expect(forecast.city).toEqual("San Ramon");
    })
})
describe("Document Parser", function () {
    it("returns an populated document defined by given schema", () => {
        const weatherSample = samples.forecast
        const parsedForecast = toolkit.ParseResponseToObj(samples.forecast.data, "weatherForecast")
        expect(parsedForecast.condition).toEqual("Partly Cloudy")
    })
})