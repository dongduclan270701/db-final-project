import { UserModel } from '*/model/user'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newUser = await UserModel.createNew(data)
        return newUser
    } catch (error) {
        throw new Error(error)
    }
}

const findUser = async (data) => {
    try {
        const findUser = await UserModel.findUser(data)
        return findUser
    } catch (error) {
        throw new Error(error)
    }
}

export const userService = { createNew,findUser }