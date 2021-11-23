const express = require('express')
const cities = require('./models/dbHelpers')

const server = express()

const port = 9009

server.get("/", (req, res) => {
    res.json({ message: "Hi there!"})
})

server.use(express.urlencoded({
    extended: true
}));


//create endpoint
server.post('/api/cities', (req, res) => {
    cities.add(req.body)
    .then(city => {
        res.status(200).json(req.body)
    })
    .catch(err => {
        res.status(500).json({ message: err })
    })
})

//read endpoint
server.get('/api/cities/:cityName', (req, res) => {
    const { cityName } = req.params
    cities.find(cityName)
    .then(city => {
        if (city) {
            res.status(200).json(city)
        } else {
            res.status(404).json({ message: 'record not found' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'unable to perform read operation' })
    })
})

//update endpoint
server.patch('/api/cities/:cityName', (req, res) => {
    const { cityName } = req.params
    const newPopulation = req.body
    cities.upd(cityName, newPopulation) 
    .then(city => {
        if (city) {
            res.status(200).json(city)
        } else {
            res.status(404).json({ message: 'record to be updated not found' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'error occured while attempting to update' })
    })
})

//delete endpoint
server.delete('/api/cities/:id', (req, res) => {
    const { id } = req.params

    cities.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ boolean: true })
        } else {
            res.status(404).json({ boolean: false })
        }
    })
    .catch(err => {
        res.status(500).json({ boolean: false })
    })
})

server.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
