const mongoose=require('mongoose')

const Order=new mongoose.Schema({
    UserId:{
        type:String
    },
    UserEmail:{
        type:String
    },
    UserName:{
        type:String
    },
    UserMno:{
        type:String
    },
    userProductOrderId:{
        type:String

    },
    userProductOrederPrice:{
        type:Number


    },
    userProductOrederName:{
        type:String


    },
    userProductOrederModel:{
        type:String


    }
})

module.exports=mongoose.model('OrderConfirmTable',Order)
