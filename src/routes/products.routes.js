const express=require('express')

const products=require('../controllers/products.controller')
const message=require('../middlewares/errorHandlers')
const validator=require('../validators/products.validations')
const paymenOrder=require('../services/paypal')

const router=express.Router()



router.post('/productRegister',validator.productRegister,message.errorResponse,products.productInsert)
router.post('/order',validator.productOrdered,message.errorResponse,products.OrderedProducts)
router.post('/payment',message.errorResponse,paymenOrder.createOrder)
// router.post('/pay',message.errorResponse,paymenOrder.Redirect_url)
// router.post('/completOrder',message.errorResponse,paymenOrder.completeOrder)
// router.post('/cancelOrder',message.errorResponse,paymenOrder.cancelOrder)

module.exports=router