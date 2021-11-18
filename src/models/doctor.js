const mongoose = require('mongoose')
const doctorSchema = mongoose.Schema({
    CitizenID:{
        type:String,
        required:true
    },
    ReTHUS:{
        type:Number,
        required:true
    },
    DrugApplied:{
        type:String,
        required:true
    },
    DoctorName:{
        type:String,
        required:true
    },
    Speciality:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('doctor',doctorSchema)