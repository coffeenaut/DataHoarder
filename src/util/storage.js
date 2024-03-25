const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const weatherModel = require('../schema/weather')
const db_connectString = process.env.db_connection_string
const StoreData = async (data) => {
    try{
        await DBConnect()
        weatherModel.create(data)
        DBDisconnect();
    }
    catch(e) {
        throw e
    }
}
async function DBConnect() {
    mongoose.connect(db_connectString)
    .then(() => {console.log("mongo connected")})
    .catch(err => {throw err})
}
async function DBDisconnect() {
    mongoose.connection.close()
}
module.exports =  { StoreData}