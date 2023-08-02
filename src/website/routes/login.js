const express = require('express');
const router = express.Router();
const client = require('../../bot').client
const passport = require('passport');

router.get('/api', (req, res, next) => {
    passport.authenticate('discord', {
        successRedirect: '/dashboard',
        failureRedirect: '/login/api',
        failureFlash: true
      })(req, res, next);
})

module.exports = router;
