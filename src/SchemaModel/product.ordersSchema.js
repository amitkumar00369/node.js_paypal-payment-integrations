const mongoose=require('mongoose')
const odersProduct=new mongoose.Schema({
    orderedProductId:{
        type:String
    },
    orderedProductPrice:{
        type:Number
    },
    orderedProductName:{
        type:String

    },
    orderedProductModel:{
        type:String

    },
    orderedProductCompany:{
        type:String

    },

    buyerAddress:{

        buyerName:{
            type:String
    
        },
        buyerEmail:{
            type:String
    
        },
        buyerMno:{
            type:String
    
        },
        villName:{
            type:String
        },
        distName:{
            type:String
        },
        pinCode:{
            type:String

        },
        nearPlace:{
            type:String

        },
        state:{
            type:String
        }
    },


})
module.exports=mongoose.model('UserOrderedTable',odersProduct)