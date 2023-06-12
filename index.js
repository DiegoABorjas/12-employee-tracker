const inquirer = require('inquirer')
const mysql = require('mysql2')

const { question } = require('./utils/question')

const Department = require('./lib/departments')
const Role = require('./lib/roles')
const Employee = require('./lib/employees')

function promptQuestions() {
    inquirer.prompt(question).then(function(answer) {
        return handleAnswers(answer)
    })
}

async function handleAnswers(response) {
    // IF the response is to view all employees use the Employees method to query them all.
    if (response.answer === 'View all Employees') {
        const employees = new Employee
        await employees.getEmployees()
        promptQuestions()
    }

    if (response.answer === 'Add Employee') {
        const employees = new Employee
        await employees.addEmployee()
        console.log('New Employee Added')
        promptQuestions()
    }

    if (response.answer === 'View all Roles') {
        const roles = new Role
        await roles.getRoles()
        promptQuestions()
    }
    if (response.answer === 'Add Role') {
        const roles = new Role
        await roles.addRole()
        promptQuestions()
    }
    if (response.answer === 'View all Departments') {
        const departments = new Department
        await departments.getDepartments()
        promptQuestions()
    }
    if (response.answer === 'Add Department') {
        const departments = new Department
        await departments.addDepartment()
        promptQuestions()
    }
    else if (response.answer === 'Quit') {
        process.exit()
    }
}

promptQuestions()