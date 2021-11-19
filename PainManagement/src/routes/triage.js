const express = require('express')
const triageSchema = require('../models/triage')
const router = express.Router()

/*=======================POST======================*/

// Agregamos un nuevo triage
router.post('/triages', (req, res) =>{
    const user = triageSchema(req.body)
    user
        .save()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json(error)})
})


/*=======================GET======================*/

// Listar los triage existentes en la BD
router.get('/triages', (req, res)=>{
    triageSchema
        .find()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

// Consultar un recurso específico existente en la BD
router.get('/triages/:id', (req, res)=>{
    const {id} = req.params
    triageSchema
        .findById(id)
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================DELETE======================*/

// Eliminar un recurso específico existente en la BD
router.delete('/triages/:id',(req, res)=>{
    const {id} = req.params
    triageSchema
        .remove({ _id: id })
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================PUT======================*/

//Actualizar un recurso específico existente en la BD
router.put('/triages/:id', (req, res)=>{
    const {id} = req.params
    const {username, password} = req.body
    triageSchema
        .updateOne({ _id: id },{$set:{username, password}})
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

module.exports = router