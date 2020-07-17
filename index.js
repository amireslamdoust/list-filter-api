const express = require('express')
const app = express()

app.get('/', function (req, res) {

    const faker = require('faker');
    const locales = ["de", "en", "fr", "it"];
    const list = [];
    const limit = 24
    const maxPage = 7
    const page = req.query.page || 1

    let requestRate = req.query.rate
    if (requestRate && (requestRate < 1 || requestRate > 5)) {
        requestRate = undefined
    }
    if (requestRate) {
        requestRate = parseFloat(requestRate).toFixed(1)
    }

    let reviewSort = req.query.reviewSort
    if (reviewSort && (reviewSort === 'asc' || reviewSort === 'desc')) {
        reviewSort = reviewSort
    } else {
        reviewSort = undefined
    }

    let currentStatus = req.query.status
    if (currentStatus && (currentStatus === 'online' || currentStatus === 'offline')) {
        currentStatus = currentStatus
    } else {
        currentStatus = undefined
    }

    const maxReview = 10000
    function getRandomArbitrary(min, max) {
        const rand = Math.random() * (max - min) + min;
        return Math.floor(rand)
    }

    for (let i = 0; i < limit; i++) {

        let minRate = 0.0
        if (requestRate) {
            minRate = parseFloat(requestRate).toFixed(1)
        }

        const rate = (Math.random() * (minRate - 5.0) + 5.0).toFixed(1)
        const locale = []
        const rand = Math.floor(Math.random() * locales.length) + 1
        for (let j = 0; j < rand; j++) {
            const index = locales[Math.floor(Math.random() * locales.length)]
            if (!locale.includes(index)) {
                locale.push(index)
            }
        }
        const status = currentStatus ? currentStatus : Math.floor(Math.random() * 2) ? 'online' : ' offline'
        let reviews = getRandomArbitrary(0, maxReview);
        if (reviewSort) {
            if (reviewSort === 'asc') {
                if (list[i - 1]) {
                    reviews = getRandomArbitrary(list[i - 1]['reviews'], maxReview)
                }
            }

            if (reviewSort === 'desc') {
                if (list[i - 1]) {
                    reviews = getRandomArbitrary(0, list[i - 1]['reviews'])
                }
            }
        }

        const item = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            image: faker.internet.avatar(),
            locale: locale,
            rate: rate,
            status: status,
            reviews: reviews
        }
        list.push(item)
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        totalItems: limit * maxPage,
        currentPage: page,
        rate: requestRate,
        reviewSort: reviewSort,
        currentStatus: currentStatus,
        list: list
    }));

})

const server = app.listen(8000, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
