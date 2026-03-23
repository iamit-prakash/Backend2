const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initializeDatabase = async () => {
  await mongoose.connect(mongoUri).then(()=> {
    console.log("connected to database")
}).catch((error)=> {
    throw error
})
}

module.exports = {initializeDatabase}

