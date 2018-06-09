const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8000;


var app = express();


app.set('view engine' , 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req , res , next) => {

  var now = new Date().toString();
  var log =  `${now},${req.method},${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    console.log(err);

  })
  next();
});



app.get('/',(req , res) => {
  res.send('hello world');
});


app.get('/about' ,(req , res) => {
  res.render('about.hbs',{
    page_title: 'About page'
  });
});


app.get('/bad',(req , res) => {
  res.send({
    error: 'pagenotfound',
    status: 'page not found'
  });
});

app.listen(port);
