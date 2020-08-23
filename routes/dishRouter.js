const express=require('express');
const bodyParser=require('body-parser');

const dishRouter=express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=> {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=> {
    res.end('get all dishes');
})
.put((req,res,next)=> {
    res.statusCode=403;
    res.end('put not supported: ');
})
.post((req,res,next)=> {
    res.end('posting: '+req.body.name+ 'with' +req.body.description);
})
.delete((req,res,next)=> {
    res.end('delete all dishes');
});

dishRouter.route('/:dishId')
.get((req,res,next)=> {
    res.end('get dish'+ req.params.dishId);
})
.put((req,res,next)=> {
    res.write('put dish'+ req.params.dishId);
    res.end('with details'+req.body.name+ 'and' +req.body.description)
})
.post((req,res,next)=> {
    res.statusCode=403;
    res.end('Not supported post');
})
.delete((req,res,next)=> {
    res.end('delete');
});

module.exports=dishRouter;