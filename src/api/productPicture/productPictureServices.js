import { ProductPicture } from '../../config/database'

/**
 * 
 * @param {ProductPicture} productPicture 
 * @description update productPicture if the object contain an id otherwise it create a new one
 */
export const createProductPricture = async (productPicture) => {
    if (productPicture.id) {
        return ProductPicture.update(
            productPicture,
            {
                where: {
                    id: productPicture.id
                }
            }
        )
    } else {
        return ProductPicture.create(productPicture)
    }
}