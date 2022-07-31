import { Product, Brand, Category, ProductPicture, Family, InternalCode, StoreGroup } from '../../config/database'
/**
 * 
 * @returns product list
 */
export const findProducts = async () => {
    return Product.findAll({
        include: [
            {
                model: ProductPicture,
                as: 'productPictures',
            },
            {
                model: InternalCode,
                as: 'internalCodes',
                include: [
                    {
                        model: StoreGroup
                    }
                ]
            },
            {
                model: Brand,
                as: 'brand',
            },
            {
                model: Category,
                as: 'category',
                include: [
                    {
                        model: Family,
                        as: 'family'
                    }
                ]
            }
        ],
        where: {
            enabled: true
        },
    })
}

/**
 * 
 * @param {Product} product 
 * @description update product if the object contain an id otherwise it create a new one
 */
export const createProduct = async (product) => {
    if (product.id) {
        return Product.update(
            product,
            {
                where: {
                    id: product.id
                }
            }
        )
    } else {
        return Product.create(product)
    }
}