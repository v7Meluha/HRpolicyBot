var DB = require("./db.js")
let db = new DB()
const moment = require("moment")
const sendMail = require("./sendMail")
const { getDocsUrl } = require("./lib.js")

var doAction = (action, params) => {
    switch (action) {
        case "simpleQuery":
            return getDetails(params[0].parameters)
            break;
        case "request":
            return raiseRequest(params[0].parameters)
            break;
        case "getEvent":
            return getEvent(params[0].parameters)
            break;
        case "getContact":
            return getContact(params)
            break;
        case "docs":
            return getDocuments(params)
            break;
        default:
            return null
            break;
    }
}
exports.doAction = doAction

var getDetails = (params) => {
    params.ID = 703
    switch (params.category.toLowerCase()) {
        case 'benefits':
            return db.getBenefits(params)
            break;
        case 'leave':
        case 'leaves':
            return db.getLeave(params)
            break;
        case 'pay':
            return db.getSalary(params)
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
    return Promise.resolve(getDocsUrl(params))
}

var raiseRequest = (params) => {
    var sender = {}
    params.ID = 703
    return db.getSender(params)
        .then((user) => {
            Object.assign(sender, user)
            return db.getReceiver(params.to.toLowerCase())
        })
        .then((receiver) => {
            console.log(sender)
            console.log(params.requests)
            console.log(receiver)
            return sendMail(sender, params.requests, receiver)
        })
        .then((result) => {
            return Promise.resolve(result)
        })
}

var getEvent = (params) => {
    params.eventTitle = params.eventTitle.toLowerCase()
    if (params.eventTitle == 'ahm' || params.eventTitle == 'performance review meet' || params.eventTitle == 'event') {
        return db.getEvent(params);
    } else
        throw new Error("INV_EVENT")
            .then((eventDetails) => {
                return Promise.resolve(eventDetails);
            })
            .catch((err) => {
                return Promise.resolve("Oops..I could'nt find any such event 🤔. If you're looking for the next AHM for example, type in 'Next AHM'")
            })
}