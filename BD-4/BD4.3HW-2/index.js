const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.3HW-2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW2 Handling Errors..." });
});

//Endpoint 1: Fetch All Recipes by Cuisine
app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    const results = await filterByCuisine(cuisine);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to Fetch All Recipes by Cuisine
const filterByCuisine = async (cuisine) => {
  let query = "SELECT * FROM recipes WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { recipes: response };
};

// Endpoint 2: Fetch All Recipes by Main Ingredient
app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  let main_ingredient = req.params.main_ingredient;
  try {
    let results = await filterByMainIngredient(main_ingredient);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// function to Fetch All Recipes by Main Ingredient
const filterByMainIngredient = async (main_ingredient) => {
  let query = "SELECT * FROM recipes WHERE main_ingredient = ?";
  let response = await db.all(query, [main_ingredient]);
  return { recipes: response };
};

// Endpoint 3: Fetch All Recipes by Preparation Time
app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  let preparation_time = parseInt(req.params.preparation_time);
  try {
    const results = await filterByPreparationTime(preparation_time);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// function to retrieve Recipes by Preparation Time
const filterByPreparationTime = async (preparation_time) => {
  let query = "SELECT * FROM recipes WHERE preparation_time <= ?";
  let response = await db.all(query, [preparation_time]);
  return { recipes: response };
};

// Endpoint 4: Fetch All Recipes by Difficulty
app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  let difficulty = req.params.difficulty;
  try {
    const results = await filterByDifficulty(difficulty);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// function to retrieve recipes by difficulty
const filterByDifficulty = async (difficulty) => {
  let query = "SELECT * FROM recipes WHERE difficulty = ?";
  let response = await db.all(query, [difficulty]);
  return { recipes: response };
};

// Endpoint 5: Fetch All Recipes by Vegetarian Status
app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  let vegetarian = req.params.vegetarian;
  try {
    const results = await filterByVegetarian(vegetarian);
    if (results.recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to retrieve all recipes by vegeterian status
const filterByVegetarian = async (vegetarian) => {
  let query = 'SELECT * FROM recipes WHERE vegetarian = ?'
  let response = await db.all(query, [vegetarian]);
  return {recipes: response};
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});