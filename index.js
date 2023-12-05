'use strict';

const fs = require('fs');
const cakeRecipes = JSON.parse(fs.readFileSync("./cake-recipes.json"));

let savedRecipes = []; // Global array to save selected recipes

// Function to return all unique authors from the recipe list
const getAllAuthors = (recipes) => {
  const authors = new Set();
  recipes.forEach(recipe => authors.add(recipe.Author));
  return Array.from(authors);
};

// Function to log the name of each recipe
const logRecipeNames = (recipes) => {
  if (recipes.length === 0) {
    console.log("No recipes found");
    return;
  }
  recipes.forEach(({ Name }) => console.log(Name));
};

// Function to return all recipes of a given author
const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter(recipe => recipe.Author === author);
};

// Function to return a list of recipes that contain a given ingredient
const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter(recipe => recipe.Ingredients.some(ing => ing.includes(ingredient)));
};

// Modified function to return a single recipe by name and save it
const getRecipeByNameAndSave = (recipes, name) => {
  const recipe = recipes.find(recipe => recipe.Name.includes(name));
  if (recipe) {
    savedRecipes.push(recipe);
    console.log(`Recipe "${name}" saved successfully.`);
    console.log("--------------------------------");
  }
  return recipe;
};

// Function to return all ingredients of saved recipes
const getAllSavedIngredients = () => {
  return Array.from(new Set(savedRecipes.flatMap(recipe => recipe.Ingredients)));
};

// Function to display the menu and handle user choice
const displayMenu = () => {
  console.log("-------------------------------------------------");
  console.log("\nRecipe Management System Menu:\n");
  console.log("1. Show All Authors - Display a list of all recipe authors");
  console.log("2. Show Recipe names by Author - List all recipes from a specific author");
  console.log("3. Show Recipe names by Ingredient - Find recipes that use a certain ingredient");
  console.log("4. Get Recipe by Name - Look up a recipe by its name");
  console.log("5. Get All Ingredients of Saved Recipes - View a compiled list of all ingredients");
  console.log("0. Exit - Exit the recipe management system");
  console.log("\n--------------------------------------------------\n");
  let choice = prompt("Enter a number (1-5) or 0 to exit: ");
  choice = parseInt(choice, 10);

  if (!Number.isInteger(choice) || choice < 0 || choice > 5) {
    console.log("Invalid input. Please enter a number between 0 and 5.");
    setTimeout(displayMenu, 1000); // Re-display menu for valid input
    return;
  }
  
  handleMenuChoice(parseInt(choice));
};

// Handling the user's choice
const handleMenuChoice = (choice) => {
  switch (choice) {
    case 1:
      console.log("--------------------------------");
      console.log("The Authors are:\n");
      console.log(getAllAuthors(cakeRecipes));
      break;
    case 2:
      const author = prompt("Enter Authors name: ");
      console.log("--------------------------------");
      console.log("The recipes based on authors name are:\n");
      logRecipeNames(getRecipesByAuthor(cakeRecipes, author));
      break;
    case 3:
      const ingredient = prompt("Enter an ingredient: ");
      console.log("--------------------------------");
      console.log("The recipes based on this ingredient are:\n");
      logRecipeNames(getRecipesByIngredient(cakeRecipes, ingredient));
      break;
    case 4:
      const recipeName = prompt("Enter a recipe name: ");
      console.log("--------------------------------\n");
      const recipe = getRecipeByNameAndSave(cakeRecipes, recipeName);
      if (recipe) {
        console.log(`Details of recipe "${recipe.Name}":`, recipe);
      } else {
        console.log(`No recipe found with the name "${recipeName}"`);
      }
      break;
    case 5:
      console.log("--------------------------------\n");
      console.log("All ingredients from saved recipes:");
      console.log(getAllSavedIngredients());
      break;
    case 0:
      console.log("Exiting...");
      return;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
  setTimeout(displayMenu, 1000);
};

displayMenu(); // Initial call to display the menu