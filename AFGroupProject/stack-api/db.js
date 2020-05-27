//create a database connection
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:root@cluster0-dwdrm.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if(!err){
            console.log("connection success!")
        }else{
            console.log("connection fail!" + JSON.stringify(err, undefined , 2))
        }
    })