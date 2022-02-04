const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

//Connect Database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, () => console.log('Database Connected...'));

//Import Routes
const authRoute = require('./routes/auth');
const wishlistRoute = require('./routes/wishlist');

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', authRoute); 
app.use('/wishlist', wishlistRoute);
		
app.get('/', async (req,res) => console.log('test'));
app.listen(4000, () => console.log('Server Ready On Port:4000...'));