const passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;

module.exports = function(passport) {
    var scopes = ['identify', 'email', 'guilds', 'guilds.members.read'];
 
    passport.use(new DiscordStrategy({
        clientID: process.env.client_ID,
        clientSecret: process.env.client_Secret,
        callbackURL: `http://localhost:${process.env.web_Port}/login/api`,
        scope: scopes
    },

    function(accessToken, refreshToken, profile, cb) {
      if (process.env.admins.includes(profile.id)) {
        cb(null, profile)
      } else {
        return cb(null, false, { message: 'Unauthorised! Please add your client ID to the config!' })
      }
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}
