const PRODUCT=require('../SchemaModel/productsSchema');
const ORDER=require('../SchemaModel/product.ordersSchema')
const error=require('../utils/error');



const productInsert=async(req,res)=>{
    try{
        const {productName,productModel,productPrice,productCompany}=req.body;

        const addProduct=await PRODUCT.create({productName:productName,productCompany:productCompany,
            productModel:productModel,productPrice:productPrice
        })
        console.log('step1')

        return res.status(error.status.OK).json({
            message:"Product successfully has added",
            data:addProduct,
            code:error.status.Ok

        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal server error",
            code:500
        })
    }

}


const OrderedProducts=async(req,res)=>{
    try {
        const {orderedProductId}=req.body;
        const find=await PRODUCT.findOne({_id:orderedProductId})
        if (!find){
            return res.status(error.status.NOT_FOUND).json({
                message:'Product not found from this prodcut Id !',
                code:error.status.NOT_FOUND
            })
        }
        else{
            const {buyerName,buyerEmail,buyerMno,villName,distName,pinCode,nearPlace,state}=req.body;
            const ordFind=await ORDER.findOne({orderedProductId:find._id})
            if (!ordFind){
                const Ordered=await ORDER.create({orderedProductId:find._id, orderedProductModel: find.productModel,
                    orderedProductName:find.productName,orderedProductPrice:find.productPrice,orderedProductCompany:find.productCompany,
                    buyerAddress:{buyerName:buyerName,buyerEmail:buyerEmail,buyerMno:buyerMno,villName:villName,distName:distName,
                    pinCode:pinCode,nearPlace:nearPlace,state:state}
                })
                console.log("firste")
                return res.status(error.status.OK).json({
                    message:'Ordered Successfully',
                    details:Ordered,
                    code:200})
                
            }
            else{
                const Ordered=await ORDER.create({orderedProductId:find._id, orderedProductModel: find.productModel,
                    orderedProductName:find.productName,orderedProductPrice:find.productPrice,orderedProductCompany:find.productCompany,
                    buyerAddress:{buyerName:buyerName,buyerEmail:buyerEmail,buyerMno:buyerMno,villName:villName,distName:distName,
                    pinCode:pinCode,nearPlace:nearPlace,state:state}
                    



            })
            console.log("firste2")
            return res.status(error.status.OK).json({
                message:'Ordered Successfully',
                details:Ordered,
                code:200
            })
        
        }
  
    }
    
    // return res.status(error.status.Ok).json({
    //     message:'Ordered Successfully',
    //     details:Ordered,
    //     code:200})

}
    catch(error){
        console.log(error.message)
        return res.status(500).json({
            message:'Internal server error',
            code:500

        })   }

}

module.exports={OrderedProducts,productInsert};