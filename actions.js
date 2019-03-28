var DB = require("./db.js")
let db = new DB()
const moment = require("moment")
const sendMail = require("./sendMail")
const { getDocsUrl } = require("./lib.js")

var doAction = (action, params) => {
    switch(action){
        case "simpleQuery":
        return getDetails(params)
        break;
        case "getContact":
        return getContact(params)
        break;
        case "docs":
        return getDocuments(params)
        break;
        case "request":
        return raiseRequest(params[1].parameters)
        break;
        default:
        return null
        break;
    }
}
exports.doAction = doAction

var getDetails = (params) => {
    switch(params.category.toLowerCase()){
        case 'benefits':
            return db.getBenefits(params)
        break;
        case 'leave':
            return db.getLeave(params)
        break;
        case 'pay':
            return db.getSalary(params)
        break;
        case 'ahm':
        case 'performance':
        case 'event':
        console.log("HI")
            return db.getEvent(params)
        break;
        default:
        break;
    }
}

var getContact = (params) => {
    return db.getContacts(params)
    .then((result) => {
            return Promise.resolve(result)
    })

}

var getDocuments = (params) => {
    console.log("in")
    var url =  getDocsUrl(params)
            return Promise.resolve(url)
    
}

var raiseRequest = (params) => {
    return sendMail(params)
    .then((result) => {
            return Promise.resolve(result)
    })
}

