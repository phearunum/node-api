const express = require('express');
const bodyParser =require('body-parser');
require('dotenv').config({ debug: process.env.DEBUG });

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 8089;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    res.success = function ({result={}, code=200, message=""}) {
        return res.json({
            result,
            code,
            message
        })
    }
    res.error = function({errors={}, code=400, message="", result={}}) {
        return res.json({
            errors,
            code,
            message,
            result
        })
    }
    res.badreq = function({errors={}, code=400, message="", result={}}) {
        return res.status(400).error({ errors, code, message, result })
    }
    res.forbidden = function({errors={}, code=403, message="", result={}}) {
        return res.status(403).error({ errors, code, message, result })
    }
    res.unauth = function({errors={}, code=401, message="", result={}}) {
        return res.status(403).error({ errors, code, message, result })
    }
    res.internal = function({errors={}, code=500, message="", result={}}) {
        return res.status(500).error({ errors, code, message, result })
    }

    next()
})
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(function (error, req, res, next) {
    if(error instanceof SyntaxError){ //Handle SyntaxError here.
      return res.status(500).send({data : "Invalid data"});
    } else {
      next();
    }
  });
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require  routes
const EmpRouter =require('./src/routers/employee.routes');
const userRoute =require('./src/routers/user.routes')


// using as middleware
app.use('/api/v1/employees', EmpRouter);
app.use('/api/v1/users', userRoute);
// listen for requests
app.listen(process.env.SVR_PORT, () => {
  console.log(`Server is listening on port ${process.env.SVR_PORT}`);
});