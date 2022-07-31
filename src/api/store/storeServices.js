import { Brand, Category, Display, DisplayCustomField, DisplayCustomFieldValue, DisplayData, DisplaySection, DisplayType, Order, OrderDetail, OrderPicture, Product, Stock, Store, StorePicture, User, Visit } from '../../config/database'


/**
 * 
 * @returns getVisits by store
 */
export const findStoreVisits = async (storeId, limit, offset) => {
    return Visit.findAll({
        include: [
            {
                model: Stock
            },
            {
                model: Store
            },
            {
                model: User
            },
            {
                model: Order,
                include: [
                    {
                        model: OrderDetail,
                        include: [
                            {
                                model: Product
                            }
                        ]
                    },
                    {
                        model: OrderPicture
                    }
                ]
            },
            {
                model: Display,
                include: [
                    {
                        model: DisplayData
                    },
                    {
                        model: Category
                    },
                    {
                        model: Brand
                    },
                    {
                        model: DisplayCustomFieldValue,
                        include: [
                            {
                                model: DisplayCustomField
                            }
                        ]
                    },
                    {
                        model: DisplayType,
                        include: [
                            {
                                model: DisplaySection
                            }
                        ]
                    }
                ]
            }
        ],
        where: {
            storeId: storeId
        },
        order: [
            ['day', 'DESC']
        ],
        limit: limit,
        offset: offset
    });
}

/**
 * 
 * @returns store list
 */
export const findStores = async () => {
    return Store.findAll({
        include: [
            {
                model: StorePicture
            }
        ],
        where: {
            enabled: true
        },
    });
}

/**
 * 
 * @param {Store} store 
 * @description update store if the object contain an id otherwise it create a new one
 */
 export const StoreById = async (id) => {
        return Store.findOne(
            {
                where: {
                    id: id
                }
            }
        )
}
/**
 * 
 * @param {Store} store 
 * @description update store if the object contain an id otherwise it create a new one
 */
export const createStore = async (store) => {
    if (store.id) {
        return Store.update(
            store,
            {
                where: {
                    id: store.id
                }
            }
        )
    } else {
        return Store.create(store)
    }
}