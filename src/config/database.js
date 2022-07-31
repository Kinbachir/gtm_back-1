import Sequelize from 'sequelize'
import UserModel from '../models/User'
import RoleModel from '../models/Role'
import PermissionModel from '../models/Permission'
import BrandModel from '../models/Brand'
import StoreGroupModel from '../models/StoreGroup'
import FamilyModel from '../models/Family'
import CategoryModel from '../models/Category'
import StoreModel from '../models/Store'
import CustomFieldModel from '../models/CustomField'
import CustomFieldValueModel from '../models/CustomFieldValue'
import StorePictureModel from '../models/StorePicture'
import ProductModel from '../models/Product'
import ProductPictureModel from '../models/ProductPicture'
import InternalCodeModel from '../models/InternalCode'
import VisitModel from '../models/Visit'
import DisplayModel from '../models/Display'
import DisplayTypeModel from '../models/DisplayType'
import DisplaySectionModel from '../models/DisplaySection'
import DisplayDataModel from '../models/DisplayData'
import DisplayCustomFieldModel from '../models/DisplayCustomField'
import DisplayCustomFieldValueModel from '../models/DisplayCustomFieldValue'
import ReferencedProductModel from '../models/ReferencedProduct'
import StockModel from "../models/Stock"
import OrderModel from "../models/Order"
import OrderDetailModel from "../models/OrderDetail"
import OrderPictureModel from "../models/OrderPicture"
import StockSettingModel from "../models/StockSetting"
import NotificationModel from "../models/Notification"
import NotificationConfigModel from "../models/NotificationConfig"
import NotificationReferencingModel from "../models/NotificationReferencing"

/**
 * DB config
 */
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.APP_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

/**
 * table list
 */
export const User = UserModel(sequelize, Sequelize)
export const Role = RoleModel(sequelize, Sequelize)
export const Permission = PermissionModel(sequelize, Sequelize)
export const Brand = BrandModel(sequelize, Sequelize)
export const StoreGroup = StoreGroupModel(sequelize, Sequelize)
export const Family = FamilyModel(sequelize, Sequelize)
export const Category = CategoryModel(sequelize, Sequelize)
export const Store = StoreModel(sequelize, Sequelize)
export const CustomField = CustomFieldModel(sequelize, Sequelize)
export const CustomFieldValue = CustomFieldValueModel(sequelize, Sequelize)
export const StorePicture = StorePictureModel(sequelize, Sequelize)
export const Product = ProductModel(sequelize, Sequelize)
export const ProductPicture = ProductPictureModel(sequelize, Sequelize)
export const InternalCode = InternalCodeModel(sequelize, Sequelize)
export const Visit = VisitModel(sequelize, Sequelize)
export const Display = DisplayModel(sequelize, Sequelize)
export const DisplayType = DisplayTypeModel(sequelize, Sequelize)
export const DisplaySection = DisplaySectionModel(sequelize, Sequelize)
export const DisplayData = DisplayDataModel(sequelize, Sequelize)
export const DisplayCustomField = DisplayCustomFieldModel(sequelize, Sequelize)
export const DisplayCustomFieldValue = DisplayCustomFieldValueModel(sequelize, Sequelize)
export const ReferencedProduct = ReferencedProductModel(sequelize, Sequelize)
export const Stock = StockModel(sequelize, Sequelize)
export const Order = OrderModel(sequelize, Sequelize)
export const OrderDetail = OrderDetailModel(sequelize, Sequelize)
export const OrderPicture = OrderPictureModel(sequelize, Sequelize)
export const StockSetting = StockSettingModel(sequelize, Sequelize)
export const NotificationConfig = NotificationConfigModel(sequelize, Sequelize)
export const NotificationReferencing = NotificationReferencingModel(sequelize, Sequelize)
export const Notification = NotificationModel(sequelize, Sequelize)

/********************************************************************* tables associations *********************************************************************/

/**
 * role has many users and user have one role
 */
Role.hasMany(User)
User.belongsTo(Role)

/**
 * role has many permission and permission have one role
 */
Role.hasMany(Permission)
Permission.belongsTo(Role)

/**
 * family has many categories and category have one family
 */
Category.belongsTo(Family)
Family.hasMany(Category)

/**
 * StoreGroup has many Store and Store have one StoreGroup 
 * Store has many StorePictures and StorePicture have one Store
 */
