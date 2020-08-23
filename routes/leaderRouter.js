const express=require('express');
const bodyParser=require('body-parser');

const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('get all leaders');
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end('put leaders not supported');
})
.post((req,res,next) => {
    res.end('post leaders' + req.body.name + ' and ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('delete all leaders');
})

leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('get leader '+req.params.leaderId);
})
.post((req,res,next) => {
    res.statusCode=403;
    res.end('post leaders not supported');
})
.put((req,res,next) => {
    res.write('update leader '+req.params.leaderId+'\n');
    res.end('put leader ' + req.body.name + ' and ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('delete leader '+req.params.leaderId);
})

module.exports=leaderRouter;