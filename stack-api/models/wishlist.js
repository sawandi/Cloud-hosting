const mongoose = require('mongoose')

//model for wishlist
var wishList = mongoose.model('wishlist',{
    name : {type:String},
    email : {type:String}
})

module.exports = { wishList }