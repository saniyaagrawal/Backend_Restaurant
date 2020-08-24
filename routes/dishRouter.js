const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const Dishes=require('../models/dishes');

const dishRouter=express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req,res,next)=> {
    Dishes.find({})
    .then((dishes)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put((req,res,next)=> {
    res.statusCode=403;
    res.end('put not supported: ');
})
.post((req,res,next)=> {
    Dishes.create(req.body)
    .then((dish)=>{
        console.log(dish);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete((req,res,next)=> {
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
});

dishRouter.route('/:dishId')
.get((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put((req,res,next)=> {
    Dishes.findByIdAndUpdate(req.params.dishId,{
        $set: req.body
    },{ 
        new:true
    })
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.post((req,res,next)=> {
    res.statusCode=403;
    res.end('Not supported post');
})
.delete((req,res,next)=> {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
});

module.exports=dishRouter;