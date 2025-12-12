import recipes from "../Models/recipesSchema.js";

// Creating a recipe
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new recipes(req.body);
    await newRecipe.save();
    res
      .status(200)
      .json({ message: "Recipe Created Successfully", data: newRecipe });
  } catch (error) {
    res.status(503).json({
      message: "Cannot create the recipe, Error in create recipe",
    });
  }
};

// Reading recipes
export const getAllRecipes = async (req, res) => {
  try {
    const getRecipes = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipes retrieved successfully", data: getRecipes });
  } catch (error) {
    res.status(503).json({
      message: "Cannot retrieve the Recipes, Error in get all Recipes",
    });
  }
};

//get single Recipe using id
export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipeDetail = await recipes.findById(recipeId);
    if (!recipeDetail) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Recipe retrieved successfully", data: recipeDetail });
  } catch (error) {
    res.status(503).json({
      message: "Cannot retrieve the Recipe, Error in get Recipe by id",
    });
  }
};

// Updating Recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { name, procedure, duration } = req.body;
    const result = await recipes.findByIdAndUpdate(
      { _id: recipeId },
      { name, procedure, duration },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res.status(200).json({
      message: "Recipe Updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(503).json({
      message: "Cannot update the Recipe, Error in update Recipe",
    });
  }
};

//Delete Recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const result = await recipes.findByIdAndDelete({ _id: recipeId });
    if (!result) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }

    const recipeAll = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipe Deleted Successfully", data: recipeAll });
  } catch (error) {
    res.status(503).json({
      message: "Cannot delete the Recipe, Error in delete Recipe",
    });
  }
};
