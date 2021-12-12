const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const port = 1000
const fetch = require('node-fetch')

//

require('dotenv').config()

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'incode_project_5_db',
    // port: 3306,
})

connection.connect(function (err) {
    if (err) {
        throw err
    } else {
        console.log('Connected to db')
    }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app
