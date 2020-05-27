const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId


var { myItem } = require('../models/myItem')

/* APIs for manage products of the shopping cart */


router.get('/',(req,res)=>{
    myItem.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})
/* Create product Details */
router.post('/',(req,res)=>{
    var newRecord= new myItem({
        type: req.body.type,
        email: req.body.email,
        proId: req.body.proId,
        listId: req.body.wish_list,
        proName: req.body.proName,
        proPrice: req.body.proPrice,
        proDiscount: req.body.proDiscount,
        proQuantity : req.body.quantity,
        total : req.body.total,
        proImage : req.body.proImage
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while creating new records : '+JSON.stringify(err,undefined,2))
        }
    })
})

/* Update product from Shopping cart */
router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        type: req.body.type,
        payment: req.body.payment
    }

    myItem.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

/* Delete product from Shopping cart */
router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    myItem.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router