const mysql = require('mysql2')
const inquirer = require('inquirer')

function Department() {
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
    
    //Method to get all Departments
    this.getDepartments = async function() {
        const sql = `SELECT * FROM departments;`
        await db.promise().query(sql).then((data) => {
            console.table(data[0])
        })
    }
    //Method to add a Department
    this.addDepartment = async function() {
        await inquirer.prompt({
            type: 'input',
            message: 'What is the name of the Department?',
            name: 'department'
        }).then(function(answer) {
            db.promise().query(`INSERT INTO departments (name) VALUES (?)`, [answer.department], (err) => {
                if (err) throw err
            })
            console.log(`Added ${answer.department} to departments`)
        })
    }
}

module.exports = Department