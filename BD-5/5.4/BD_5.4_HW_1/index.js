let express = require("express");
let { book } = require("./models/book.model");
let { author } = require("./models/author.model");
let { sequelize } = require("./lib/index");
let app = express();

app.use(express.json());

let books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

let authors = [
  { name: "J.K Rowling", birthYear: 1965 },
];

// seed initial data in book and autohr table
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // use in development environment only.

    await book.bulkCreate(books);
    await author.bulkCreate(authors);

    res.status(200).json({ message: "Database seeding successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// fetch all books
async function fetchAllBooks() {
  let allBooks = await book.findAll();
  return {allBooks};
}
app.get('/books', async (req, res) => {
  try {
    let response = await fetchAllBooks();
    if (response.allBooks.length === 0) {
      return res.status(404).json({ message: "No Books Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// fetch all authors
async function fetchAllAuthors() {
  let allAuthors = await author.findAll();
  return {allAuthors};
}
app.get('/authors', async (req, res) => {
  try {
    let response = await fetchAllAuthors();
    if (response.allAuthors.length === 0){
      return res.status(404).json({message: "No Authors Found."})
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})
// Exercise 1: Create New Author
async function addNewAuthor(newAuthor){
  let updatedAuthor = await author.create(newAuthor);
  return {message: 'author added!',updatedAuthor}
}
app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Author by ID
async function updateAuthorById(id, newAuthorData) {
  let newAuthor = await author.findOne({where: {id}});
  if (!newAuthor) return {};
  newAuthor.set(newAuthorData);
  let updatedAuthor = await newAuthor.save();
  return {message: 'Author updated successfully', updatedAuthor}
}
app.post("/authors/update/:id", async (req, res) => {
  try {
    let newAuthorData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateAuthorById(id, newAuthorData);
    if (!response.message) {
      res.status(404).json({message: 'No Author Found.'})
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000"),
);
