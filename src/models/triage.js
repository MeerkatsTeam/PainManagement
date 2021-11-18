const mongoose = require('mongoose')
const triageSchema = mongoose.Schema({

    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Triage',triageSchema)