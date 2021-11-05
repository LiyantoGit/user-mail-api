const mailController = require("./mail.controller");
const chalk = require('chalk');

const infoLog = chalk.bold.blue;

module.exports = function(channel) {

        channel.assertQueue(process.env.QUEUE, {
            durable: true
        });

        channel.assertQueue(process.env.FALLBACK_QUEUE, {
            durable: true
        });

        channel.prefetch(1);

        console.log(infoLog("Waiting for messages in", process.env.QUEUE));
        console.log(infoLog("Waiting for messages in", process.env.FALLBACK_QUEUE));


        channel.consume(process.env.QUEUE, function (msg) {

            console.log(infoLog("Received in send mail queue", msg.content.toString()));
            mailController.sendMail(JSON.parse(msg.content.toString()));
            setTimeout(function () {
                channel.ack(msg);
            }, 1000);
        });


        channel.consume(process.env.FALLBACK_QUEUE, function (msg) {

            console.log(infoLog("Received  in fall back queue", msg.content.toString()));

            setTimeout(function () {
                channel.ack(msg);
            }, 1000);
        });
}
