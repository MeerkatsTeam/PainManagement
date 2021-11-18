const express = require('express')

const doctorRoute = require('./routes/doctor')
/* const painRoute = require('./routes/pain')
const patientRoute = require('./routes/patient')
const triageRoute = require('./routes/triage')
 */
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
//routes

app.listen(port, ()=>console.log('server listening on port', port))

app.use(express.json())
app.use('/api',doctorRoute)
/* app.use('/api',painRoute)
app.use('/api',patientRoute)
app.use('/api',triageRoute)
 */
app.get('/',(req,res)=>{
    res.send('Welcome to Pain Mangement API')
})

mongoose
        .connect(process.env.MONGODB_CONNECT)
        .then(()=>console.log('Connected to MongoDB Atlas'))
        .catch((error)=>console.error('error'))


