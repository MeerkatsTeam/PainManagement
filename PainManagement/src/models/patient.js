const mongoose = require('mongoose')
const patientSchema = mongoose.Schema({
    citizenId: {
        type: String,
        required: true
    },
    dateTimeAdmission: {
        type: Date,
        required: true
    }
})

module.exports=mongoose.model('patient', patientSchema)