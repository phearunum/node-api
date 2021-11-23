'use strict';
const dbConnection = require('../../config/db.config');
const Users = function (user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.phone = user.phone;
    this.organization = user.organization;
    this.username =user.username;
    this.password =user.password;
    this.is_active = user.is_active ? employee.is_active : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
};