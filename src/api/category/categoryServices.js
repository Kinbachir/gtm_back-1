import { Category, Family } from '../../config/database'

/**
 * 
 * @returns category list
 */
export const findCategories = async () => {
    return Category.findAll();
}

/**
 * 
 * @returns category list by family
 */
export const findCategoriesByFamily = async (familyId) => {
    return Category.findAll({
        include: [
            {
                model: Family,
                as: 'family'
            }
        ],
        where: {
            familyId: familyId
        }
    });
}

/**
 * 
 * @param {Category} category 
 * @description update category if the object contain an id otherwise it create a new one
 */
export const createCategory = async (category) => {
    if (category.id) {
        return Category.update(
            category,
            {
                where: {
                    id: category.id
                }
            }
        )
    } else {
        return Category.create(category)
    }
}