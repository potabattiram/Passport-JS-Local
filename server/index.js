const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoStore = require('mongodb');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: "GET, POST, PATCH, DELETE, PUT",
    allowedHeaders: "Content-Type, Authorization",
}));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 24 * 100 },
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

const AuthAPIs = require('./Auth/Login');

app.get('/', (req, res) => {
    res.send('HMA is running good!')
})

app.use(AuthAPIs);

app.listen(3001, function () {
    console.log('Listening on port 3001')
})