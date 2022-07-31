import { InternalCode } from '../../config/database'

/**
 * 
 * @param {InternalCode} internalCode 
 * @description update internalCode if the object contain an id otherwise it create a new one
 */
export const createInternalCode = async (internalCode) => {
    return InternalCode.create(internalCode)
}

/**
 * 
 * @param {InternalCode} internalCode 
 * @description update internalCode if the object contain an id otherwise it create a new one
 */
export const updateInternalCode = async (internalCode) => {
    return InternalCode.update(
        internalCode,
        {
            where: {
                productId: internalCode.productId,
                storeGroupId: internalCode.storeGroupId
            }
        }
    )
}
