const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const Promotions=require('../models/promotions')
const autheticate=require('../authenticate');


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
.put(autheticate.verifyUser, (req,res,next) => {
    res.statusCode=403;
    res.end('put promotions not supported');
})
.post(autheticate.verifyUser, (req,res,next) => {
    Promotions.create(req.body)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete(autheticate.verifyUser, (req,res,next) => {
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
.post(autheticate.verifyUser, (req,res,next) => {
    res.statusCode=403;
    res.end('post promotions not supported');
})
.put(autheticate.verifyUser, (req,res,next) => {
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
.delete(autheticate.verifyUser, (req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

module.exports=promoRouter;