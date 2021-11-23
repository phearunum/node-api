'use strict';
const dbConnection = require('../../config/db.config');
const pwd_has=require('../../middleware/bcryptconf')
const Users = function (user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.sex = user.sex;
    this.email = user.email;
    this.phone = user.phone;
    this.address =user.address;
    this.username =user.username;
    this.password =user.password;
    this.is_active = user.is_active ? user.is_active : 1;
    this.create_at = new Date();
    this.update_at = new Date();
    this.token =user.token;
};
const table="sys_user";
const fack_table_user="userAccount";
Users.findAll = function (result) {
    dbConnection.query(`Select * from ${fack_table_user}`, function (err, res) {
        if (err) throw err;
        result(null, res[0]);

    });
};
Users.findAccount = function (username, result) {
   var q= dbConnection.query(`Select * from ${table} where username =?`,[username],function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
 
};
Users.findById = function (id, result) {
    dbConnection.query(`Select * from ${table} where _id = ? `, id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Users.create = function (userObj, result) {
    
    dbConnection.query(`INSERT INTO ${table} SET ?`, userObj, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};
module.exports=Users