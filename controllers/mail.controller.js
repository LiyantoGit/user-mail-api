const nodemailer = require("nodemailer");
const chalk = require('chalk');
const queue = require("./queue.controller");
Log = require('../models/logs');

const errorMsg = chalk.bold.red;
const infoMsg = chalk.bold.blue;
const successMsg= chalk.bold.green;

exports.sendMail = async function(item) {
  try{
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: item.mail,
    subject: item.name,
    text: item.content,
  });

  console.log(successMsg("Message sent successfully with ID :", info.messageId));

  if(info.messageId){

    var params = {
      email : item.mail,
      newsletter_name : item.name,
      csv_file : item,
      created_date : new Date()
    }

    var log = new Log(params);
    log.save(error => {
        if(error){
            console.log(errorMsg(error));
        }else{
            console.log({message: 'New log inserted.', data: log});
        }
    })

  }

}catch(err){
    queue.push(item, process.env.FALLBACK_QUEUE);
}
  
}