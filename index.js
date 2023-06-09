const inquirer = require('inquirer')
const mysql = require('mysql2')

// import question variable 
const { question } = require('./utils/question')

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// Function to prompt the questions
function promptQuestions() {
    inquirer.prompt(question).then(function(answer) {
        handleAnswers(answer)
    })
}

function handleAnswers(response) {
    if (response.answer === 'View all Employees') {
        const sql = `SELECT * FROM employees;`
        db.query(sql, (err, rows) => {
            if (err) throw err
            console.table(rows)
            promptQuestions()
        })
    if (response.answer === 'Quit')
            console.log('quitting program')
            db.end()
    }
}

// Function to initialize the app
function onInit() {
    promptQuestions()
}

onInit()