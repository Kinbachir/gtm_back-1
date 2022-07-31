import { StockSetting } from '../../config/database'
/**
 * 
 * @returns Stock list
 */
export const findStockSetting = async () => {
    return StockSetting.findAll();
}

/**
 * 
 * @param {StockSetting} stockSetting 
 * @description update StockSetting if the object contain an id otherwise it create a new one
 */
export const createStockSetting = async (stockSetting) => {
    if (stockSetting.id) {
        return StockSetting.update(
            stockSetting,
            {
                where: {
                    id: stockSetting.id
                }
            }
        )
    } else {
        return StockSetting.create(stockSetting)
    }
}