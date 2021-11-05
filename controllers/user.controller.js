User = require('../models/user');

exports.insert = (req, res) => {
    var user = new User(req.body);
    user.save(error => {
        if(error){
            res.json(error);
        }else{
            res.json({message: 'New user added.!', data: user});
        }
    })
}

exports.list = (req, res) => {
    User.find((error, users) => {
        if(error){
            res.json({
                status: 'error',
                message: error
            })
        }else{
            res.json({
                status:'success',
                message: 'Data retrived successfully',
                data: users
            })
        }
    })
}