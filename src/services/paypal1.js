const axios = require('axios');
const UserProductOrderTables=require('../SchemaModel/product.ordersSchema') // Adjust this import according to your actual path
require('dotenv').config();

// Function to generate access token from PayPal
async function generateAccessToken() {
    try {
        console.log('Generating access token...');
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
        console.log('Generated Access Token:', response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate access token');
    }
}

// Function to create an order
exports.createOrder = async (req, res) => {
    try {
        const accessToken = await generateAccessToken();
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: 'Please enter userId from UserProductOrderTables',
                code: 400
            });
        }

        const find = await UserProductOrderTables.findOne({ _id: userId });

        if (!find) {
            return res.status(404).json({
                message: 'User Id not found in UserProductOrderTables',
                code: 404
            });
        }

        if (!find.orderedProductPrice) {
            return res.status(400).json({
                message: 'orderedProductPrice not found for this userId',
                code: 400
            });
        }

        let valueInDollar = Math.ceil(find.orderedProductPrice / 85);

        const orderData = {
            "intent": "CAPTURE",
            "purchase_units": [{
                "items": [{
                    "name": 'Buy products Paypal integrations',
                    "description": 'for future projects so we learn paypal integrations',
                    "quantity": 1,
                    "unit_amount": {
                        "currency_code": 'USD',
                        "value": valueInDollar
                    }
                }],
                "amount": {
                    "currency_code": 'USD',
                    "value": valueInDollar,
                    "breakdown": {
                        "item_total": {
                            "currency_code": 'USD',
                            "value": valueInDollar
                        }
                    }
                }
            }],
            "application_context": {
                "return_url": process.env.Base_Url + 'complete-order',
                "cancel_url": process.env.Base_Url + 'cancel-order',
                "shipping_preference": "NO_SHIPPING"
            }
        };

        console.log('Order Data:', JSON.stringify(orderData, null, 2));

        const response = await axios({
            url: process.env.PAYPAL_URL + '/v2/checkout/orders',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            data: orderData
        });

        console.log('PayPal Response:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
        res.status(500).json({
            message: 'An error occurred while creating the order',
            code: 500,
            error: error.response ? error.response.data : error.message
        });
    }
};
// this.createOrder