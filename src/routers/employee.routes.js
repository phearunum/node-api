const express =require('express')
const EmpRouter = express.Router()
const employee =require('../controllers/employee.controller')
// Retrieve all employees
EmpRouter.get('/', employee.findAll);
// Create a new employee
EmpRouter.post('/', employee.create);
// Retrieve a single employee with id
EmpRouter.get('/:id', employee.findById);
// Update a employee with id
EmpRouter.put('/:id', employee.update);
// Delete a employee with id
EmpRouter.delete('/:id',employee.deletes);
module.exports= EmpRouter