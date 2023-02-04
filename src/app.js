import { connectDB } from '*/config/db.js'
import { User } from "*/model/user"
import { apiV1 } from '*/routes/v1'
const express = require("express");
// const fs = require("fs");
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
var path = require('path');
var cors = require('cors')
const app = express();
const jwt = require("jsonwebtoken")
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
	// app.post('/api/change-password', async (req, res) => {
	// 	const { token, password: plainTextPassword } = req.body
	// 	if (!plainTextPassword || typeof plainTextPassword !== "string") {
	// 		return res.json({ status: "error", error: "Invalid password" })
	// 	}
	// 	console.log(token)
	// 	if (plainTextPassword.length < 5) {
	// 		return res.json({
	// 			status: "error",
	// 			error: " Password too small. Should be at least 6 characters"
	// 		})
	// 	}
	// 	try {
	// 		const user = jwt.verify(token, JWT_SECRET)
	// 		const _id = user.id
	// 		const password = await bcrypt.hash(plainTextPassword, 10)
	// 		await User.updateOne(
	// 			{ _id },
	// 			{
	// 				$set: { password }
	// 			}
	// 		)
	// 		res.json({ status: "ok" })
	// 	} catch (error) {
	// 		console.log(error)
	// 		return res.json({ status: "error", error: ":))" })
	// 	}

	// })

	app.listen((9999), () => {
		console.log("Server is Running ");
	})
}