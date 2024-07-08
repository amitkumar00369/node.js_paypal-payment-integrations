const mongoose=require('mongoose')

const Products=new mongoose.Schema({
   productName:{
    type:String,
    required:true
   },
   productCompany:{
    type:String,
    required:true

   },
   productPrice:{
    type:Number,
    required:true
   },
   productModel:{
    type:String,
    required:true
   },

})
module.exports=mongoose.model('ProductsTable',Products)
