var express = require('express');
var bodyParser=require('body-parser');
var User=require('../models/user');

var router = express.Router();
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  User.findOne({username: req.body.username})
  .then((user)=>{
    if(user!=null){
      var err=new Error('user already exist');   
      err.status=403;
      next(err);
    }
    else{
      return User.create({
        username:req.body.username,
        password: req.body.password
      })
    }
  })
  .then((user)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json({status: 'registration successful', user: user})
  },(err)=>next(err))
  .catch((err)=>next(err))
})

router.post('/login', function(req, res, next) {
    if(!req.session.user){
      var authHead=req.headers.authorization;
  
      if(authHead){
        var auth=new Buffer.from(authHead.split(' ')[1],'base64').toString().split(':');
  
        var username=auth[0];
        var password=auth[1];
        User.findOne({username:username})
        .then((user)=>{
          if(user===null){
            var err=new Error('not valid user');
            err.status=403;
            next(err);
          }
          else if(password !== user.password){
            var err=new Error('wrong password');
            err.status=403;
            next(err);
          }
          else if(username===user.username && password===user.password){
            req.session.user='authenticated';
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain')
            res.end('you are authenticated')
          }
        })
        .catch((err)=>next(err))
      }
      else{
        var err=new Error('not authenicated');
        res.setHeader('WWW-Authenticate','Basic')
        err.status=401;
        return next(err);
      }
    }
    else{
      res.statusCode=200;
      res.setHeader('Content-Type','text/plain')
      res.end('already autheticated');
    }
})

router.get('/logout',(req,res)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err=new Error('you are not logged in');
    err.status=403;
    next(err);
  }
});

module.exports = router;
