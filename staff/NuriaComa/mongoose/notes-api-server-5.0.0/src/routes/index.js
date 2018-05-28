const express = require('express')
const logic = require('../logic')
const bodyParser =require('body-parser')
const router = express.Router()

const bodyParserJSON=bodyParser.json()

router.post('/register', bodyParserJSON,(req, res)=>{
    const { body:{name, surname, email, password}}=req
    
    return logic.register(name, surname, email, password)
    .then(user=>{
        res.json ({status:'OK'})
    })
})

router.post('/users/:userId/notes', (req, res) => {
    const { params: { userId }, body: { text } } = req

    logic.addNote(userId, text)
        .then(id => {
            res.status(201)
            res.json({ status: 'OK', data: { id } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id } } = req

    logic.retrieveNote(userId, id)
        .then(note => {
            res.json({ status: 'OK', data: note })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/users/:userId/notes', (req, res) => {
    const { params: { userId }, query: { q } } = req;

    (q ? logic.findNotes(userId, q) : logic.listNotes(userId))
        .then(notes => {
            res.json({ status: 'OK', data: notes })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})

router.delete('/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id } } = req

    logic.removeNote(userId, id)
        .then(() => {
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.patch('/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id }, body: { text } } = req

    logic.updateNote(userId, id, text)
        .then(() => {
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

module.exports = router