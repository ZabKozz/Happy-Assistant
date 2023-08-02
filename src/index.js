// Initialising the execution bot file
const client = require('./bot').client;
//
const express = require('express')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const path = require('path');
//
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, './website/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './website/views'));

app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(fileUpload());

require('./website/auth/passport')(passport);

// Express session
app.use(
  session({
    secret: process.env.client_Secret,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((profile, done) => {
  if (!profile) return; // In serialization, if the value received is false, as we saw above, it means that the information did not arrive in its entirety, that is, it is a repeated request and therefore it did not get all the information, so we must return to avoid serialization errors
  return done(null, profile);
});
passport.deserializeUser((obj, done) => done(null, obj));

// Connect flash
app.use(flash());
// Redirect to main page
app.use('/', require('./website/routes/home.js'));
app.get("/", (req, res) => {
  res.render(res, req, "home");
});
// Redirection to login
app.use('/login', require('./website/routes/login.js'));
app.get("/login", (req, res) => {
  res.redirect('/login/api');
});
// 
app.use('/dashboard', require('./website/routes/dashboard.js'));
// 
app.get("/invite", function (req, res) {
  res.redirect(process.env.invite_Link);
});
// Features list redirect endpoint.
app.get("/commands", (req, res) => {
  res.send("This feature is not yet available.");
});

// Error Pages

http.listen(process.env.web_Port);