const { request } = require('express');
const express = require('express');
//const mongoose = require('mongoose');

//cors is used to get rid of the error
const cors = require("cors");

require('./db/config');
const Users = require("./db/Users");
const Product=require("./db/Product")


//integrating jwt last part
const Jwt = require('jsonwebtoken');
const jwtKey='e-comm';

const app = express();
app.use(express.json());//middleware , next one too
app.use(cors());//to see in devtools network if the status is 200 ok


//app.get("/",(req,res)=>{
//    res.send("app started.....")
//});


/*const connectDB=async ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/');
    //creating schemas for curd operations if only get then no need to do
    const productSchema=new mongoose.Schema({});
    const product=mongoose.model('product',productSchema);
    const data=await product.find();
    console.warn(data);

}
connectDB();*/

//posting the data to database
//write start nodemon in pakage.json in scripts then we can use npm start or nodemon to run backend

app.post("/register", async (req, res) => {
    //res.send("api in progress....")
    let user = new Users(req.body);
    let result = await user.save();
    result = result.toObject();//converts into object then delete password(to hide)
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result:"something went wrong !!"})
        }
        res.send({result,auth:token})
    })
    // res.send(result);
})

//a route for login page
app.post("/login", async (req, res) => {
    //if only both r entered continue
    //if only found return else not found 
    if (req.body.password && req.body.email) {
        let user = await Users.findOne(req.body).select("-password");//finding the credentials in database
        //removes password too
        if (user) {
            //from here jwt
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"something went wrong !!"})
                }
                res.send({user,auth:token})
            })
            //using jwt here

        }
        else {
            res.send({ result: "no user found" })
        }
    }
    else {
        res.send({ result: "no user found" })
    }
})


app.post("/add-product",verifyToken, async (req,res)=>{
    let product=new Product(req.body);
    let result= await product.save();
    res.send(result)
});

app.get("/products",verifyToken, async (req,res)=>{
    let products= await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result:"No Products found"})
    }
})

app.delete("/product/:id",async (req,res)=>{
    const result=await Product.deleteOne({_id:req.params.id})
    res.send(result);
}); 
//route can be same (api) but only method shd be diff as here it is get and delete 

//for update api
app.get("/product/:id",verifyToken, async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }
    else{
        res.send({"result":"No record found."})
    }
    
});

//api to set the updated product details 
app.put("/product/:id",verifyToken, async(req,res)=>{
    let result=await Product.updateOne(
    {_id:req.params.id},
    {$set:req.body}
    )
    res.send(result);
});

//search api
app.get("/search/:key",verifyToken, async(req,res)=>{ //middleware used
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
             
        ]
    });
    res.send(result);
});


//middleware is used to verify token
//creating a middleware to verify tokens in other apis where we route
function verifyToken(req,res,next){
    let token = req.headers["authorization"];
    if(token){
        token = token.split(' ')[1]; //bcuz token is in 2nd ele of array
        //console.warn("middleware called",token);
        //toverify
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.status(401).send({result: "Please add valid token with header"});
            }else{
                next();
            }
        })
    }else{ //this else block is for if token is not there 
        res.status(403).send({result: "Please add token with header"})
    }
    //console.warn("middleware called",token);

}




app.listen(5000);