const express=require('express')
const cors=require('cors')
const app=express();

const whiteList=['http://localhost:3000','https://localhost:3443']

const corsOptionsDelegate= (req,callback)=>{
    console.log(req.header('Origin'))
    if(whiteList.indexOf(req.header('Origin')) >=0){
        callback(null, {origin:true})
    }
    else{
        callback(null, {origin:false})
    }
}

exports.cors=cors();
exports.corsWithOptions=cors(corsOptionsDelegate);