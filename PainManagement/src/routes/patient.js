const express = require('express')
const patientSchema = require('../models/patient')
const router = express.Router()

/*=======================POST======================*/

// Agregamos un nuevo paceinte
router.post('/patients', (req, res) =>{
    const user = patientSchema(req.body)
    user
        .save()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json(error)})
})


/*=======================GET======================*/

// Listar los pacientes existentes en la BD
router.get('/patients', (req, res)=>{
    patientSchema
        .find()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

// Consultar un recurso específico existente en la BD
router.get('/patients/:id', (req, res)=>{
    const {id} = req.params
    patientSchema
        .findById(id)
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================DELETE======================*/

// Eliminar un recurso específico existente en la BD
router.delete('/patients/:id',(req, res)=>{
    const {id} = req.params
    patientSchema
        .remove({ _id: id })
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================PUT======================*/

//Actualizar un recurso específico existente en la BD
router.put('/patients/:id', (req, res)=>{
    const {id} = req.params
    const {citizenId, dateTimeAdmission} = req.body
    patientSchema
        .updateOne({ _id: id },{$set:{citizenId, dateTimeAdmission}})
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

module.exports = router