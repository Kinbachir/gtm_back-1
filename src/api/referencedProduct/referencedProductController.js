import { returnStatus } from "../../utils/ReturnStatus"
import { createReferencedProduct, findReferencedProductsByStore } from "./referencedProductServices"

/**
 * @description get ReferencedProduct list
 */
export const getReferencedProducts = (req, res) => {
    const storeId = req.params.storeId
    findReferencedProductsByStore(storeId).then((data) => {
        returnStatus(res, 200, 1, data)
    }).catch((err) => {
        res.send(err)
    })
}

/**
 * @description update ReferencedProduct if the object contain an id otherwise it create a new one
 */
export const upsertReferencedProduct = (req, res) => {
    const referencedProducts = req.body
    referencedProducts.forEach(referencedProduct => {
        createReferencedProduct(referencedProduct).then(() => {
            returnStatus(res, 201, 1)
        }).catch((error) => {
            res.send(error)
        })
    });
}
