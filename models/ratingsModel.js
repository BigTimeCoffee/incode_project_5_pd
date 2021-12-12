const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'incode_project_5_db',
    port: 3306,
})

function getAll() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ratings', (err, result) => {
            if (err) reject(err)
            console.log(result)
            resolve(result)
        })
    })
}

function insertRating(showId, userId, rating) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO ratings (tv_show_id, user_id, rating) values (?)',
            [[showId, userId, rating]],
            (error, result) => {
                if (error) reject(error)
                console.log('model result is', result)
                resolve(result)
            }
        )
    })
}

function getAverage(showId) {
    return new Promise((resolve, reject) => {
        connection.query(
            'Select count(rating) as numberOfVotes , avg(rating) as average from ratings where tv_show_id=?;',
            showId,
            (err, result) => {
                if (err) reject(err)
                console.log(result)
                resolve(result)
            }
        )
    })
}

module.exports = { getAll, insertRating, getAverage }
