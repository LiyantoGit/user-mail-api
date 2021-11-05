let app = require('express')();

const amqp = require('amqplib/callback_api');
require('dotenv').config()

let bodyParser = require('body-parser');

let mongoose = require('mongoose');

const chalk = require('chalk');

let apiRoutes = require('./routes/api-routes');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const errorLog = chalk.bold.red;
const infoLog = chalk.bold.blue;
const successLog= chalk.bold.green;

amqp.connect(process.env.RABBITMQ_HOST, function (error, connection) {
    if (error) {
        console.log(errorLog("error-- ",error))
        throw error;
    }
    connection.createChannel(function (channelError, channel) {
        if (channelError) {
            throw channelError;
        }
        require('./controllers/messageBroker')(channel);
        global.channel = channel;
    });

});
var url = process.env.MONGODB_URL;
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
global.db = mongoose.connection;

if (!global.db) {
    throw "Db connection failed.!"
} else {
    console.log(successLog(`Db connected successfully`));
}

app.use('/api', apiRoutes);
app.get('/', (req, res) => res.send('Hello world.!'));


var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(infoLog(`Listening to port : ${port}`));
})