
const moment = require('moment')
var getDocsUrl = (params) => {
    return "https://www.google.com/imgres?imgurl=https%3A%2F%2Fnondisclosureagreement.com%2Fwp-content%2Fuploads%2F2018%2F03%2FMutual-Non-Disclosure-Agreement.png&imgrefurl=https%3A%2F%2Fnondisclosureagreement.com%2Fmutual.html&docid=gDS8TRtRq-eNzM&tbnid=4HmHJMQfZerHqM%3A&vet=10ahUKEwiZwtXeoaThAhXUEHIKHbcqCXgQMwhBKAAwAA..i&w=1174&h=1584&bih=688&biw=1418&q=nda%20pdf%20image&ved=0ahUKEwiZwtXeoaThAhXUEHIKHbcqCXgQMwhBKAAwAA&iact=mrc&uact=8";
}
exports.getDocsUrl = getDocsUrl

var getDateString = (date, time) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return `${day[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
}
exports.getDateString = getDateString


let mailContent = (sender, intent, mailRecepient) => {
		return `Hi ${mailRecepient.name},
		This mail is regarding the ${intent} request raised by our ${sender.jobTitle}, ${sender.name}. Kindly respond to the following mail ID: ${sender.email} and setup a meeting to discuss the same.
		\n---This is an automated mail from Candace(@policyBot)---`
  
}
exports.mailContent = mailContent

let getEventTime = (start, end) => {
    if( moment(start).format('l') === moment(end).format('l') )
    	return {
    		startDate : moment(start).local().format("LLLL"),
    		endDate : ''
    	};

    else  
			return {
				startDate: moment(start).utc().format("LLLL") ,
				endDate: moment(end).utc().format("LLLL") 
			}
}
exports.getEventTime = getEventTime 