const fs = require('fs')
const axios = require('axios')
const dotenv = require('dotenv').config()


/** Checks if object is empty
 * schema only goes one level deep
 * @param {obj} obj object to validate against
 * @returns {true|false} boolean if object contains any properties 
 **/
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
/** Gets a schema of obj with parameters where values contain mapped path of json param
 * schema only goes one level deep
 * @param {response} obj json typically from web response
 * @param {objName} prop name of schema file
 * @returns {*|null} Object with properties defined in schema with mapped data from response
 **/
const ParseResponseToObj = (response, objName) => {
    const filePath = `./src/schema/${objName}.json`
    let newObject = {}
    if(!fs.existsSync(filePath)) {
        throw `Schema '${objName}' does not exist`
    }
    else {
        const schemaObj = fs.readFileSync(filePath, 'utf8')
        const json = JSON.parse(schemaObj)
        const values = Object.entries(json)
        
        for(let i of values) {
            const property = i[0]
            const value = i[1]
            if(typeof value == 'object' && value !== null) {
                //array condition
                if(Array.isArray(value) && value.length > 0) {
                    //use first object of array from schema
                    if(value.length > 0 && value[0].path) {
                        const arrayPath = value[0].path
                        const arrayList = getArrayList(arrayPath, response)
                        const newArray = []
                        const arrayValues = Object.entries(value[0])
                        for(let item of arrayList) {
                            let tObj = {}
                            for(let ii = 0; ii < arrayValues.length; ii++) {
                                if(arrayValues[ii][0] !== "path") {
                                    tObj[arrayValues[ii][0]] = item[arrayValues[ii][1]]
                                }
                                    

                            }
                            if(!isObjectEmpty(tObj)) 
                                newArray.push(tObj)
                        }
                        newObject[property] = newArray
                    }
                        
                    //get array object to parse through
                }
                //object condition
                else { 
                    const subValues = Object.entries(value)
                    let newObj = {}
                    for (let ii of subValues) {
                        newObj[ii[0]] = GetValueFromObject(ii[1], response)
                    }
                    newObject[property] = newObj
                }
            }
            else {
                newObject[property] = GetValueFromObject(value, response)
            }
        }
    }
    return newObject
}
/** Get a nested property from an object without returning any errors.
 * If the property or property chain doesn't exist, undefined is returned.
 * @param {obj} obj The object to check
 * @param {path} prop The property or property chain to get (e.g. obj.prop1.prop1a or obj['prop1'].prop2)
 * @returns {*|undefined} The value of the objects property or undefined if the property doesn't exist
 **/
function GetValueFromObject( path, obj, index = 0) {
    let propertyValue = null
    const parsed = path.split(".")
    let tempObj = obj
    let hasSubArray = false
    // let hasInitialSubArray = false
    for(let prop of parsed) {
        let propName = prop
        let containsArrayVal = getArrayField(prop)
        if(containsArrayVal) {
            propName = containsArrayVal.path
            hasSubArray = true
        }
        if(hasSubArray) {
            if(containsArrayVal.initial)
                tempObj = tempObj[propName][0]
            else {
                let nArray = []
                for(let i = 0; i< tempObj[propName].length; i++) {
                    let nObj = {}
                    nObj[propName] = tempObj[propName][i]
                    nArray[i] = nObj
                }
                tempObj = nArray
            }
            hasSubArray = false
        }
        else 
                tempObj = tempObj[propName]
    }
    propertyValue = tempObj
    return propertyValue
}
/** Parses the tail end of the path string for array characters '[]' & [0]
 * @param {obj} path The string of path to parse
 * @returns {*|false} Object with original path and array parameters or false if the path is not array
 **/
const getArrayField = path => {
    if(path.length > 2) {
        let pathObj = {}
        //'[]' defined in schema treats property value as array of props 
        const tailString = path.substring(path.length - 3, path.length)
        if(tailString[0] === "[" &&  tailString[2] == "]") {
            pathObj.path = path.substring(0, path.length -3)
            if(tailString[1] == "0") 
                pathObj.initial = true
            else
                pathObj.initial = false
        }  
        if(pathObj.path) 
            return pathObj
        else
            return false

    }
    return false
}
/** Traverses an object given the path and retreives the array defined by '[x]' in schema
 * @param {array} path The string of path to parse
 * @param {obj} json object to retreive values
 * @returns {*|[] } array defined from path or empty array
 **/
function getArrayList(path, json) {
    const parsed = path.split(".")
    let tempObj = json
    let hasSubArray = false
    // let hasInitialSubArray = false
    for(let prop of parsed) {
        let propName = prop
        let containsArrayVal = getArrayField(prop)
        if(containsArrayVal) {
            propName = containsArrayVal.path
            hasSubArray = true
        }
        if(hasSubArray) {
            if(containsArrayVal.initial)
                tempObj = tempObj[propName][0]
            else {
                tempObj = tempObj[propName]
                break
            }
            hasSubArray = false
        }
        else
            tempObj = tempObj[propName]
    }
    return tempObj
}
/** Traverses an object given the path and retreives the array defined by '[x]' in schema
 * @param {obj} rType The request name for a given api
 * @param {obj} p object that holds parameter arguments to send in request
 * @returns {*} A formatted url to send http requests
 **/
function getApiQuery(qType, p) {
    const requestUrl = process.env.API
    const apiKey = process.env.API_KEY
    const queryType = qType

    let formattedUrl = requestUrl
    if(queryType == "forecast") {
        formattedUrl += "/forecast.json"
    }
    //appends request parameters
    formattedUrl += `?key=${apiKey}`
    let params = Object.entries(p)
    for(let i=0; i < params.length; i++) {
        formattedUrl += `&${params[i][0]}=${params[i][1]}`
    }
    return formattedUrl
}
/** Traverses an object given the path and retreives the array defined by '[x]' in schema
 * @param {int | string} location string (city) or int (zip) to query weather for
 * @param {int} numOfDays Forecast for the certain number of days
 * @returns {*} Parsed object defined by weather schema with data returned from weather api
 **/
async function GetWeatherForecast (location, numOfDays) {
    let response = {}
    let weatherData = null
    if(location && numOfDays) {
        let params = {
            q: location,
            days: numOfDays,
        }
        const weatherForecastApi = getApiQuery("forecast", params)
        weatherData = await axios.get(weatherForecastApi)
    }
    if(weatherData) {
        response = ParseResponseToObj(weatherData.data, "weatherForecast")
    }
    return response
}
module.exports = {ParseResponseToObj, GetWeatherForecast}