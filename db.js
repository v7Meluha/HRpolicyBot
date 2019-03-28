const mysql = require("mysql");
const moment = require("moment");
const { getDateString } = require("./lib")
//const { getGrades } = require("./lib");

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

  getSalary(params) {
    params.ID = '14-0584439'
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
              console.log(message);
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
    console.log(params)
    params.ID = '098986'
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
              console.log(message);
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
    console.log(params)
    if(params.person.toLowerCase() == 'hr' ){
      params.person = 'Marketing Assistant'
    }
     var sql = 'SELECT * FROM `employee_details` WHERE jobTitle = ?',
     message = '';
     console.log(sql)
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          con.query(sql, params.person, function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } else {
              message = `Contact Details\n Email: ${result[0].email}\n Phone: ${result[0].phone}`;
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
    console.log("params")
    var dateToday = new Date();
    dateToday = moment(dateToday).format('YYYY-MM-DD')
     var sql,message = '';
       if(params.category == 'event'){
         sql = `SELECT * FROM events WHERE date >= '%${dateToday}'`
       }
       else{
        sql = `SELECT * FROM events WHERE LOWER(eventTitle) LIKE '%${params.category}%' && date >= '%${dateToday}'`
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
              var eventDate = getDateString(result[0].date)
              message = `The next ${result[0].eventTitle} is on ${eventDate} at:\n${result[0].venue}`;
              console.log(message);
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

}

module.exports = DB;
