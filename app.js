const express = require('express');
const app = express();

const dotenv = require("dotenv")
dotenv.config()
const mongoose = require('mongoose');


app.use(express.json())

const user = require("./router/user")
const book = require("./router/books")

// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/addbooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})


app.use("/" , user)
app.use("/" , book)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
