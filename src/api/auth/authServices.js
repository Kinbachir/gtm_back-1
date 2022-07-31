import { Permission, User } from '../../config/database'
import { Role } from '../../config/database'

/**
 * 
 * @returns enabled user list
 */
export const findUser = async (user) => {
    return User.findOne({
        where: {
            username: user.username
        },
        include: [{
            model: Role,
            include: [{
                model: Permission,
            }]
        }],
    });
}