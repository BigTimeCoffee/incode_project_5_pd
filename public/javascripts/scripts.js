window.onload = function () {
    document.getElementById('rateShow').addEventListener('click', function (e) {
        e.preventDefault()
        const showId = document.getElementById('showId').value
        const rating = document.getElementById('rating').value
        console.log('this is showID', showId)

        fetch('/rating/' + showId, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // headers: {
            //     //'Content-Type': 'application/json'
            //     'Content-Type': 'application/x-www-form-urlencoded',
            // },

            body: new URLSearchParams({
                rating: rating,
            }),
        })
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                console.log(result)
                document.getElementById('ratingResults').innerHTML =
                    'This is the average ' + result[0].average
            })
    })
}
