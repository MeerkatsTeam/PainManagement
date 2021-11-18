const express = require('express')
const patientSchema = require('../models/patient')
const router = express.Router()

router.post('/patients',(req,res)=>{
    const patient = patientSchema(req.body)
    patient
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/patients',(req,res)=>{
    patientSchema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/patients/:id',(req,res)=>{
    const {id} = req.params
    patientSchema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.delete('/patients/:id',(req,res)=>{
    const {id} = req.params
    patientSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/patients/:id',(req,res)=>{
    const {id} = req.params
    const {CitizenID,DateTimeAdmission} = req.body
    patientSchema
        .updateOne({_id:id},{$set:{CitizenID,DateTimeAdmission}})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

module.exports=router