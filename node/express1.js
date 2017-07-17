const express=require('express');

const app=express();
app.get('/',(req, res) => res.send('Welcome to Guru99 Tutorials'));

app.route('/Node').get((req, res) => res.send('Tutorial on Node'));

app.route('/Angular').get((req, res) => res.send('Tutorial on Angular'));


const server=app.listen(3000,function(){});