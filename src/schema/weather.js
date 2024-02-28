const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  date: Date,
  city: String,
  condition: String,
  high: {
    predicted: mongoose.Decimal128,
    actual: mongoose.Decimal128
  },
  low: {
    predicted: mongoose.Decimal128,
    actual: mongoose.Decimal128
  },
  entries: [{hour: String, temp: mongoose.Decimal128}]

});

const Weather = mongoose.model("Weather", WeatherSchema);

module.exports = Weather;
