import { emailRegex, phoneRegex } from "../../utils/RegularExpressions"
import { returnStatus } from "../../utils/ReturnStatus"
import { formatImage } from "../../utils/upload"
import { createStorePricture } from "../storePicture/storePictureServices"
import { createStore, findStores, findStoreVisits } from "./storeServices"

/**
 * @description get store visits
 */
export const getStoreVisits = (req, res) => {
    const storeId = req.params.storeId
    const limit = parseInt(req.params.limit)
    const offset = parseInt(req.params.offset)
    findStoreVisits(storeId, limit, offset)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

/**
 * @description get store list
 */
export const getStores = (req, res) => {
    
    const access = JSON.parse(req.user.payload.permissions).find(((el) => el.module === 'stores'))

    if (access && access.can_read) {
        findStores()
            .then((data) => {
                returnStatus(res, 200, 1, data)
            })
            .catch((err) => {
                returnStatus(res, 400, 0, undefined, err)
            })
    } else {
        returnStatus(res, 401, 0, undefined, "Unauthorized!")
    }
}

/**
 * update store if the object contain an id otherwise it create a new one
 */
export const upsertStore = async (req, res) => {

    const store = JSON.parse(req.body.store);
    const customFieldValues = JSON.parse(req.body.customFieldValues)
    const file = req.files.find(obj => obj.fieldname === "file")
    const files = req.files
    if (!store.name || !store.address || !store.governorate || !store.postal_code || !store.email || !store.phone_number) {
        returnStatus(res, 400, 0, undefined, "missing required information!")
    }
    else if (!phoneRegex.test(store.phone_number)) {
        returnStatus(res, 400, 0, undefined, "invalid phone number format!")
    }
    else if (!emailRegex.test(store.email)) {
        returnStatus(res, 400, 0, undefined, "invalid email format!")
    }
    else {
        if (file) {
            store.path = await formatImage(file, req.protocol, "stores/mini", true, true)
        }
        createStore(store)
            .then(async (data) => {
                files?.forEach(async (e) => {
                    createStorePricture({ path: await formatImage(e, req.protocol, "stores", false, true), storeId: (store.id || data.dataValues.id) })
                })
                returnStatus(res, 201, 1, data, "store created!")
            })
            .catch((err) => {
                returnStatus(res, 400, 0, err.parent, err.parent)
            })
    }
}