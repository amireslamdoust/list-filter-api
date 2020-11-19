const express = require('express')
let cors = require('cors')
const app = express()

app.use(cors())
app.get('/', function (req, res) {


    const faker = require('faker');
    const list = [];
    const limit = 30


    for (let i = 0; i < limit; i++) {

        const rate = (Math.random() *  5).toFixed(1)
        // const rate = (Math.random() *  5).toFixed(0)

        const item = {
            name: faker.name.findName(),
            image: faker.image.imageUrl(),
            address: faker.address.streetAddress(),
            rate:  rate
        }
        list.push(item)
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
        list
    ));

})

const server = app.listen(8001, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
