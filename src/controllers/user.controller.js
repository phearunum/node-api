'use strict';

const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Encrypt = require('../../middleware/bcryptconf')

module.exports.findAll = function (req, res) {
    Users.findAll(function (err, user) {
        if (err)
            res.send(err);
        res.send(
            {
                data: user,
                method: req.method,
                status: "200",
                token: req.headers['x-access-token'],
                host: req.headers['host']
            }
        );
    });
};
module.exports.create = async (req, res) => {

    const userObj = new Users(req.body);
    // const salt = await bcrypt.genSalt(10);
    //userObj.password =await  bcrypt.hash(req.body.password, salt);
    userObj.password = await Encrypt.cryptPassword(req.body.password);
    console.log(userObj);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Users.create(userObj, function (err, user) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "Employee added successfully!", data: user });
        });
    }
};

module.exports.login = async (req, res)=> {
    // Get user input
    const username = req.body.username;
    const password = req.body.password;
    const user = await Users.findAccount(username, async (err, users)=>{
        if (err) {
            res.send(err);
        }
       
        if (users[0] != null) {
            const is_compared= await  Encrypt.comparePassword (password, users[0].password);
            if (is_compared) {
                // Create token
                const token = jwt.sign(
                    { user_id: users[0]._id, username }, process.env.TOKEN_KEY, { expiresIn: "2h", }
                );
                // save user token
                users[0].token = token;
                // user
                res.send(
                    {
                        data: users[0],
                        method: req.method,
                        status: "200",
                        token: token,
                        host: req.headers['host']
                    }
                );
            }else{
                res.status(400).send(
                    {
                        data: null,
                        method: req.method,
                        status: "400",
                        token: "Invalid Credentials",
                        host: req.headers['host']
                    }
                );
                
            }
           
        }else{
            res.status(400).send(
                {
                    data: null,
                    method: req.method,
                    status: "400",
                    token: null,
                    host: req.headers['host']
                }
            );
        }

    });


}