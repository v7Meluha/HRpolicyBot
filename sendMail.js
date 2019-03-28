const nodemailer = require("nodemailer");
const secret = process.env.SECRET;
const {
 mailContent,
  } = require("./lib.js")
console.log(secret)
 module.exports = async function(user, intent) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        ssl: true,
        port: 465,
        secure: true,
        auth:{
            user: 'donnapaulson73@gmail.com',
            pass: secret
        }
    }),
     subject = getIntent(intent);
    let mailOptions = {
        from: '"Donna Paulson" <donnapaulson73@gmail.com>',
        to: user.email,
        subject: subject,
        text: mailContent(user,intent)
    };
    let info = await transporter.sendMail(mailOptions)
    return new Promise((resolve, reject) => {
    if (info.messageId != null) {
      console.log("success")
        resolve("Okay. I'm sending the email  requesting for a meeting with the class teacher. You will be receiving updates soon 👍😊")
    } else {
      console.log("error")
        reject(err)
    }
    })
    .then((response)=> {
        return response
    }).catch((err)=> {
        throw new Error(err)
    })

}

