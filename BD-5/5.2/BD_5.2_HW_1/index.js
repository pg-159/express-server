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

//Exercise 1: Fetch all posts
async function fetchAllPosts(){
  let posts = await post.findAll();
  return {posts};
}
app.get('/posts', async(req, res) => {
  try {
    let response = await fetchAllPosts();
    if (response.posts.length === 0){
      return res.status(404).json({message: 'No Posts Found.'});
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

//Exercise 2: Fetch post details by ID
async function fetchPostById(id){
  let postData = await post.findOne({where: {id}});
  return {postData};
}
app.get('/posts/details/:id', async(req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchPostById(id);
    if (result.postData === null){
      return res.status(404).json({message: 'No Post Found.'});
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//Exercise 3: Fetch all posts by an author
async function fetchPostsByAuthor(author){
  let posts = await post.findAll({where: {author}});
  return {posts: posts};
}
app.get('/posts/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let result = await fetchPostsByAuthor(author);
    if (result.posts.length === null) {
      return res.status(404).json({message: 'No Posts Found.'})
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

async function sortPostsByName(order) {
  let sortedPosts = await post.findAll({order: [['name', order]]});
  return {sortedPosts};
}
//Exercise 4: Sort all the posts by their name
app.get('/posts/sort/name', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortPostsByName(order);
    if (result.sortedPosts.length === 0){
      return res.status(404).json({message: 'No Posts Found.'})
      }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})