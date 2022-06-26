const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
 
const PORT = 3000;

//listen for requests
app.listen(
    PORT,
    () => {console.log(`i am alive at ${PORT}`)
    });

app.get('/',(req, res)=>{
//  res.send('<p>home page</p>');
 res.render('index', { title: 'Home'});
} );

app.get('/about',(req, res)=>{
    // res.send('<p>about page</p>');
   res.render('about');
   } );

app.get('/blogs/create', (req, res)=>{
  res.render('create'); 
});

//404 page
app.use((req, res)=>{
    res.status(404).render('404');
});