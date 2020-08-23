const express=require('express');
const bodyParser=require('body-parser');

const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('get all promotions');
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end('put promotions not supported');
})
.post((req,res,next) => {
    res.end('post promotions' + req.body.name + ' and ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('delete all promotions');
})

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('get promotion '+req.params.promoId);
})
.post((req,res,next) => {
    res.statusCode=403;
    res.end('post promotions not supported');
})
.put((req,res,next) => {
    res.write('update promotion '+req.params.promoId+'\n');
    res.end('put promotion ' + req.body.name + ' and ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('delete promotion '+req.params.promoId);
})

module.exports=promoRouter;