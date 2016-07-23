var express = require('express');
var path=require('path');
var exphbs  = require('express-handlebars');


var app = express();
var port=9010;

app.engine('hbs', exphbs({defaultLayout: 'main',extname:'.hbs'}));
app.set('view engine', 'hbs');


app.use('/static', express.static(__dirname + '/public'));


app.get('/',function(req,res){
    res.render('home');
})
app.get('/about',function(req,res){
    res.render('about');
})
app.get('/jobseeker',function(req,res){
    res.render('jobseeker');
})
app.get('/contact',function(req,res){
    res.render('contact');
})
app.get('/services',function(req,res){
    res.render('services');
})
app.get('/employer',function(req,res){
    res.render('employer');
})
app.get('/currentOpenings',function(req,res){
    res.render('currentOpenings');
})
app.get('/applyNow',function(req,res){
    res.render('applyNow');
})
app.listen(port,function (){
    console.log('server at :-'+port);
})

