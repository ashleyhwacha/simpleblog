const express = require('express');
const mongoose = require('mongoose');
const Blog =  require('./models/blogs');

const dbCon = require('./config/dbconfig');
const { render } = require('ejs');

require('dotenv').config()

// express app
const app = express();



//connect to mongodb

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> app.listen(3000))
 .catch((err)=> console.log(err));



// register view engine
app.set('view engine', 'ejs');
 


//listen for requests

app.use(express.urlencoded({ extended: true}));
app.use((req, res, next)=>{
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
      title: 'new blog 2',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    });

    blog.save()
      .then((result)=>{
        res.send(result);
      })
      .catch((err)=>{
        console.log(err);
      });
})

app.get('/all-blogs', (req, res)=>{
    Blog.find()
       .then((result)=>{
        res.send(result);
       })
       .catch((err)=>{
        console.log(err); 
       })
});

app.get('/single-blog', (req, res)=>{
   Blog.findById('62daacb542189386d7ec8916')
      .then((result)=>{
        res.send(result);
      })
      .catch((err)=>{  
        console.log(err);
      })
});

app.get('/',(req, res)=>{
  //  res.send('<p>home page</p>');
    res.redirect('/blogs');
  } );

app.use((req, res, next)=>{
  console.log('in the next middleware:');

  next();
});


//routes
app.get('/about',(req, res)=>{
    // res.send('<p>about page</p  >');
   res.render('about', { title: 'About'});
   } );

//blog routes
app.get('/blogs', (req, res)=>{
  Blog.find().sort({createdAt: -1 })
     .then((result)=>{
      res.render('index', {title: 'All Blogs', blogs: result })
     })
     .catch((err)=>{
      console.log(err);
     })
});

app.post('/blogs', (req, res)=>{
  //console.log(req.body); 
  const blog =  new Blog(req.body);

  blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
      console.log(err); 
    })
});

app.get('/blogs/:id', (req, res)=>{
  const id = req.params.id;
  console.log(id);

  Blog.findById(id)
    .then((result)=>{
      render('details', {blog: result, title: 'Blog details' })
    })
    .catch((err)=>{ 
      console.log(err);
    });
});

app.get('/blogs/create', (req, res)=>{
  res.render('create', { title: 'Create A new Blog'}); 
});

//404 page
app.use((req, res)=>{
    res.status(404).render('404', { title: '404'});
});