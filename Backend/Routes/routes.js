const router = require("express").Router();
require("dotenv").config();
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const { requireLogin }= require("../Middleware/auth.js");


// Register middleware path 
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {

  //checking for inapropriate words
  const inapproriateWords = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"];
  for(const iw of inapproriateWords) {
    if (username === iw) {
     return res.status(400).json({ error: "Inappropriate word, try another username" });
       }
  };
  
//check if use already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

    

  //instantiate new user and save it to the database
      user = new User({
        username,
        email,
        password
      });
      await user.save();

      return res.status(201).json({ message: "User created successfully" });

    } catch (err) {
    
      return res.status(400).json({ error: err.message });
    }
  });
  
  // Login user
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
       if (password != user.password)
      {
        return res.status(400).json({ error: "Invalid credentials" });
      }

  //create a token that expires after an hour
 
      const token = jwt.sign({ _id: user._id },'Sechaba', {
        expiresIn: "1h",
      });
  
      return res.status(200).json({
        token,
        user: {
          _id: user._id,
          name: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      // console.log(err);
      return res.status(400).json({ error: err.message });
    }
  });
  
  
  //Get logged in user

  router.get("/home",requireLogin, async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
      res.json(user);
      console.log(user)
    } catch (error) {
      return res.status(400).json({ error: err.message });
    }
  });
  
  module.exports = router;
//
//
//comment 1
//comment 2 //
//