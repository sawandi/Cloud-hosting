const mongoose = require('mongoose')

//modal for ordered item
var myItem = mongoose.model('myItem',{
    type: {type:String},
    email: {type:String},
    proId: {type:String},
    listId: {type:String},
    proName: {type:String},
    proPrice: {type:Number},
    proDiscount: {type:Number},
    proQuantity : {type:Number},
    total : {type:Number},
    proImage : {type:String},
    payment: {type:String}
})

module.exports = { myItem }