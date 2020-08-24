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

dishRouter.route('/:dishId/comments')
.get((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments);
        }
        else{
            err=new Error('Dish not exist');
            err.status=404;
            return next(err);
        }
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put((req,res,next)=> {
    res.statusCode=403;
    res.end('put not supported: ');
})
.post((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null){
            dish.comments.push(req.body)
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },(err)=>console.log(err))
        }
        else{
            err=new Error('Dish not exist');
            err.status=404;
            return next(err);
        }
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.delete((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null){
            for(var i=(dish.comments.length-1);i>=0;i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },(err)=>next(err))
        }
        else{
            err=new Error('Dish not exist');
            err.status=404;
            return next(err);
        }
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
});

dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if(dish==null){
            err=new Error('Dish not exist');
            err.status=404;
            return next(err);
        }
        else{
            err=new Error('Comment not exist');
            err.status=404;
            return next(err);
        }
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.put((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating=req.body.rating
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment=req.body.comment
            }
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },(err)=>console.log(err))
        }
        else if(dish==null){
            err=new Error('Dish not exist');
            err.status=404;
            return next(err);
        }
        else{
            err=new Error('Comment not exist');
            err.status=404;
            return next(err);
        }
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
})
.post((req,res,next)=> {
    res.statusCode=403;
    res.end('put not supported: ');
})
.delete((req,res,next)=> {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },(err)=>console.log(err))
        }
        else if(dish==null){
            err=new Error('Dish not exist');
            err.status=404;
            return next(err);
        }
        else{
            err=new Error('Comment not exist');
            err.status=404;
            return next(err);
        }
    },(err)=>console.log(err))
    .catch((err)=>console.log(err))
});

module.exports=dishRouter;