Store.belongsTo(StoreGroup)
StoreGroup.hasMany(Store)
Store.hasMany(StorePicture)
StorePicture.belongsTo(Store)

/**
 * Product have one Category and Category has many Products
 * Product have one Brand and Brand has many Products
 * Product has many ProductPicture and ProductPicture have one Product
 */
Product.belongsTo(Category)
Product.belongsTo(Brand)
ProductPicture.belongsTo(Product)
Product.hasMany(ProductPicture)
Category.hasMany(Product)
Brand.hasMany(Product)

/**
 * InternalCode have one StoreGroup
 * InternalCode have one Product
 */
InternalCode.belongsTo(StoreGroup)
InternalCode.belongsTo(Product)
Product.hasMany(InternalCode)

/**
 * CustomFieldValue have one CustomField and CustomField has many CustomFieldValues
 * CustomFieldValue have one Store and Store has many CustomFieldValues
 */
CustomFieldValue.belongsTo(CustomField)
CustomFieldValue.belongsTo(Store)
CustomField.hasMany(CustomFieldValue)
Store.hasMany(CustomFieldValue)

/**
 * Visit have one Store and Store has many Visits
 * Visit have one User and User has many Visits
 */
Visit.belongsTo(Store)
Visit.belongsTo(User)
Visit.hasMany(Order)
Visit.hasMany(Stock)
Visit.hasMany(Display)
Product.hasMany(Stock)
Store.hasMany(Visit)
User.hasMany(Visit)

/**
 * DisplaySection have one DisplayType and DisplayType has many Display
 */
DisplaySection.belongsTo(DisplayType)
DisplayType.hasMany(DisplaySection)

/**
 * Display have one Category
 * Display have one Brand
 * Display have one User (merchandiser)
 * Display have one Store
 * Display have one DisplayType
 * Display has many DisplayData
 */
Display.belongsTo(Category)
Display.belongsTo(Brand)
Display.belongsTo(DisplayType)
Display.belongsTo(Store)
Display.belongsTo(User)
Display.belongsTo(Visit)
Display.hasMany(DisplayData)

/**
 * DisplayData have one Display
 * DisplayData have one DisplaySection 
 */
DisplayData.belongsTo(Display)
DisplayData.belongsTo(DisplaySection)

/**
 * Display custom fields
 */
DisplayCustomField.belongsTo(DisplaySection)
DisplaySection.hasMany(DisplayCustomField)
DisplayCustomFieldValue.belongsTo(DisplayCustomField)
DisplayCustomFieldValue.belongsTo(Display)
Display.hasMany(DisplayCustomFieldValue)

/**
 * ReferencedProduct have one Store
 * ReferencedProduct have one Product
 */
ReferencedProduct.belongsTo(Store)
ReferencedProduct.belongsTo(Product)

/**
 * Stock have one Store
 * Stock have one Product
 * Stock have one User
 */
Stock.belongsTo(Store)
Stock.belongsTo(Product)
Stock.belongsTo(User)
Stock.belongsTo(Visit)

/**
* Order have one Store
* Order have one User
*/
Order.belongsTo(Store)
Order.belongsTo(User)
Order.belongsTo(Visit)

/**
* Order have one Store
* Order have one User
* Order has many OrderDetail
*/
OrderDetail.belongsTo(Product)
OrderDetail.belongsTo(Order)
Order.hasMany(OrderDetail)

/**
* OrderPicture have one Order
* Order has many OrderPicture
*/
OrderPicture.belongsTo(Order)
Order.hasMany(OrderPicture)

/**
 * NotificationReferencing have one User
 * NotificationReferencing have one Store
 * NotificationReferencing have one NotificationConfig
 * NotificationConfig has many NotificationReferencing
 */
NotificationReferencing.belongsTo(User)
NotificationReferencing.belongsTo(Store)
NotificationReferencing.belongsTo(Product)
NotificationReferencing.belongsTo(NotificationConfig)
NotificationConfig.hasMany(NotificationReferencing)

/**
* Notification have one user 
*/
Notification.belongsTo(User)

/**
 * DB connexion
 */
sequelize.sync({ alter: 'update' })
  .then(() => {
    console.log(`Database & tables updated!`)
  }).catch((err) => {
    console.log(err)
  })