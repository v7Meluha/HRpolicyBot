const mysql = require("mysql");
const moment = require("moment");
const {
getEventTime
 } = require("./lib")

class DB {
  constructor() {
    (this.host = "192.168.42.1"),
    (this.user = "root"),
    (this.database = "company");
  }

  connect() {
    var connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      database: this.database
    });
    return Promise.resolve(connection);
  }

    getReceiver(employer) {
     var sql = `SELECT name, email FROM employee_details WHERE LOWER(jobTitle) LIKE '%${employer}%' LIMIT 1`,
        message = '';
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql, function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } 
            else {
            resolve(result[0]);
          }
          });
        });
      })
      .then(response => {
        console.log(response.name, response.email);
        return response;
      });
  }

  getSender(params) {
            params.ID = 703
     var sql = `SELECT name, email,jobTitle FROM employee_details WHERE eID = ${params.ID}`,
        message = '';
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql, function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } 
            else {
            resolve(result[0]);
          }
          });
        });
      })
      .then(response => {
        console.log(response.jobTitle);
        return response;
      });
  }


  getSalary(params) {
      params.ID = 703
     var sql = "SELECT * FROM `employee_details` WHERE eID = ?",
      message = '';
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql, [params.ID], function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } else {
              message = `Your salary breakdown is as follows:\n${result[0].salary}`;
            }
            resolve(message);
          });
        });
      })
      .then(response => {
        console.log(response);
        return response;
      });
  }

  getBenefits(params) {
     var sql = "SELECT * FROM `employee_details` WHERE eID = ?",
        message = '';
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql, [params.ID], function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } else {
              message = `You have the following benefits:\n${result[0].benefits}`;
            }
            resolve(message);
          });
        });
      })
      .then(response => {
        console.log(response);
        return response;
      });
  }

  getContacts(params) {
     var sql = `SELECT * FROM employee_details WHERE LOWER(jobTitle) LIKE '%${params.jobTitle}%'`,
     message = '';
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql,function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } else {
              message = `Here is the contact \nEmail: ${result[0].email}\nPhone: ${result[0].phone}`;
            }
            resolve(message);
          });
        });
      })
      .then(response => {
        console.log(response);
        return response;
      });

  }

getEvent(params) {

    var dateToday = moment().local().format(),
    sql,
    message = '';
       if(params.eventTitle == 'event'){
         sql = `SELECT * FROM events WHERE startDate >= '${dateToday}' ORDER BY startDate ASC`
       }
       else{
        sql = `SELECT * FROM events WHERE LOWER(eventTitle) LIKE '%${params.eventTitle}%' && startDate >= '%${dateToday}' ORDER BY startDate ASC`
      }
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql,function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } else {
              var event = getEventTime(result[0].startDate, result[0].endDate)
              if(event.endDate === ''){
                message = `The ${result[0].eventTitle} is on *${event.startDate}*, at \n${result[0].venue}`
              }
              else{
              message = `The ${result[0].eventTitle} is from *${event.startDate}*,\ntill *${event.endDate}*.\nVenue Details:${result[0].venue}\n`;
              }
              message +=`\n${result[0].description}`
              console.log(message);
            }
            resolve(message);
          });
        });
      })
  }

    getLeave(params) {
    params.ID = 703
    var total = 18, sql , message = ''
        sql = `SELECT leavestaken, ${total} - leavestaken AS leavesLeft, name FROM employee_details WHERE eID = ${params.ID}`
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql,function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } else {
              message = `So you've got ${result[0].leavesLeft} days of leave left, ${result[0].name}. Keep a check, as you get a max of ${total} days.`;
              console.log(message);
            }
            resolve(message);
          });
        });
      })
      .then(response => {
        return response;
      });
  }

}

module.exports = DB;

