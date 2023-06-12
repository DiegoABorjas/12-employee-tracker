const question = {
    type: 'list',
        message: 'What would you like to do?',
        choices:['View all Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 
        'Add Role', 'View all Departments', 'Add Department', 'Quit'],
        name: 'answer'
}

module.exports = { question }