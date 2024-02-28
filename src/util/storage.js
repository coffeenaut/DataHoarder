const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const db_connectString = process.env.db_connection_string

const StoreData = (data) => {
    mongoose.connect(db_connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
    // console.log("meow")
    console.log(data)
    mongoose.connection.close()
}

module.exports =  { StoreData }