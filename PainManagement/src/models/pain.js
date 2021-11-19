const mongoose = require('mongoose')
const painSchema = mongoose.Schema({
    painType: {
        type: Object,
        required: true
    },
    painScale: {
        type: Number,
        required: true
    },
    dateTimeReg: {
        type: Date,
        required: true
    },
    applicationOfDrugs: {
        type: Boolean,
        required: true
    }
})

module.exports=mongoose.model('pain', painSchema)