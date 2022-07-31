import { Brand } from '../../config/database'

/**
 * 
 * @returns brand list
 */
export const findBrands = async () => {
    return Brand.findAll();
}

/**
 * 
 * @param {Brand} brand 
 * @description update brand if the object contain an id otherwise it create a new one
 */
export const createBrand = async (brand) => {
    if (brand.id) {
        return Brand.update(
            brand,
            {
                where: {
                    id: brand.id
                }
            }
        )
    } else {
        return Brand.create(brand)
    }
}