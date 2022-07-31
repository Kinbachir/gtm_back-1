import { Permission, User } from '../../config/database'
import { Role } from '../../config/database'

/**
 * @returns enabled user list
 */
export const findUsers = async () => {
    return User.findAll({
        include: [{
            model: Role,
            as: 'role',
        }],
    });
}

/**
 * 
 * @param {String} username 
 */
export const findUserByUsername = async (username) => {
    return User.findOne({
        where: {
            username: username
        },
        include: [{
            model: Role,
            as: 'role'
        }],
    })
}

/**
 * 
 * @param {String} role role name 
 */
export const findUserByRole = async (role) => {
    return User.findAll({
        include: [{
            model: Role,
            as: 'role',
            where: {
                name: role
            }
        }],
    })
}

/**
 * 
 * @param {int} id 
 */
export const findUserById = async (id) => {
    return User.findOne({
        where: {
            id: id
        }
    })
}



/**
 * @param {User} user
 * @description update user if the object contain an id otherwise it create a new one
 */
export const createUser = async (user) => {
    if (user.id) {
        return User.update(
            user,
            {
                where: {
                    id: user.id
                }
            }
        )
    } else {
        return User.create(user)
    }
}
