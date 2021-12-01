const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', function (req, res) {
    fetch('https://api.tvmaze.com/shows?page=1')
        .then((result) => result.json())
        .then((shows) => {
            let firstTwenty = []
            for (let i = 0; i < 20; i++) {
                firstTwenty.push(shows[i])
                console.log('These are the shows :', shows[i].name)
            }
            res.render('index', {
                layout: 'layouts/index',
                title: 'TV-API',
                shows: firstTwenty,
            })
        })
})

router.get('/login', (req, res) => {
    // if (app.locals.error) {
    //     console.log(app.locals.error)
    // }
    res.render('login', { layout: 'layouts/login' })
})

router.get('/signup', (req, res) => {
    res.render('signUp', { layout: 'layouts/signUp' })
})

module.exports = router
