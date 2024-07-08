const error = require("../utils/error");
const { body, param, check } = require("express-validator");




const productRegister=[

    check('productName').notEmpty().withMessage('Product name is required.'),
    check('productCompany').notEmpty().withMessage('Product company is required.'),
    check('productPrice').notEmpty().withMessage('Product price is required.'),
    check('productModel').notEmpty().withMessage('Product model is required'),

];
const productOrdered=[
    check('orderedProductId').notEmpty().withMessage('Product id is required.'),
    check('buyerName').notEmpty().withMessage('Buyer name is required.'),
    check('buyerMno').notEmpty().withMessage('Buyer mobile number is required.'),
    check('villName').notEmpty().withMessage('Buyer village name is required.'),
    check('distName').notEmpty().withMessage('Buyer district name is required.'),
    check('nearPlace').notEmpty().withMessage('Buyer near place name is required.'),
    check('state').notEmpty().withMessage('Buyer state name is required.'),
    check('pinCode').notEmpty().withMessage('Buyer Pincode number is required.'),
    check("buyerEmail").notEmpty().withMessage("buyer email is required").custom((value) => {
        if (!value.includes("@") || !value.includes(".")) {
          throw new Error("ache se likho");
        }
        return true;
      }),
  

]


module.exports={productRegister,productOrdered};