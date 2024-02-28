const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const weatherModel = require('../schema/weather')
const db_connectString = process.env.db_connection_string

const StoreData = async (data) => {
    mongoose.connect(db_connectString, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB connected...')
        weatherModel.create(data, function (e) {
            if(e)
                console.log(e)
        })
    })
    .catch(err => console.log(err));
    mongoose.connection.close()
}

module.exports =  { StoreData }