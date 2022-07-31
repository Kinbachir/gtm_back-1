import { Family } from '../../config/database'

/**
 * 
 * @returns family list
 */
export const findFamilies = async () => {
    return Family.findAll();
}

/**
 * 
 * @param {Brand} brand 
 * @description update family if the object contain an id otherwise it create a new one
 */
export const createFamily = async (family) => {
    if (family.id) {
        return Family.update(
            family,
            {
                where: {
                    id: family.id
                }
            }
        )
    } else {
        return Family.create(family)
    }
}