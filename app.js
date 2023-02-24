const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyparser = require('body-parser');
const cors = require('cors')
const nodemailer = require('nodemailer');
const sendGridTransporter = require('nodemailer-sendgrid-transport')

// accessing env file
require("dotenv").config();


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


const trasporter = nodemailer.createTransport(
    sendGridTransporter({
        auth: {
            api_key: process.env.API_SENDGRID
        }
    })
)


app.post('/sendEmail', (req, res) => {
    const {name, email, jopType, message} = req.body;

    if(!name){
        return res.status(404).json({error: "please add your name"})
    }

    if(!email){
        return res.status(404).json({error: "please add your email"})
    }

    if(!jopType){
        return res.status(404).json({error: "please add your job type"})
    }

    if(!message){
        return res.status(404).json({error: "please add your message"})
    }
    trasporter.sendMail({
        to: "akheyrem@gmail.com",
        from: "akheyrem@gmail.com",
        subject: "job offer",
        html: `
        
        <h5>Detail Information</h5


        <ul>
        <li><p> ${name}</p></li>
        <li><p> ${email}</p></li>
        <li><p> ${jopType}</p></li>
        <li><p> ${message}</p></li>
        </ul>
        
        `

       
        
    })

    res.json({sucess: "your email has been send"})
})



app.get('/test', (req, res) => {
    res.send('Hello React')
})

app.listen(PORT, (req, res) => {
    console.log('server is Connected')
});




