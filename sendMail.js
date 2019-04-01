const nodemailer = require("nodemailer");
const secret = process.env.SECRET;
const {
 mailContent
  } = require("./lib.js")
 module.exports = async function(sender, intent, mailRecepient) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        ssl: true,
        port: 465,
        secure: true,
        auth:{
            user: 'donnapaulson73@gmail.com',
            pass: secret
        }
    });
    let mailOptions = {
        from: '"Donna Paulson" <donnapaulson73@gmail.com>',
        to: mailRecepient.email,
        cc: sender.email,
        subject: `Request for ${intent}`,
        text: mailContent(sender,intent, mailRecepient)
    };
    let info = await transporter.sendMail(mailOptions)
    return new Promise((resolve, reject) => {
    if (info.messageId != null) {
      console.log("success")
        resolve("And..Done! The mail has been sent 😊👍. You're under copy and you'll be receiving a response very soon")
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

