const inquirer = require('inquirer')
const { question } = require('./utils/question')

const Department = require('./lib/departments')
const Role = require('./lib/roles')
const Employee = require('./lib/employees')

// Function to prompt the app main question
function promptQuestions() {
    inquirer.prompt(question).then(function(answer) {
        return handleAnswers(answer)
    })
}

async function handleAnswers(response) {
    // IF the response is to view all employees use the proper Employees method
    if (response.answer === 'View all Employees') {
        const employees = new Employee
        await employees.getEmployees()
        promptQuestions()
    }

    // IF the response is to add an employee use the proper Employees method
    if (response.answer === 'Add Employee') {
        const employees = new Employee
        await employees.addEmployee()
        console.log('New Employee Added')
        promptQuestions()
    }
    // IF the response is to add an employee use the proper Employees method
    if (response.answer === 'Update Employee Role') {
        const employees = new Employee
        await employees.updateEmployeeRole()
        console.log('Employee role updated')
        promptQuestions()
    }
    // IF the response is to view all roles use the proper Roles method
    if (response.answer === 'View all Roles') {
        const roles = new Role
        await roles.getRoles()
        promptQuestions()
    }
    // IF the response is to add a role use the proper Roles method
    if (response.answer === 'Add Role') {
        const roles = new Role
        await roles.addRole()
        promptQuestions()
    }

    // IF the response is to view all departments use the proper Departments method
    if (response.answer === 'View all Departments') {
        const departments = new Department
        await departments.getDepartments()
        promptQuestions()
    }

    // IF the response is to add a department use the proper Departments method
    if (response.answer === 'Add Department') {
        const departments = new Department
        await departments.addDepartment()
        promptQuestions()
    }
    // If the response is Quit end the application
    else if (response.answer === 'Quit') {
        process.exit()
    }
}

// Initialize app
promptQuestions()