const mysql = require('mysql2')
const inquirer = require('inquirer')

function Employee() {
    // Connect to database
    const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
    )
    
    //Method to get all Employees
    this.getEmployees = async function() {
        const sql = `SELECT * FROM employees;`
        await db.promise().query(sql).then((data) => {
            console.table(data[0])
        })
    }
    //Method to add an Employee
    this.addEmployee = async function() {
        const sqlRoles = `SELECT * FROM roles;`
        await db.promise().query(sqlRoles).then((data) => {
            roleList = []
            for (entry of data[0]) {
                roleList.push(entry)
            }
            roleTitles = []
            for (entry of roleList) {
                roleTitles.push(entry.title)
            }
        })

        let employeeList
        const sqlEmp = `SELECT * FROM employees;`
        await db.promise().query(sqlEmp).then((data) => {
            employeeList = data[0].map(data => {
                return {
                    name: data.first_name + ' ' + data.last_name,
                    id: data.id
                }
            })
            employeeList.push({name: 'NONE', id: 0})
        })        
        await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'firstname'
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'lastname'
            },
            {
                type: 'list',
                message: 'What is the role of this new employee?',
                choices: roleTitles,
                name: 'role'
            },
            {
                type: 'list',
                message: 'Who is the manager of this employee?',
                choices: employeeList,
                name: 'manager'
            }
        ]).then(function(answer) {
            for (entry of roleList) {
                if (entry.title === answer.role) {
                    newEmpRoleId = entry.id
                }
            }
            console.log(answer.manager)
            for (entry of employeeList) {
                if (entry.name === answer.manager) {
                    newEmpManagerId = entry.id
                }
            }
            console.log(newEmpManagerId)

            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [answer.firstname, answer.lastname, newEmpRoleId, newEmpManagerId], (err, rows) => {
                if (err) throw err
            })
        })                        
    }
}

module.exports = Employee