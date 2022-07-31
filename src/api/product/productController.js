import { returnStatus } from "../../utils/ReturnStatus"
import { formatImage } from "../../utils/upload"
import { createInternalCode, updateInternalCode } from "../internalCodes/internalCodesServices"
import { createProductPricture } from "../productPicture/productPictureServices"
import { createProduct, findProducts } from "./productServices"

/**
 * @description get product list
 */
export const getProducts = (req, res) => {
    findProducts()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * update product if the object contain an id otherwise it create a new one
 */
export const upsertProduct = async (req, res) => {

    const product = JSON.parse(req.body.product);
    const internalCodes = JSON.parse(req.body.internalCodes);
    const file = req.files.find(obj => obj.fieldname === "file")
    const files = req.files
    if (!product.label || !product.barcode || !product.typology) {
        returnStatus(res, 400, 0, undefined, "missing required information!")
    }
    else {
        if (file) {
            product.path = await formatImage(file, req.protocol, "products/mini", true, true)
        }
        createProduct(product).then((data) => {
            files?.forEach(async (e) => {
                createProductPricture({ path: await formatImage(e, req.protocol, "products"), productId: (product.id || data.dataValues.id) })
            })
            internalCodes?.forEach((code) => {
                if (product.id) {
                    updateInternalCode(code)
                } else {
                    createInternalCode({ ...code, productId: data.dataValues.id })
                }
            })
            returnStatus(res, 201, 1, data)
        }).catch((err) => {
            returnStatus(res, 400, 0, undefined, err.parent.code)
        })
    }
}