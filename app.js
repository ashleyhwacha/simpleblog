const express = require('express');
const mongoose = require('mongoose');

const dbCon = require('./config/dbconfig');

require('dotenv').config()

// express app
const app = express();



//connect to mongodb

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> console.log('connected to db'))
 .catch((err)=> console.log(err));



// register view engine
app.set('view engine', 'ejs');
 
const PORT = 3000;

//listen for requests
app.listen(PORT);

app.use((req, res, next)=>{
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.get('/',(req, res)=>{
  //  res.send('<p>home page</p>');
  const blogs = [
      {title: 'Ashley finds purpose', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'Ashley finds superstrength', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'Ashley finds meaning', snippet: 'Lorem ipsum dolor sit amet consectetur'}
  ];
   res.render('index', { title: 'Home', blogs: blogs});
  } );

app.use((req, res, next)=>{
  console.log('in the next middleware:');

  next();
});



app.get('/about',(req, res)=>{
    // res.send('<p>about page</p>');
   res.render('about', { title: 'About'});
   } );

app.get('/blogs/create', (req, res)=>{
  res.render('create', { title: 'Create A new Blog'}); 
});

//404 page
app.use((req, res)=>{
    res.status(404).render('404', { title: '404'});
});