const express = require('express')
const route = express.Router()

route.get('/', (req, res) => res.render("index", {page: 'home'}))
route.get('/home', (req, res) => res.render("index", {page: 'home'}))

route.get('/login', (req, res) => res.render("index", {page: 'login'}))
route.get('/register', (req, res) => res.render("index", {page: 'register'}))

route.get('/vote/:idpoll', (req, res) => res.render("index", {page: 'vote'}))
route.get('/vote/:idpoll/:idvoted', (req, res) => res.render("index", {page: 'vote'}))

route.get('/createpoll', (req, res) => res.render("index", {page: 'createPoll'}))
route.get('/create-response/:idpoll', (req, res) => res.render("index", {page: 'createResponse'}))
route.get('/consult-my-poll', (req, res) => res.render("index", {page: 'consultPollUser'}))
route.get('/editpoll/:idpoll', (req, res) => res.render("index", {page: 'editPoll'}))


module.exports = route