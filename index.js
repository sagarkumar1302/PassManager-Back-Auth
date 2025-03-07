const express = require("express")
const app = express();
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")
const authRouter = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const appRoutes = require("./routes/application")
dotenv.config();
require("./models/db")
const PORT = process.env.PORT;
console.log((PORT));
app.use(bodyParser.json());
app.use(cors())
app.use('/auth',authRouter )
app.use('/product',productRoutes )
app.use('/application',appRoutes )
app.get("/", (req,res)=>{
    res.send("hello")
})
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})