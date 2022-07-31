import { StoreGroup, Store } from '../../config/database'

/**
 * 
 * @returns storeGroup list
 */
export const findStoreGroup = async () => {
    return StoreGroup.findAll({
        include: [
            {
                model: Store
            }
        ]
    });
}

/**
 * 
 * @param {StoreGroup} storeGroup 
 * @description update storeGroup if the object contain an id otherwise it create a new one
 */
export const createStoreGroup = async (storeGroup) => {
    if (storeGroup.id) {
        return StoreGroup.update(
            storeGroup,
            {
                where: {
                    id: storeGroup.id
                }
            }
        )
    } else {
        return StoreGroup.create(storeGroup)
    }
}