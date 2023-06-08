const inquirer = require('inquirer')
const mysql = require('mysql2')

const question = {
    type: 'list',
        message: 'What would you like to do?',
        choices:['View all Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 
        'Add Role', 'View all Departments', 'Add Department', 'Quit'],
        name: 'answer'
}

function promptQuestions() {
    inquirer.prompt(question).then(function(answer) {
        console.log(answer)
    })
}

// Function to initialize the app
function onInit() {
    promptQuestions()
}

onInit()