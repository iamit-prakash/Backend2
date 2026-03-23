const express = require("express")

const app = express()

const Recipe = require("./models/recipe.models")
const {initializeDatabase} = require("./db/db.connect")

 app.use(express.json())

 initializeDatabase()

 async function createRecipe(newRecipe){
    const recipe =  new Recipe(newRecipe)
    const savedRecipe = await recipe.save()
    return savedRecipe
 }

 app.post("/recipes", async (req, res)=> {
     try {
    const recipe = await createRecipe(req.body)
    if(recipe){
        res.json(recipe)
    } else {
        res.status(404).json({error: "recipe not found."})
    }
     } catch (error){
        res.status(500).json({error: "Failed to fetch recipe."})
     }
 })

 // Ques 6:
 async function readAllRecipe(){
    try {
   const allRecipe = await Recipe.find()
   return allRecipe
    } catch (error){
        throw error
    }
 }

 app.get("/recipes", async (req, res)=> {
     try {
    const recipes = await readAllRecipe()
    if(recipes.length > 0){
        res.json(recipes)
    } else {
        res.status(404).json({error: "recipe not found"})
    }
     } catch (error){
        res.status(500).json({error: "Failed to get all recipe"})
     }
 })

 // Ques 7:
 async function readRecipeByTitle(recipeTitle){
     try {
    const recipeByTitle = await Recipe.findOne({title: recipeTitle})
    return recipeByTitle;
     } catch (error){
        throw error
     }
 }

 app.get("/recipes/title/:titleName", async (req, res)=> {
    try {
    const recipeByTitle = await readRecipeByTitle(req.params.titleName)
    if(recipeByTitle){
        res.json(recipeByTitle)
    } else {
        res.status(404).json({error: "recipe not found."})
    }
    } catch (error){
        res.status(500).json({error: "Failed to get recipe by it's title."})
    }
 })

 // Ques 8:
 async function getRecipeByAuthor(authorName){
     try {
    const recipeByAuthor = await Recipe.find({author: authorName})
    return recipeByAuthor;
     } catch (error){
        throw error
     }
 }

 app.get("/recipes/author/:authorName", async (req, res)=> {
    try {
  const recipeByAuthor = await getRecipeByAuthor(req.params.authorName)
  if(recipeByAuthor.length > 0) {
    res.json(recipeByAuthor)
  } else {
    res.status(404).json({error: "Recipe not found."})
  }
    } catch (error){
        res.status(500).json({error: "Failed to get author."})
    }
 })

 // Ques 9:
 async function readRecipeEasyLevel(recipeLevel){
    try {
   const recipeByLevel = await Recipe.find({difficulty: recipeLevel})
    return recipeByLevel;
    } catch (error){
        throw error
    }
 }

 app.get("/recipes/level/:difficultyLevel", async (req, res)=> {
       try {
    const recipeByDifficulty = await readRecipeEasyLevel(req.params.difficultyLevel)
    if(recipeByDifficulty.length != 0){
       res.json(recipeByDifficulty)
    } else {
        res.status(404).json({error: "Recipe not found."})
    }
       } catch (error){
        res.status(500).json({error: "Failed to get recipe by difficultyLevel."})
       }
 })

 // Ques 11:
 async function updateRecipe(recipeId, dataToUpdate){
    try {
   const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
   return updateRecipe;
    } catch (error){
        throw error
    }
 }

 app.post("/recipes/:recipeId", async (req, res)=> {
    try {
   const updatedRecipe = await updateRecipe(req.params.recipeId, req.body)
   if(updatedRecipe){
    res.status(201).json({message: "Recipe updated successfully.", updatedRecipe: updatedRecipe })
   } else {
    res.status(404).json({error: "recipe not found."})
   }
    } catch (error){
        res.status(500).json({error: "Failed to update recipe."})
    }
 })

 // Ques 12:
 async function deleteRecipe(recipeId){
    try {
    const deleteRecipe = await Recipe.findByIdAndDelete(recipeId)
    return deleteRecipe;
    } catch (error){
        throw error
    }
 }

 app.delete("/recipes/:recipeId", async (req, res)=> {
    try {
   const deletedRecipe = await deleteRecipe(req.params.recipeId)
   if(deletedRecipe){
    res.status(200).json({message: "Recipe deleted Successfully", deletedRecipe: deletedRecipe})
   } else {
    res.status(404).json({error: "Recipe not found"})
   }
    } catch (error){
        res.status(500).json({error: "Failed to delete Recipe."})
    }
 })
 
 const PORT = process.env.PORT || 3000

 app.listen(PORT , ()=> {
    console.log(`Server is runing on ${PORT}`)
 })

 