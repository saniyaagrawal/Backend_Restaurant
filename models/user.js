var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Local = require('passport-local-mongoose');

var User=new Schema({
    admin:{
        type:Boolean,
        default: false
    }
})

User.plugin(Local);

module.exports =mongoose.model('User', User);