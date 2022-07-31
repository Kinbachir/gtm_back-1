import { DisplayData } from '../../config/database'
/**
 * 
 * @param {DisplayData} displayData 
 * @description update DisplayData if the object contain an id otherwise it create a new one
 */
export const createDisplayData = async (displayData) => {
    if (displayData.id) {
        return DisplayData.update(
            displayData,
            {
                where: {
                    id: displayData.id
                }
            }
        )
    } else {
        return DisplayData.create(displayData)
    }
}

/**
 * 
 * @param {Integer} displayId
 * @description delete DisplayData where displayId = displayId
 */
export const removeDisplayData = async (displayId) => {
    DisplayData.destroy({
        where: { displayId: displayId }
    })
}