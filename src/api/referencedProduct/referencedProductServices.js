import { ReferencedProduct, Product, Brand, Category, InternalCode, Store,Visit,Stock } from '../../config/database'

/**
 * 
 * @returns ReferencedProduct list
 */
export const findReferencedProductsByStore = async (storeId) => {
    return ReferencedProduct.findAll({
        where: {
            storeId: storeId
        },
        include: [
            {
                model: Product,
                include: [
                    {
                        model: Brand
                    },
                    {
                        model: Category
                    },
                    {
                        model: InternalCode
                    },{
                        model: Stock
                    }
                ]
            },
            {
                model: Store
            }
        ]
    });
}

/**
 * 
 * @param {ReferencedProduct} referencedProduct 
 * @description update ReferencedProduct if the object contain an id otherwise it create a new one
 */
export const createReferencedProduct = async (referencedProduct) => {
    const result = ReferencedProduct.update(
        referencedProduct,
        {
            where: {
                storeId: referencedProduct.storeId,
                productId: referencedProduct.productId
            }
        }
    )
    result.then((data) => {
        if (data[0] === 0) {
            return ReferencedProduct.create(referencedProduct)
        } else {
            return result
        }
    })
}




