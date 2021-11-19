const mongoose = require('mongoose')
const doctorSchema = mongoose.Schema({
    citizenId: {
        type: String,
        required: true
    },
    rethus: {
        type: Number,
        required: true
    },
    drugApplied: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    }
})

module.exports=mongoose.model('doctor', doctorSchema)