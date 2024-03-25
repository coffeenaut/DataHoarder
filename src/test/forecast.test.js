const axios = require("axios")
const samples = require('../schema/sample')
const toolkit = require('../util/tools')
jest.mock("axios");
it("returns the city for forecasted weather", async () => {
    axios.get.mockResolvedValue(samples.forecast)
    const forecast = await toolkit.GetWeatherForecast(94583, 1)
    expect(forecast.city).toEqual("Sunol");
})