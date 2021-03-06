const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const config = require('./config/database');
// var cors = require('cors')
const app = express();



const connection = mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
if (connection) {
  console.log("database connected");
}
else {
  console.log("connection error");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});




app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(createdPost=>{
    res.status(201).json({
      message: 'post addeed successfully',
      postId:createdPost._id
  });

  });

});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched Successfully',
      posts: documents
    });

  });

});

app.put('/api/posts/:id',(req,res,next) =>{

  const post = new Post({
    _id:req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id:req.params.id}, post).then(result =>{

res.status(200).json({
  message: 'Update Successfully'
  });
});
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message:'post not found'});
    }
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Posts deleted  Successfully" });

  });
});





module.exports = app;
