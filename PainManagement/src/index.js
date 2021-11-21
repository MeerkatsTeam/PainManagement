require('dotenv').config()

// Configurar listening del puerto para ver el proyecto en un navegador
const express = require('express') // Carga de express
const port = process.env.PORT || 3000

// Service activation port listening
const app = express()
app.listen(port, ()=>console.log('Server listenind on port', port))

// Projet routes
app.get('/', (req, res)=>{
    res.send('Bienvenid@ a la API de Meerkats')
})

// Database connection constants
const mongoose = require('mongoose')

// Librerías de SendGrid para el envío de correo electrónico
const email = require('./services/email') // Ruta del archivo
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Librerías de twilio para mensajería de texto
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 

// Carga de archivos router
const triageRoute = require("./routes/triage")
const patientRoute = require("./routes/patient")
const doctorRoute = require("./routes/doctor")
const painRoute = require("./routes/pain")

// Para realizar pruebas con postman
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Middlewares
app.use("/dashboard", triageRoute)
app.use("/dashboard", patientRoute)
app.use("/dashboard", doctorRoute)
app.use("/dashboard", painRoute)


// MongoDb conection
mongoose
    .connect(process.env.MONGODB_CONNECT)
    .then(()=> console.log('Conectados con MongoDBAtlas'))
    .catch((error)=> console.log(error));

/****************  SEND EMAIL  *********************/
// Send message email function
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
let send_email = false
send_email ? sendEmail(email_to) : console.log('Email not sent')

/***********************  SEND SMS  ************************/



const sendSms = (to) => {
    const client = require('twilio')(accountSid, authToken); 
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
let send_sms = false
send_sms ? sendSms(phone_to) : console.log('SMS not sent')

/***********************  SEND WHATSAPP  ************************/
const sendWhatsapp = (to) => {
    const client = require('twilio')(accountSid, authToken); 
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
let send_whatsapp = false
send_whatsapp ? sendWhatsapp(phone_to) : console.log('WhatsApp not sent')

/***********************  SEND ORDER MODULE  ************************/
app.post('/api/email/confirmation', async(req, res, next)=>{
    //Llamamos función que está en la clase services/mail.js y que requiere de unos parameros que ingresan por Postman
    try{
        res.json(await email.sendOrder(req.body))
    }catch(err){
        next(err)
    }
})

// Validar el código que nos devuelve la ejecución del código, en caso de error mostrar todo el contenido del error.
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({'messege': error.message})
    return
})

function getMessage(){
    const body = "Mensaje enviado el 19/11/2021 07:01:00 a.m."
    return{
        to: 'ej.rojasordaz@gmail.com',
        from: 'optimusoft@outlook.com',
        subject: 'Prueba sendgrid G02',
        test: body,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            <title>Confirmación de compra</title>
        </head>
        <body>
            <div class="container section">
                <div class="form-group">
                    <div class="row mb-3">
                        <label><h3>Detalles del pedido</h3></label>
                    </div>
                    <div class="row mb-3">
                        <p class="text-muted">
                            Pedido n° 001
                            <br>
                            Realizado el sabado 20 de noviembre de 2021
                        </p>
                    </div>
                </div>
            <div class="form-group">
                <div class="row mb-3">
                    <div class="col col-sm-4">
                        <div style="margin:10px">
                            <img class="img-responsive" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwMpYp048lwJRHlukAxdZk4OaSvzzXL1dCSg&usqp=CAU" 
                            width="" alt="">
                        </div>
                    </div>
                    <div class="col col-sm-5">
                        <p class="text-muted" style="text-align: left;">
                            La tecnología completamente híbrida de Ford consta de dos motores: Uno a combustión interna impulsado 
                            por gasolina y otro eléctrico, que además de asistir al motor a gasolina, es capaz de propulsar el 
                            vehículo por sí solo, llevando la eficiencia de consumo de combustible a niveles sin precedentes, 
                            mientras se reduce sustancialmente la emisión de gases al medio ambiente.
                            <br>                        
                            Vendido por Meerkats Shop
                        </p>
                    </div>
                    <div class="col col-sm-3" style="text-align: left;">
                        <label><b>EUR 10,99</b></label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row mb-3">
                    <div class="col col-sm-9">
                        <p class="text-muted" style="text-align: right;">
                            Importe de los productos:<br>Envío y manipulación:
                            <br>Importe total antes de impuestos:<br>
                            IVA:<br><b>Importe total del pedido:</b>
                            <br>Método de pago seleccionado:
                        </p>
                    </div>
                    <div class="col col-sm-3">
                        <p class="text-muted" style="text-align:left;">
                            EUR 9,08<br>EUR 0,00<br>EUR 9,08
                            <br>EUR 1,91<br><b>EUR 10,99</b>
                            <br>Mastercard
                        </p>
                    </div>
                    <div class="form-group">
                        <div class="row mb-3">
                            <p class="text-muted" style="text-align: left;">
                                ¿Necesitas modificar tu pedido? En nuestra <a href="https://localhost:3000">página de ayuda</a> encontrarás mas información y videos.
                                Si tienes un dispositivo móvil, puedes utilizar la <a href="https://localhost:5001">Aplicación gratuita de Meerkats</a> para recibir notificaciones
                                acerca del estado de tu pedido  localizarlo en cualquier momento.
                                Esperamos volver a verte pronto.                            
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        </body>
    </html>`
    }
}

async function sendEmail2(){
    try{
        await sgMail.send(getMessage())
        console.log('Correo ha sido enviado')
    }catch(err){
        console.error('No se pudo enviar el mensaje')
        console.error(err)
        if(err.response) console.error(err.response.body)
    }
}

(async()=>{
    console.log('Enviando correo electrónico')
    await sendEmail2()
})