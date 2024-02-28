const storage = require('./util/storage')
const request = require('./util/request')
const {ParseResponseToObj} = require('./util/tools')
const fs = require('fs')
const dotenv = require('dotenv').config()
var argv = require('minimist-lite')(process.argv.slice(2))
const forcastApi = process.env.weather_api
var datetime = argv.d

if(datetime) {
    (async () => {
        // let response =  await request.requestData(forcastApi)

        //testing//
        const filePath = `./src/schema/sample.json`
        if(!fs.existsSync(filePath)) {
            console.log("sample is not correct")
        }
        else {
            const stringObj = fs.readFileSync(filePath, 'utf8')
            const jsonObj = JSON.parse(stringObj)
            let gObj = ParseResponseToObj(jsonObj, "weatherForecast")
            storage.StoreData(gObj)
        }
        
    })()
    

}
// if(tFlag) {
//     storage.StoreData(tFlag)
// }