const express = require('express') // Carga de express
// Database connection constants
const mongoose = require('mongoose')
require('dotenv').config()

// Connection port
const app = express()
const port = process.env.PORT || 3000

// Carga de archivos router
const triageRoute = require("./routes/triage")
const patientRoute = require("./routes/patient")
const doctorRoute = require("./routes/doctor")
const painRoute = require("./routes/pain")

// Service activation port
app.listen(port, ()=>console.log('Server listenind on port', port))

// Middlewares
app.use(express.json())
app.use("/dashboard", triageRoute)
app.use("/dashboard", patientRoute)
app.use("/dashboard", doctorRoute)
app.use("/dashboard", painRoute)

// Projet routes
app.get('/', (req, res)=>{
    res.send('Bienvenid@ a la API de Meerkats')
})

// MongoDb conection
mongoose
    .connect(process.env.MONGODB_CONNECT)
    .then(()=> console.log('Conectados con MongoDBAtlas'))
    .catch((error)=> console.log(error));

/****************  SEND EMAIL  *********************/
// Send message email function
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (email_to) => {
    const msg = {
        to: email_to,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Registro de dolor',
        text: 'Hola!, Cuentanos ¿que tan fuerte continua tu dolor?',
        html: '<strong>Registra tu nivel de dolor acá</strong>',
    }
    sgMail
     .send(msg)
     .then((response) => {
        console.log(`Email sent ${response[0].statusCode}`)
        // console.log(response[0].headers)
    })
     .catch((error) => {
        console.error(error)
    })
}
// Send email
let email_to = process.env.SENDGRID_EMAIL
let send_email = true
send_email ? sendEmail(email_to) : console.log('Email not sent')

/***********************  SEND SMS  ************************/
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 

const sendSms = (to) => {
    client.messages 
      .create({ 
         body: 'Por favor cuentanos ¿cómo se encuentra el nivel de dolor en este momento?',  
         from: '+17625839097',      
         to: to 
       }) 
      .then(message => console.log(`SMS sent ${message.sid}`))
      .done()
}
//Send SMS
let phone_to = process.env.TWILIO_SMS_PHONE
let send_sms = true
send_sms ? sendSms(phone_to) : console.log('SMS not sent')

/***********************  SEND WHATSAPP  ************************/
const sendWhatsapp = (to) => {
    client.messages 
      .create({ 
         body: 'Por favor cuentanos ¿cómo se encuentra el nivel de dolor en este momento?',  
         from: 'whatsapp:+14155238886',      
         to: `whatsapp:${to}` 
       }) 
      .then(message => console.log(`WhatsApp sent ${message.sid}`))
      .done()
}
//WhatsApp Send
let send_whatsapp = true
send_whatsapp ? sendWhatsapp(phone_to) : console.log('WhatsApp not sent')