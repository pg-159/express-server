const express = require('express');
const {error} = require('console');
const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
    db = await open({
      filename: "./BD4-A1/database.sqlite",
      driver: sqlite3.Database,
    });
  })();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD-4 - Assignment 1"});
});
// Endpoint 1: Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
      const results = await fetchAllRestaurants();
      if (results.restaurants.length === 0) {
          return res.status(404).json({ message: "No restaurants found" });
      }
      res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchAllRestaurants = async () => {
  const query = 'SELECT * FROM restaurants';
  const response = await db.all(query,[]);
  return { restaurants: response };
};

// Endpoint 2: Get a specific restaurant by ID
app.get("/restaurants/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const results = await fetchRestaurantById(id);
      if (results.restaurants.length === 0) {
          return res.status(404).json({ message: "Restaurant not found" });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchRestaurantById = async (id) => {
  const query = 'SELECT * FROM restaurants WHERE id = ?';
  const response = await db.all(query, [id]);
  return { restaurants: response };
};

// Endpoint 3: Get Restaurants by Cuisine
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
      const results = await fetchRestaurantsByCuisine(cuisine);
      if (results.restaurants.length === 0) {
          return res.status(404).json({ message: "No restaurants found for "+cuisine+" cuisine" });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchRestaurantsByCuisine = async (cuisine) => {
  const query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  const response = await db.all(query, [cuisine]);
  return { restaurants: response };
};

// Endpoint 4: Get Restaurants by Veg/Non-Veg
app.get("/restaurants/filter", async (req, res) => {
  const isVeg = req.query.isVeg;
  const hasOutdoorSeating = req.query.hasOutdoorSeating;
  const isLuxury = req.query.isLuxury;
  try {
      const results = await fetchRestaurantsByVeg(isVeg, hasOutdoorSeating, isLuxury);
      if (results.restaurants.length === 0) {
          return res.status(404).json({ message: "No restaurants found for "+isVeg+" cuisine" });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchRestaurantsByVeg = async (isVeg, hasOutdoorSeating, isLuxury) => {
  const query = 'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?';
  const response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
};

// Endpoint 5: Get Restaurants Sorted by Rating
app.get("/restaurants/sort-by-rating", async (req, res) => {
  try {
      const results = await fetchRestaurantsSortedByRating();
      if (results.restaurants.length === 0) {
          return res.status(404).json({ message: "No restaurants found" });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchRestaurantsSortedByRating = async () => {
  const query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  const response = await db.all(query, []);
  return { restaurants: response };
};

// Endpoint 6: Get all Dishes
app.get("/dishes", async (req, res) => {
  try {
      const results = await fetchAllDishes();
      if (results.dishes.length === 0) {
          return res.status(404).json({ message: "No dishes found" });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchAllDishes = async () => {
  const query = 'SELECT * FROM dishes';
  const response = await db.all(query, []);
  return { dishes: response };
};

// Endpoint 7: Get a specific dish by ID
app.get("/dishes/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const results = await fetchDishById(id);
      if (results.dishes.length === 0) {
          return res.status(404).json({ message: "Dish not found" });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchDishById = async (id) => {
  const query = 'SELECT * FROM dishes WHERE id = ?';
  const response = await db.all(query, [id]);
  return { dishes: response };
};

// Endpoint 8: Get Dishes by Veg/Non-Veg
app.get("/dishes/filter", async (req, res) => {
  const isVeg = req.query.isVeg;
  try {
      const results = await fetchDishesByVeg(isVeg);
      if (results.dishes.length === 0) {
          return res.status(404).json({ message: "No dishes found." });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchDishesByVeg = async (isVeg) => {
  const query = 'SELECT * FROM dishes WHERE isVeg = ?';
  const response = await db.all(query, [isVeg]);
  return { dishes: response };
};

// Endpoint 9: Get Dishes Sorted by Price
app.get("/dishes/sort-by-price", async (req, res) => {
  try {
      const results = await fetchDishesSortedByPrice();
      if (results.dishes.length === 0) {
          return res.status(404).json({ message: "No dishes found" });
      }
      return res.status(200).json(results);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

const fetchDishesSortedByPrice = async () => {
  const query = 'SELECT * FROM dishes ORDER BY price ASC';
  const response = await db.all(query, []);
  return { dishes: response };
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});