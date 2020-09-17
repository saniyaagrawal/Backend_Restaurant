const express=require('express');
const bodyParser=require('body-parser');
const cors=require('./cors')

const mongoose=require('mongoose');
const Favorites=require('../models/favorite')

const authenticate=require('../authenticate');

const favoriteRouter=express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{res.sendStatus(200);})
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({user:req.user._id},(err, resp)=>{
        if(err){
            return next(err);
        }
        if(!resp){
            res.statusCode = 403;
            res.end("No favorites found!!");
        }
    })
    .then((favorite)=>{
        Favorites.findOne({user:req.user._id})
        .populate('user')
        .populate('dishes')
        .then((fav)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json')
            res.json(fav)
        },(err)=>console.log(err))
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.statusCode=403;
    res.end('put favorites not supported');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({user:req.user._id},(err, favorite)=>{
        if(err){
            next(err)
        }
        else if(!favorite){
            Favorites.create({user:req.user._id, dishes:[]})
            .then((favor) => {
                favor.dishes=req.body;
                favor.save()
                .then((fav) => {
                    for(var i=0;i<req.body.length;i++){
                        if(fav.dishes.indexOf(req.body[i])===-1){
                            fav.dishes.push(req.body[i])
                        }
                    }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav);           
                }, (err) => next(err))
            }, (err) => next(err))
            .catch((err)=>next(err))
        }
        else{
            favorite.dishes=req.body;
            favorite.save()
            .then((fav) => {
                // Favorites.findone({user:req.user})
                // .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(fav);
                // })            
            }, (err) => next(err));
        }
    })
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.remove({user:req.user._id})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req,res)=>{res.sendStatus(200);})
.get(cors.cors, (req,res,next) => {
    res.statusCode=403;
    res.end('get favorites not supported');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({user:req.user._id},(err, resp)=>{
        if(err)
            next(err);
        else if(!resp){
            Favorites.create({user:req.user._id, dishes:[]})
            .then((favorite)=>{
                favorite.dishes.push(req.params.dishId)
                res.statusCode=200;
                res.setHeader('Content-Type','application/json')
                res.json(favorite)
            },(err)=>next(err))
        }
        else{
            Favorites.findOne({user:req.user._id})
            .then(fav =>{
                if(fav.dishes.indexOf(req.params.dishId)===-1){
                    fav.dishes.push(req.params.dishId)
                }
                fav.save()
                .then((favorite)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json')
                    res.json(favorite)
                },(err)=>next(err))
            },(err)=>next(err))
        }
    })
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.statusCode=403;
    res.end('put favorites not supported');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({user:req.user._id},(err, fav)=>{
        if(err){
            next(err)
        }
        else if(fav){
            if(fav.dishes.indexOf(req.params.dishId)!==-1){
                fav.dishes.splice(fav.dishes.indexOf(req.params.dishId),1)
            }
            fav.save()
            .then((favorite)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json')
                res.json(favorite)
            },(err)=>next(err))
        }
        else{
            res.statusCode=403;
            res.end('favorites does not exist');
        }
    })
})

module.exports=favoriteRouter;