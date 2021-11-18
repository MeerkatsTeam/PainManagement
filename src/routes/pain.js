const express = require('express')
const painSchema = require('../models/pain')
const router = express.Router()

router.post('/pains',(req,res)=>{
    const pain = painSchema(req.body)
    pain
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/pains',(req,res)=>{
    painSchema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/pains/:id',(req,res)=>{
    const {id} = req.params
    painSchema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.delete('/pains/:id',(req,res)=>{
    const {id} = req.params
    painSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/pains/:id',(req,res)=>{
    const {id} = req.params
    const {PainType,PainScale,DateTimeReg,ApplicationOfDrug} = req.body
    painSchema
        .updateOne({_id:id},{$set:{PainType,PainScale,DateTimeReg,ApplicationOfDrug}})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

module.exports=router