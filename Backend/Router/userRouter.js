const express = require("express")
const router = express.Router()
const db = require("../database_config/config")
const bcrypt = require("bcrypt")
const e = require("express")

router.post('/login', async (req, res) => {
  console.log(req.body)

  try {

    const userExists = await db('users')
      .select().from('users').where("username", req.body.username)
    console.log(userExists)
    // if userExists decode password
    if (!userExists.length == 0) {
      console.log('iam working', userExists[0].password)
      const matchPassword = await bcrypt.compare(req.body.password, userExists[0].password)
      console.log(matchPassword)
      if (matchPassword === true) {
        res.json({
          id: userExists[0].id,
          name: userExists[0].name
        })
      } else {
        throw new Error("Incorrect password or Username")
      }
    } else {
    
      throw new Error("User Doesnt Exists")
    }
  } catch (error) {
    res.status(409).json({error:error.message})
    console.log(error.message)
  }

})

router.post('/register', async (req, res) => {
  console.log(req.body, 'this is a body form register')
  // checking user already exists or not
  try {
    const userExists = await db('users')
      .select().from('users').where("username", req.body.username)
    // hash password with bcrypt
    let password = await bcrypt.hash(req.body.password, 10)
    console.log(userExists, "array")
    // checking has array user??
    if (userExists.length == 0) {
      db("users")
        .returning('*')
        .insert({
          username: req.body.username,
          password: password
        }).then((data) => {
          console.log(data[0])
          res.json(data[0])
        })
    } else {
      throw new Error("User already exist")
    }
  } catch (error) {
   res.status(409).json({error:error.message})
    console.log(error,"where from you")
  }



})

module.exports = router