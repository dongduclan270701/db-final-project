// const mongoose = require("mongoose")
// const UserSchema = new mongoose.Schema(
//     {
//         username: { type: String, require: true, unique: true },
//         password: { type: String, require: true }
//     },
//     {
//         collection: 'users'
//     }
// )
// export const model = mongoose.model('UserSchema', UserSchema)
import Joi from 'joi'
import { getDB } from '*/config/db.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const userCollectionName = 'users'
const userCollectionSchema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required(),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await userCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const username = data.username
        const findUser = await getDB().collection(userCollectionName).findOne({username})
        if (!findUser) {
            const result = await getDB().collection(userCollectionName).insertOne(value)
            return result
        }
        
        return "already"
    } catch (error) {
        throw new Error(error)
    }
}
const findUser = async (data) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne(data)
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const changePassword = async (id, password) => {
    try {
        const result = await getDB().collection(userCollectionName).updateOne({ _id: ObjectId(id) },password)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const UserModel = { createNew, findUser, changePassword }