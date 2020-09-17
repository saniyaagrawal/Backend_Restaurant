var express = require('express');
var bodyParser=require('body-parser');
var User=require('../models/user');
var passport = require('passport');
var authenticate=require('../authenticate');
const cors=require('./cors')

var router = express.Router();
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
  User.find({})
  .then((user)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(user)
  })
});

router.post('/signup', cors.corsWithOptions, function(req, res, next) {
  User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
    if(err){
      res.statusCode=500;
      res.setHeader('Content-Type','application/json')
      res.json({err:err})
    }
    else{
      if(req.body.firstname)
        user.firstname=req.body.firstname
      if(req.body.lastname)
        user.lastname=req.body.lastname
      user.save((err, user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        else{
          passport.authenticate('local')(req,res ,()=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json')
            res.json({success: true,status: 'registration successful'})
          })
        }
      })
    }
  })
})

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) =>{

  var token=authenticate.getToken({_id: req.user._id});
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success: true,token: token, status: 'you aree logged in'});
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

router.get('/facebook/token', passport.authenticate('facebook-token'),(req,res)=>{
  if(req.user){
    var token=authenticate.getToken({_id: req.user._id});
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success: true,token: token, status: 'you aree logged in'});
  }
})

module.exports = router;
