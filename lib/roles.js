const mysql = require('mysql2')
const inquirer = require('inquirer')

function Role() {
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

    //Method to get all Roles
    this.getRoles = async function() {
        const sql = `SELECT * FROM roles;`
        await db.promise().query(sql).then((data) => {
            console.table(data[0])
        })
    }
    //Method to add a Role
    this.addRole = async function() {
        const sql = `SELECT * FROM departments;`
        await db.promise().query(sql).then((data) => {
            departmentList = []
            for (entry of data[0]) {
                departmentList.push(entry)
            }
        }) 
        // console.log(departmentList)
        await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: departmentList,
                name: 'department'
            }
        ]).then(function(answer) {
            for (entry of departmentList) {
                if (entry.name === answer.department) {
                    newRoleId = entry.id
                }
            }
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [answer.role, answer.salary, newRoleId], (err, rows) => {
                if (err) throw err
            })
            console.log(`Added ${answer.role} to roles`)
        })                        
    }
}

module.exports = Role