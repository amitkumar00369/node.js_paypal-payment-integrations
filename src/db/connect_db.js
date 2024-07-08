const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.db).then(
    () => {
      console.log("Database Connected 📑");
    },
    (err) => {
      console.log("Error: " + err);
    }
);