const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const Promotions=require('../models/promotions')
const authenticate=require('../authenticate');


const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode=403;
    res.end('put promotions not supported');
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.create(req.body)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode=403;
    res.end('post promotions not supported');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{
        new:true
    })
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

module.exports=promoRouter;