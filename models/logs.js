var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    newsletter_name :  {
        type: String,
        required: true
    },
    csv_file: {
        type: Object,
        required: true
    },
    created_date: {
        type: Date,
        required: true
    }
});

var Log = module.exports = mongoose.model('log', logSchema);
