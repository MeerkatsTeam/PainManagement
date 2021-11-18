const express = require('express')
const triageSchema = require('../models/triage')
const router = express.Router()

router.post('/triages',(req,res)=>{
    const triage = triageSchema(req.body)
    triage
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/triages',(req,res)=>{
    triageSchema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/triages/:id',(req,res)=>{
    const {id} = req.params
    triageSchema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.delete('/triages/:id',(req,res)=>{
    const {id} = req.params
    triageSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

router.get('/triages/:id',(req,res)=>{
    const {id} = req.params
    const {Username,Password} = req.body
    triageSchema
        .updateOne({_id:id},{$set:{Username,Password}})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}))
})

module.exports=router