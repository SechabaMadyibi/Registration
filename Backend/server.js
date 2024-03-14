const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Routes/routes.js")

//connect to database
const mongo = "mongodb+srv://sechabamadyibi1:12345@cluster0.eu31p86.mongodb.net/"

mongoose
  .connect(mongo, {
    //Set to true to use the new MongoDB connection string parser.
    useNewUrlParser: true,

  })

  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

  app.use(cors());
// Body parser
app.use(express.json());

//routes
app.use(routes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
