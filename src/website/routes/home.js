const express = require('express');
const router = express.Router();
const client = require('../../bot').client

router.get('/', (req, res) => {
    res.render('home/home', {
        bot: client,
        avatar: client.user.avatarURL(),
        prefix: process.env.client_Prefix,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
    })
})

router.get('/home', (req, res) => {
    res.render('home/home', {
        bot: client,
        avatar: client.user.avatarURL(),
        prefix: process.env.client_Prefix,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
    })
})

module.exports = router;
