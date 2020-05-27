const mongoose = require('mongoose')

//modal for new product
var NewProduct = mongoose.model('product',{
    name : {type:String},
    category : {type:String},
    quantity : {type:Number},
    price : {type:Number},
    discount : {type:Number},
    image : {type:String},
})

module.exports = { NewProduct }