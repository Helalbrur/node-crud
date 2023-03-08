const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const Mobile = require('./models/Mobile');

const app = express();


// Serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/node_modules'));

app.use(express.static('public'));

// This will allow you to serve files from the "public" directory
// You can create a "public" directory in the root of your project
// and place your CSS file there


// Set up views
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up body parser
app.use(express.urlencoded({ extended: false }));

// Set up routes
app.get('/', async (req, res) => {
  const mobiles = await Mobile.findAll();
  res.render('index', { mobiles,layout: 'layouts/main' });
});

app.get('/create', (req, res) => {
  res.render('create' , { layout: 'layouts/main'});
});

app.post('/create', async (req, res) => {
  const { name } = req.body;
  await Mobile.create({ name });
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const mobile = await Mobile.findByPk(id);
  res.render('edit', { mobile , layout: 'layouts/main'});
});

app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const mobile = await Mobile.findByPk(id);
  mobile.name = name;
  await mobile.save();
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const mobile = await Mobile.findByPk(id);
  await mobile.destroy();
  res.redirect('/');
});

// Set up database connection and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
});
