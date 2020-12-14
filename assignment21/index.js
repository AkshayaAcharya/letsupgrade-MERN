const express = require("express");
const cors = require("cors");
const userRouter = require("./user");
const productRouter = require("./product");


const app = express();
app.use(cors());
app.use(express.json());


//Router use
app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/", (req, res)=>{
    res.send({"message": "Test  Get  Successful"});
})

app.listen("3000");


