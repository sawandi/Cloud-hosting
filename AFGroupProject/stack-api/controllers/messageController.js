const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId


var { message } = require('../models/message')

/*******APIs for manage comments***************/

// to retrieve all records
router.get('/',(req,res)=>{
    message.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

// to publish a message with product,name and email
router.post('/',(req,res)=>{
    var newRecord= new message({
        product: req.body.product,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while creating new records : '+JSON.stringify(err,undefined,2))
        }
    })
})

//to update the message content
router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        message: req.body.message
    }

    message.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

// to delete a message
router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    message.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router