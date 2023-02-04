import express from 'express'
import { userController } from '*/controllers/user'
import { UserValidation } from '*/validations/user.validation'

const router = express.Router()

router.route('/register')
    .post(UserValidation.createNew, userController.createNew)

router.route('/login')
    .post(userController.LoginUser)
export const userRoutes = router