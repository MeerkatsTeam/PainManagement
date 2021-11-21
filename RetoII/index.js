require('dotenv').config()

const express = require('express')
const port = 3000 || process.env.port

const email = require('express')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENGRID_API_KEY)

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{
    res.json({message: 'success'})
})

app.listen(port, ()=>{
    console.log(`Accede al sitio web dando clic aqui: http://localhost:${port}`)
})

//Enviar mensaje de texto
client.messages
    .create({
        body: 'Resolviendo el reto 2',
        from: '+12073608857',
        to: '+573209859084'
    })
    .then(message => console.log(`Mensaje enviado ${message.sid}`))

//Enviar whatsapp
client.messages
    .create({
        body: 'Resolviendo el reto 2',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+573209859084'
    })
    .then(message => console.log(`Mensaje enviado ${message.sid}`))

//Enviar correo electrónico
app.post('/api/email/confirmacion', async(req,res,next)=>{
    try{
        res.json(await email.sendOrder(req.body))
    }catch(err){
        next(err)
    }
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({'message': error.message})
    return
})

function getMessage(){
    const body = 'Mensaje enviado el 20/11/2021 00:00:00 a.m.'
    return{
        to: 'ej.rojasordaz@gmail.com',
        from: 'ej.rojasordaz@outlook',
        subject: 'Confirmación de compra',
        text: body,
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

async function sendEmail(){
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
    await sendEmail()
})