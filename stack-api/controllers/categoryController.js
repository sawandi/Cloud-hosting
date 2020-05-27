const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { ProductCategory } = require('../models/productCategory')

/************APIs for manage categories*********/

//API for get all categories
router.get('/',(req,res)=>{
    ProductCategory.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for create a category
router.post('/',(req,res)=>{
    var newRecord= new ProductCategory({
        name : req.body.name
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while register : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for update a category
router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        name : req.body.name
    }

    ProductCategory.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for delete a category
router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    ProductCategory.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router