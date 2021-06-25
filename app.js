const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.set("view engine", "ejs")

// lets me use files in the public directory
// ex: http://localhost:3000/js/app.js
app.use(express.static("public"))

app.get("/", (req, res) => {
	res.render("home")
})

let port = process.env.PORT
if (port == null || port == "") port = 3000

app.listen(port, function () {
	console.log("Server has started successfully.")
})
