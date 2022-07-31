import { StorePicture } from '../../config/database'

/**
 * 
 * @param {StorePicture} storePicture 
 * @description update storePicture if the object contain an id otherwise it create a new one
 */
export const createStorePricture = async (storePicture) => {
    if (storePicture.id) {
        return StorePicture.update(
            storePicture,
            {
                where: {
                    id: storePicture.id
                }
            }
        )
    } else {
        return StorePicture.create(storePicture)
    }
}