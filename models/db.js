const mongoose = require("mongoose")
const mongo_url = process.env.MONGO_URI;
mongoose.connect(mongo_url)
.then(()=>{
    console.log("Mongo db is connected");
})
.catch((err)=>{
    console.log("Error while connecting the mongo db");
})