let express = require('express');
let {post} = require('./models/post.model');
let {sequelize} = require('./lib/index');
let app = express();

let bookData = [
  {
    name: 'Eloquent JavaScript, Third Edition',
    author: 'Marijn Haverbeke',
    title: 'A Modern Introduction to Programming',
    content: '472 pages'
  },
  {
    name: 'Practical Modern JavaScript',
    author: 'Nicolás Bevacqua',
    title: 'Dive into ES6 and the Future of JavaScript',
    content: '334 pages'
  },
  {
    name: 'Understanding ECMAScript 6',
    author: 'Nicholas C. Zakas',
    title: 'The Definitive Guide for JavaScript Developers',
    content: '352 pages'
  },
  {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    title: 'An In-Depth Guide for Programmers',
    content: '460 pages'
  },
  {
    name: 'Learning JavaScript Design Patterns',
    author: 'Addy Osmani',
    title: 'A JavaScript and jQuery Developer\'s Guide',
    content: '254 pages'
  }
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({force: true});

    await post.bulkCreate(bookData);
    return res.status(200).json({message: 'database seeding successful'});
  } catch (error) {
    return res.status(500).json({message: 'Error seeding the data', error: error.message});
  }
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})