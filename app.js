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
const blogs = [
    {title: 'Ashley finds purpose', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Ashley finds superstrength', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Ashley finds meaning', snippet: 'Lorem ipsum dolor sit amet consectetur'}
];
 res.render('index', { title: 'Home', blogs: blogs});
} );

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