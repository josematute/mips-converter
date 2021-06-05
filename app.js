const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.get("/", (req, res) => {
	res.send("GET is working")
})

app.listen(3000, () => {
	console.log("Server has started successfully.")
})
