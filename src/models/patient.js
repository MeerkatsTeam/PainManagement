const mongoose = require('mongoose')
const patientSchema = mongoose.Schema({

    CitizenID:{
        type:String,
        required:true
    },
    DateTimeAdmission:{
        type:Date,
        required:true
    }
})

module.exports=mongoose.model('Patient',patientSchema)