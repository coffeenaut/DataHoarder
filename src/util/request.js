const axios  = require('axios')
const webFormater = (link, args) => {
    let formattedArgs = ""
    if (args) {
        for(let i =0; i < args.length; i++) {
            formattedArgs += `${args[i][0]}=${args[i][1]}&`
        }
    }     
    return (`${link}?${formattedArgs.slice(0, -1)}`) //trim last '&'
}
async function requestData (link) {
    const requestArgs = {
        key: 'df784b7f4ee845d494f201804242501',
        q: '94583',
        days: '2'
    }
    const requestLink = webFormater(link, Object.entries(requestArgs))
    return await axios.get(requestLink)
    .then(response => {
        if(response.status == 200 && response.data) {
          return response.data
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return null;
    })
    .finally(() => {
        return null
    })
    
}
module.exports = {requestData}