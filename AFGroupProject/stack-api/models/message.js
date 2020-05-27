const mongoose = require('mongoose')

// model for comments
var message = mongoose.model('messages',{
    product : {type:String},
    name : {type:String},
    email : {type:String},
    message : {type:String}
})

module.exports = { message }