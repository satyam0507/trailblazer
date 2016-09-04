'use strict';
var path = require('path');
var nodemailer = require('nodemailer');

module.exports = {
 send : function(toMail,subject,hbsData, app) {
    
     var smtpConfig = {
    host: 'smtp.gmail.com' ,
    port: 587,
    secureConnection: false,
    pool:true,
    domains: ["gmail.com", "googlemail.com"],
    tls: {
        rejectUnauthorized:false
        },
    requiresAuth: true,
    auth: {
        user: 'trailblazerhrsolutions@gmail.com',
        pass: 'zxcvbnm@1230'
    }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Trailblazerhrsolutions', // sender address
    to: toMail, // list of receivers
    subject: subject, // Subject line
    // text: 'Hello world ?', // plaintext body
    html: hbsData // html body/
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
}
}