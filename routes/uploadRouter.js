const express=require('express');
const bodyParser=require('body-parser');
const authenticate=require('../authenticate');
const multer=require('multer');

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const imageFileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        cb(new Error('not an image file'),false);
    }
    cb(null,true);
}

const upload=multer({
    storage: storage,
    fileFilter:imageFileFilter
})

const uploadRouter=express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=> {
    res.statusCode=403;
    res.end('get not supported: /imageupload');
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'),(req,res)=> {
    res.statusCode=200;
    res.setHeader('Content-type', 'application/json')
    res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=> {
    res.statusCode=403;
    res.end('put not supported: /imageupload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=> {
    res.statusCode=403;
    res.end('delete not supported: /imageupload');
})

module.exports=uploadRouter;