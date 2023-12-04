const express=require("express");
const { UserModel } = require("../Model/users.model");

const userRouter=express.Router();

userRouter.post("/contacts",async (req,res)=>{
  
    try {
     let userData=new UserModel(req.body);
     await userData.save();
     res.status(200).send({message:"Contact Added Successfully!",userData})
    } catch (error) {
     res.status(404).send({message:"Error"})
    }
 })
 
 userRouter.get("/contacts/:id",async (req,res)=>{
    const {id}=req.params;
      try {
       let userData=await UserModel.findOne({_id:id});
       res.status(200).send(userData)
      } catch (error) {
       res.status(404).send({message:"Error"})
      }
   })

userRouter.patch("/contacts/:id",async (req,res)=>{
  const {id}=req.params;
    try {
     let userData=await UserModel.findByIdAndUpdate({_id:id},req.body);
      console.log(userData);
     res.status(200).send({message:"Contact Updated Successfully!"})
    } catch (error) {
     res.status(404).send({message:"Error"})
    }
 })
 
userRouter.delete("/contacts/:id",async (req,res)=>{
    const {id}=req.params;
    try {
        let userData=await UserModel.findByIdAndDelete({_id:id});

     res.status(200).send({message:"Contact Deleted Successfully!"})
    } catch (error) {
     res.status(404).send({message:"Error"})
    }
 })
 

userRouter.get("/contacts",async (req,res)=>{
  let query={};
 
  if(req.query.q){
    query.name={$regex:req.query.q,$options:'i'}
  }
 
   try {
    let userData=await UserModel.find(query);
    res.status(200).send(userData)
   } catch (error) {
    res.status(404).send({message:"Error"})
   }
})

userRouter.get("/appointment",(req,res)=>{
    res.send("Server is Running!")
})


module.exports={
    userRouter
}
