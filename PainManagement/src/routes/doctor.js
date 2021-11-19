const express = require('express')
const doctorSchema = require('../models/doctor')
const router = express.Router()

/*=======================POST======================*/

// Agregamos un nuevo doctor
router.post('/doctors', (req, res) =>{
    const user = doctorSchema(req.body)
    user
        .save()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json(error)})
})


/*=======================GET======================*/

// Listar los doctor existentes en la BD
router.get('/doctors', (req, res)=>{
    doctorSchema
        .find()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

// Consultar un recurso específico existente en la BD
router.get('/doctors/:id', (req, res)=>{
    const {id} = req.params
    doctorSchema
        .findById(id)
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================DELETE======================*/

// Eliminar un recurso específico existente en la BD
router.delete('/doctors/:id',(req, res)=>{
    const {id} = req.params
    doctorSchema
        .remove({ _id: id })
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================PUT======================*/

//Actualizar un recurso específico existente en la BD
router.put('/doctors/:id', (req, res)=>{
    const {id} = req.params
    const {citizenId, rethus, drugApplied, doctorName, speciality} = req.body
    doctorSchema
        .updateOne({ _id: id },{$set:{citizenId, rethus, drugApplied, doctorName, speciality}})
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

module.exports = router