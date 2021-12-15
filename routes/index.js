const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const ratings = require('../models/ratingsModel')

router.get('/', function (req, res) {
    fetch('https://api.tvmaze.com/shows')
        .then((result) => result.json())
        .then((shows) => {
            let firstTwenty = []
            for (let i = 0; i < 20; i++) {
                firstTwenty.push(shows[i])
                //console.log('Show name:', shows[i].name)
            }
            const showIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            ratings.getAverageAll(showIds).then((groupedRatings) => {
                console.log('these are the grouped ratings', groupedRatings)
            })
            res.render('index', {
                layout: 'layouts/index',
                title: 'TV-API',
                shows: firstTwenty,
            })
        })
})

router.get('/show/:id', function (req, res) {
    const id = req.params.id
    fetch('https://api.tvmaze.com/shows/' + id)
        .then((result) => result.json())
        .then((show) => {
            //console.log(show)
            res.render('show', {
                layout: 'layouts/index',
                title: 'TV-API',
                show,
            })
        })
})

router.post('/rating/:id', (req, res) => {
    const id = req.params.id
    const rating = req.body.rating
    //console.log('inside post', id, rating)
    //console.log('this is req.body', req.body)
    const insertRating = ratings.insertRating(id, 1, rating)
    insertRating
        .then((result) => {
            console.log('result is', result)
            const getAverage = ratings.getAverage(id).then((result) => {
                console.log('result is', result)
                res.json(result)
            })

            // res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })

    // input = show_id, user_id, rating

    // const rating = req.body.rating
    // user_id = from token.
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

router.post('/getAverageAll', (req, res) => {
    const showIds = req.body.showIds
    ratings.getAverageAll(showIds).then((groupedRatings) => {
        console.log('these are the grouped ratings', groupedRatings)
        res.json(groupedRatings)
    })
})

module.exports = router
