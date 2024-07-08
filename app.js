const express=require('express')
const bodyParser=require('body-parser')
require('dotenv').config()
const cors=require('cors')
const db=require('./src/db/connect_db')
const productRoutes=require('./src/routes/products.routes')
const paypal=require('./src/services/paypal')
app=express()
// app.get('/',async(req,res)=>{
//     console.log('Hello');
//     res.status(200).json({
//         message:"hellow paypal"
//     })
// })


app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
  res.render('views')
})
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// # main paypal file
// app.use('/',productRoutes)
app.post('/pay',async(req,res)=>{
  try{
    const url=await paypal.createOrder();
    console.log('bsfbjkjkdsk',url)
    res.redirect(url)
  }
  catch(error){
    res.status(500).json({
      message:"Internal server error"
    })
  }

})

app.get('/complete-order',async(req,res)=>{
  try{
    const captureResult = await paypal.captureOrder(req.query.token)
    res.send("Compplete Payments from paypal from this lecture")

  }catch(error){
    res.status(500).json({
      message:"Internal server error"
    })
  }
})
app.get('/cancel-order',async(req,res)=>{
  res.redirect('/')
})


app.listen(process.env.port, function () {
  console.log("🚀 ready to go",process.env.port);
});

