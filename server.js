require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDBStore = require('connect-mongo');

//database connection
const url =
  'mongodb+srv://sarikalikhar11:Sudhirkonge%4011@cluster0.efl5bmi.mongodb.net/pizza-tracking';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection
  .once('open', function () {
    console.log('MongoDB running');
  })
  .on('error', function (err) {
    console.log(err);
  });

//session store
let mongoStore = new MongoDBStore({
  mongoUrl: url,
  collection: 'sessions',
});

// session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET, //key for cookies encription
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //time valid for cookie 24hours
  })
);

app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.json());

//Global Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app); //instance of app object  created

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
