const express=require('express');

const app=express();
app.set('view engine','jade');

app.get('/',(req,res)=>res.render('index',{title:'Guru99',message:'Welcome to node.js and jade'}) );
const server = app.listen(3000,function(){});