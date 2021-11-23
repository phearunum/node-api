const express =require('express')
const userRoute = express.Router()
const users =require('../controllers//user.controller')

// Middleware Authorization
const auth = require("../../middleware/auth");

// Retrieve all employees
userRoute.get('/', auth,users.findAll);
userRoute.post('/', auth,users.create);
userRoute.post('/login', users.login);

module.exports= userRoute