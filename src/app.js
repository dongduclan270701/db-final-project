import { connectDB } from '*/config/db.js'
// import { User } from "*/model/user"
import { apiV1 } from '*/routes/v1'
const express = require("express");
// const fs = require("fs");
const bodyParser = require("body-parser")
// const bcrypt = require("bcryptjs")
var path = require('path');
var cors = require('cors')
const app = express();
// const jwt = require("jsonwebtoken")
// Server setup

connectDB()
	.then(() => console.log('Connected MongoDB successfully to server'))
	.then(() => bootServer())
	.catch(error => {
		console.error(error)
		process.exit(1)
	})
const bootServer = () => {
	app.use(cors());
	app.use('/', express.static(path.join(__dirname, 'static')))
	app.use(bodyParser.json())
	app.use('/v1', apiV1)

	app.listen((9999), () => {
		console.log("Server is Running ");
	})
}