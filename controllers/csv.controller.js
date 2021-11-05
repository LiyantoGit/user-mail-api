var csv = require("csvtojson");
const chalk = require('chalk');
const errorLog = chalk.bold.red;

const User = require('../models/user');
const queue = require("./queue.controller");

exports.send = (req, res) => {
    csv()
        .fromFile(req.file.path)
        .then(function (jsonArrayObj) {
            AlterRecords(jsonArrayObj, res);
        })
        .catch(err => {
            res.json({ message: 'Error in file processing!' });
        })
}

//Append user’s first name and last name to newsletter content
async function AlterRecords(records, res) {
    try {
        for (index in records) {
            let item = records[index];
            console.log(item.mail)
            user = await User.getUser(item.mail)
            if (user) {
                (item.content).replace("${name}", user.firstname + user.lastname);
                queue.push(item, process.env.QUEUE);
            }
        }
        res.json({
            status: 'success',
            message: 'Mail sent successfully'
        })
    } catch (err) {
        console.log(errorLog("Error Occured..."))
        res.json({
            status: 'error',
            message: error
        })
    }
}

