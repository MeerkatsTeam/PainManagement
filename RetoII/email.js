const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENGRID_API_KEY)

function sendEmailConfirmationHTML(customerName, orderNro) {
    return `<!DOCTYPE html>
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

function getMessage(emailParams) {
    return {
        to: emailParams.toEmail,
        from: '',
        subject: 'Confirmación orden de compra black friday',
        text: `Hola ${emailParams.customerName}, te enviamos las imágenes de los productos comprados y la factura con número ${emailParams.orderNro}. Gracias por tu compra`,
        html: sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)

    }
}

async function sendOrder(emailParams) {
    try {
        await sgMail.send(getMessage(emailParams))
        return { message: 'Confirmación de compra enviada' }
    } catch (err) {
        const message = 'No se pudo enviar la orden de compra. Valide los errores'
        console.error(message)
        console.error(err)
        if (err.response) console.error(err.response.body)
        return { message }
    }
}
module.exports = {
    sendOrder
}