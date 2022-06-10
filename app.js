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
 res.sendFile('./views/index.html', {root: __dirname});
} );

app.get('/about',(req, res)=>{
    // res.send('<p>about page</p>');
    res.sendFile('./views/about.html', {root: __dirname});
   } );

// redirects
app.get('/about-us', (re, res)=>{
    res.redirect('/about');
} );

//404 page
app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});