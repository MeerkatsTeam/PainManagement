const express = require('express')
const painSchema = require('../models/pain')
const router = express.Router()

/*=======================POST======================*/

// Agregamos un nuevo doctor
router.post('/pains', (req, res) =>{
    const user = painSchema(req.body)
    user
        .save()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json(error)})
})


/*=======================GET======================*/

// Listar los doctor existentes en la BD
router.get('/pains', (req, res)=>{
    painSchema
        .find()
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

// Consultar un recurso específico existente en la BD
router.get('/pains/:id', (req, res)=>{
    const {id} = req.params
    painSchema
        .findById(id)
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================DELETE======================*/

// Eliminar un recurso específico existente en la BD
router.delete('/pains/:id',(req, res)=>{
    const {id} = req.params
    painSchema
        .remove({ _id: id })
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

/*=======================PUT======================*/

//Actualizar un recurso específico existente en la BD
router.put('/pains/:id', (req, res)=>{
    const {id} = req.params
    const {painType, painScale, dateTimeReg, applicationOfDrugs} = req.body
    painSchema
        .updateOne({ _id: id },{$set:{painType, painScale, dateTimeReg, applicationOfDrugs}})
        .then((data)=>{res.json(data)})
        .catch((error)=>{res.json({message:error})})
})

module.exports = router