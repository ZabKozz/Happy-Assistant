const express = require('express');
const router = express.Router();
const client = require('../../bot').client
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const dateformat = require('dateformat');
const ver = "1"

const number = require('easy-number-formatter')
var request = require("request");
const jsonfile = require('jsonfile')

router.get('/', ensureAuthenticated, (req, res) => {

    res.render('dashboard/dashboard', {
        profile: req.user,
        client: client,
        joinedDate: dateformat(`${client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'),
        prefix: process.env.client_Prefix,
        number: number,
        Currentversion: ver,
    })
})

// Logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err)
    });
    req.flash('success', 'Logged out');
    res.redirect('/home');
});

module.exports = router;