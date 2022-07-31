import { Stock, Store } from '../../config/database'
import { Op } from 'sequelize'
import { sequelize } from '../../config/database';

/**
 * 
 * @returns Stock days visit
 */
export const findStockDays = async (storeId, days) => {
    return sequelize.query(
        `select distinct Date(createdAt) as date from stocks where storeId=${storeId} limit ${days}`,
        { type: sequelize.QueryTypes.SELECT }
    )
}

/**
 * 
 * @param {Integer} storeId 
 * @param {Date} from 
 * @returns Stock list by store
 */
export const findStockByStore = async (storeId, from) => {
    return Stock.findAll({
        order: [
            ['id', 'DESC']
        ],
        where: {
            storeId: storeId,
            createdAt: {
                [Op.between]: [new Date(from), new Date()]
            }
        },
    });
}

/**
 * 
 * @param {Integer} userId 
 * @param {Date} from 
 * @returns Stock list by user
 */
export const findStockByUser = async (userId, from, to) => {
    return Stock.findAll({
        include: [
            {
                model: Store,
                as: 'store'
            }
        ],
        where: {
            userId: userId,
            createdAt: {
                [Op.between]: [new Date(from).setDate(new Date(from).getDate() - 1), new Date(to).setDate(new Date(to).getDate() + 1)]
            }
        },
        order: [
            ['id', 'DESC']
        ],
    });
}

/**
 * 
 * @param {Stock} stock 
 * @description update Stock if the object contain an id otherwise it create a new one
 */
export const createStock = async (stock) => {
    if (stock.id) {
        return Stock.update(
            stock,
            {
                where: {
                    id: stock.id
                }
            }
        )
    } else {
        return Stock.create(stock)
    }
}