const express=require('express');
const bodyParser=require('body-parser');
const cors=require('./cors')

const mongoose=require('mongoose');
const Promotions=require('../models/promotions')
const authenticate=require('../authenticate');


const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{res.sendStatus(200);})
.get(cors.cors, (req,res,next) => {
    Promotions.find({})
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode=403;
    res.end('put promotions not supported');
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.create(req.body)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

promoRouter.route('/:promoId')
.options(cors.corsWithOptions, (req,res)=>{res.sendStatus(200);})
.get(cors.cors, (req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode=403;
    res.end('post promotions not supported');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
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
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

module.exports=promoRouter;