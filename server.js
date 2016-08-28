var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var firebase = require("firebase");
var app = express();
app.use(bodyParser.json());
var port = 9010;

var config = {
    apiKey: "AIzaSyDgPRKXoy3DAxXCWsCwri-uUbT1s1pGMxI",
    authDomain: "trailblazer-4b254.firebaseapp.com",
    databaseURL: "https://trailblazer-4b254.firebaseio.com",
    storageBucket: "trailblazer-4b254.appspot.com",
};
firebase.initializeApp(config);

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use('/static', express.static(__dirname + '/public'));

app.post('/setUser', function (req, res) {
    console.log(req.body);
    var email = req.body.email;
    var key = email.replace(/[.$\[\]\/#]/g, ','); 
    var dataToUpdate = {
        name: req.body.name,
        m_number: req.body.m_number
    }
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword('trailblazerhrsolutions@gmail.com', 'utkarsh').then(function(success){
                var user = auth.currentUser;
             firebase.database().ref('application/' + key + '/').update(dataToUpdate);
        res.send(true);
        },function(err){
            console.log(err);
        })
       
})
app.get('/', function (req, res) {
    res.render('home');
})
app.get('/about', function (req, res) {
    res.render('about');
})
app.get('/jobseeker', function (req, res) {
    res.render('jobseeker');
})
app.get('/contact', function (req, res) {
    res.render('contact');
})
app.get('/services', function (req, res) {
    res.render('services');
})
app.get('/employer', function (req, res) {
    res.render('employer');
})
app.get('/currentOpenings', function (req, res) {
    res.render('currentOpenings');
})
app.get('/applyNow', function (req, res) {
    res.render('applyNow');
})
app.listen(port, function () {
    console.log('server at :-' + port);
})

