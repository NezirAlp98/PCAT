const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const photo=require('./models/Photo');
const Photo = require('./models/Photo');
require('dotenv').config();


const app = express();
const db=process.env.DB_URI;

//connect DB
mongoose
  .connect(
    db
  )
  .then(() => console.log('MongoDB baglantisi kuruldu.'));


//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const photos=await Photo.find({});
  res.render('index', {
    photos
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  //res.render('photo');
  const photo=await Photo.findById(req.params.id);
  res.render('photo',{
    photo
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => console.log(`Sunucu ${port} portunda başlatıldı...`));
