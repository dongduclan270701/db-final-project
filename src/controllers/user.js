import { userService } from '*/services/user.service'
import { HttpStatusCode } from '*/utils/constants'
const bcrypt = require("bcryptjs")
const JWT_SECRET = "secretUserAccountRegisterAndLogin"
const jwt = require("jsonwebtoken")
const createNew = async (req, res) => {
	try {
		const { username, password: plainTextPassword } = req.body
		const password = await bcrypt.hash(plainTextPassword, 10)
		if (!username || typeof username !== "string") {
			return res.json({ status: "error", error: "Invalid username" })
		}
		if (!plainTextPassword || typeof plainTextPassword !== "string") {
			return res.json({ status: "error", error: "Invalid password" })
		}
		if (plainTextPassword.length < 5) {
			return res.json({
				status: "error",
				error: " Password too small. Should be at least 6 characters"
			})
		}
		const result = await userService.createNew({ username, password })
		res.status(HttpStatusCode.OK).json(result)
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			error: error.message
		})
	}
}

const LoginUser = async (req, res) => {
	try {
		const { username, password } = req.body
		const result = await userService.findUser({ username })

		if (!result) {
			return res.json({ status: "error", error: "Invalid username/password" })
		}

		if (await bcrypt.compare(password, result.password)) {
			const token = jwt.sign({
				id: result._id,
				username: result.username
			}, JWT_SECRET)
			console.log(token)
			return res.json({ status: "ok", data: token })
		}
		res.status(HttpStatusCode.OK).json(
			{
				status: "error",
				error: "Invalid username/password"
			}
		)
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			error: error.message
		})
	}
}



export const userController = { createNew, LoginUser }