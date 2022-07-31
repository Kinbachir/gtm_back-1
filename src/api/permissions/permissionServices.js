import { Permission } from '../../config/database'
import { Role } from '../../config/database'

/**
 * 
 * @returns permission list
 */
export const findPermissions = async (roleId) => {
    return Permission.findAll({
        where: {
            roleId: roleId
        },
        include: [{
            model: Role,
            as: 'role'
        }],
    });
}

/**
 * 
 * @param {Role} role 
 * @description update permission if the object contain an id otherwise it create a new one
 */
export const createPermission = async (permission) => {
    if (permission.id) {
        return Permission.update(
            permission,
            {
                where: {
                    id: permission.id
                }
            }
        )
    } else {
        return Permission.create(permission)
    }
}