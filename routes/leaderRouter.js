const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const Leaders=require('../models/leaders')

const autheticate=require('../authenticate');

const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put(autheticate.verifyUser, (req,res,next) => {
    res.statusCode=403;
    res.end('put Leaders not supported');
})
.post(autheticate.verifyUser, (req,res,next) => {
    Leaders.create(req.body)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete(autheticate.verifyUser, (req,res,next) => {
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.post(autheticate.verifyUser, (req,res,next) => {
    res.statusCode=403;
    res.end('post Leaders not supported');
})
.put(autheticate.verifyUser, (req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{
        new:true
    })
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete(autheticate.verifyUser, (req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

module.exports=leaderRouter;