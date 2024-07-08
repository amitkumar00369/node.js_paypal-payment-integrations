const axios = require('axios');
const { json } = require('body-parser');
require('dotenv').config();
const UserProductOrderTables=require('../SchemaModel/product.ordersSchema')
const OrderConfirmTable=require('../SchemaModel/OrderConfirm');
const { application, response } = require('express');
const { link } = require('../routes/products.routes');
const { Result } = require('express-validator');


// Function to generate access token from PayPal
async function generateAccessToken() {
    try {
        const response = await axios({
            url: process.env.PAYPAL_URL + '/v1/oauth2/token',
            method: 'post',
            data: 'grant_type=client_credentials',
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_CLIENT_SECRET
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // const  token= await response.data.access_token;
        console.log('Generated Access Token:', response.data);
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate access token');
    }
}

// Function to create an order
exports.createOrder = async (req, res) => {

        const accessToken = await generateAccessToken();
        
        // const accessToken =await response.data.access_token
        console.log('access_token',accessToken)
        // const { userId } = req.body;

        // if (!userId) {
        //     return res.status(400).json({
        //         message: 'Please enter userId from UserProductOrderTables',
        //         code: 400
        //     });
        // }

        // const find = await UserProductOrderTables.findOne({ _id: userId });

        // if (!find) {
        //     return res.status(404).json({
        //         message: 'User Id not found in UserProductOrderTables',
        //         code: 404
        //     });
        // }

        // if (!find.orderedProductPrice) {
        //     return res.status(400).json({
        //         message: 'orderedProductPrice not found for this userId',
        //         code: 400
        //     });
        // }

        // let valueInDollar = Math.ceil(find.orderedProductPrice / 85);

        const response = await axios({
            url: process.env.PAYPAL_URL + '/v2/checkout/orders',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + accessToken
                'Authorization': 'Bearer '+accessToken
            },
            data: JSON.stringify({
                "intent": "CAPTURE",
                "purchase_units": [{
                    "items": [{
                        "name": 'Buy products Paypal integrations',
                        "description": 'for future projects so we learn paypal integrations',
                        "quantity": 1,
                        "unit_amount": {
                            "currency_code": 'USD',
                            "value": 100
                        }
                    }],
                    "amount": {
                        "currency_code": 'USD',
                        "value": 100,
                        "breakdown": {
                            "item_total": {
                                "currency_code": 'USD',
                                "value": 100
                            }
                        }
                    }
                }],
                "application_context": {
                    "return_url": process.env.Base_Url + 'complete-order',
                    "cancel_url": process.env.Base_Url + 'cancel-order',
                    "shipping_preference": "NO_SHIPPING",
                    "user_action":"PAY_NOW",
                    brand_name:"amit.i0"
                }
            })
        });

        console.log('PayPal Response:', response.data.links.find(link=>link.rel==='approve').href);
        
        // res.status(200).json(response.data.links.find(link=>link.rel==='approve').href);
        return response.data.links.find(link=>link.rel==='approve').href
    // } catch (error) {
    //     console.error('Error creating order:', error.response ? error.response.data : error.message);
    //     res.status(500).json({
    //         message: 'An error occurred while creating the order',
    //         code: 500,
    //         error: error.response ? error.response.data : error.message
    //     });
    // }
};


exports.captureOrder=async(orderId)=>{
    const accessToken=await generateAccessToken();

    const response = await axios({
        url: `${process.env.PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    return response.data;

}

// const Redirect_url=async(req,res)=>{
//     try{
//         const url=response.data.links.find(link=>link.rel==='approve').href
//         return res.status(error.status.Ok).json({
//             message:"Successfull",
//             paymet_link:url
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             message:"Internal server Error",
            
//         })

//     }
// }

// const completeOrder=async(req,res)=>{
//     res.send("complete-order")
// }
// const cancelOrder=async(req,res)=>{
//     res.send('cancel-order')
// }
// module.exports={createOrder,completeOrder,cancelOrder,Redirect_url}
// this.createOrder