const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');


const app = express();
// const productRoutes = require('./src/routes/product');
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

app.use(bodyParse.json()); //type JSON

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error,req,res,next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message ,data: data});
});

mongoose.connect('mongodb+srv://rikixap:9ET62PazEiGuqbk@cluster0.ecnag.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
    
    app.listen(4000, () => console.log('Connection Sucess'));
})
.catch(err => console.log(err));

app.listen(4000);