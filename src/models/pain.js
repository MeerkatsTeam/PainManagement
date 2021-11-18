const mongoose = require('mongoose')
const painSchema = mongoose.Schema({

    PainType:{
        type:Object,
        required:true
    },
    
    PainScale:{
        type:Number,
        required:true
    },
    DateTimeReg:{
        type:Date,
        required:true
    },
    ApplicationOfDrug:{
        type:Boolean,
        required:true
    }

})

module.exports=mongoose.model('Pain',painSchema)