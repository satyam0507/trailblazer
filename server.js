var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var firebase = require("firebase");
var mail = require('./app/mail.js');
var juice = require('juice');
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
    auth.signInWithEmailAndPassword('trailblazerhrsolutions@gmail.com', 'utkarsh').then(function (success) {
        var user = auth.currentUser;
        firebase.database().ref('application/' + key + '/').update(dataToUpdate);
        var dataUser = {
            name: req.body.name
        }
        app.render('emailToUser', { layout: false, data: dataUser }, function (err, html) {
            if (err) {
                console.log('err in rendering the templet ' + err);
            }
            else {
                var hbstemp = juice(html);
                mail.send(email, 'test', hbstemp, app);
            }
        })
        var dataHr = {
            name: req.body.name,
            email: email,
            m_number: req.body.m_number
        }
        var dataToHr = {
            userInfo:JSON.stringify(dataHr, null, 2)
        }
        app.render('emailTohr', { layout: false, data: dataToHr }, function (err, html) {
            if (err) {
                console.log('err in rendering the templet ' + err);
            }
            else {
                var hbstemp = juice(html);
                mail.send('infohrjobss@gmail.com', 'New Inquire Added', hbstemp, app);
            }
        })
        res.send(true);
    }, function (err) {
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

