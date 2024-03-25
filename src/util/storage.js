const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const weatherModel = require('../schema/weather')
const db_connectString = process.env.db_connection_string
const StoreData = async (data) => {
    try{
        await mongoose.connect(db_connectString)
        await weatherModel.create(data)
        mongoose.connection.close()
    }
    catch(e) {
        throw e
    }
}
module.exports =  {StoreData}