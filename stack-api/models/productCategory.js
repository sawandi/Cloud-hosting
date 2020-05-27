const mongoose = require('mongoose')

//modal for category
var ProductCategory = mongoose.model('category',{
    name : {type:String}
})

module.exports = { ProductCategory }