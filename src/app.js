require('dotenv').config()
import './config/database'
import express from 'express'
import cors from "cors"
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swaggerConfig'
import http from 'http'
import basicAuth from 'express-basic-auth'
import { getPlannedNotif, getUnrealizedVisits } from './api/notification/notificationController'
const app = express()
const server = http.createServer(app)

/**
 * Swagger documentation path
 */
app.use(
  "/api-doc",
  basicAuth({
    users: { 'admin': process.env.SWAGGER_PASSWORD },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)

/**
* CORS config
*/
app.use(cors())

/**
 * enable json
 */
app.use(express.json())

/**
 * file prefix
 */
app.use('/static', express.static(process.env.NODE_ENV === "development" ? ('src/uploads') : ('../src/uploads')))

/**
  * socket config
  */
export const socket = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
})

socket.sockets.on("connection", (socket) => {
  console.log("socket connected")
})


/********************************************************************* Cron starters *********************************************************************/

/**
 * notifications cron
 */
getPlannedNotif()

/**
 * unrealizedVisits cron
 */
getUnrealizedVisits().start()

/********************************************************************* API's routes *********************************************************************/

/**
 * auth route
 */
const authRoutes = require("./api/auth/authRoutes")
app.use("/auth", authRoutes)

/**
 * user route
 */
const userRoutes = require("./api/users/userRoutes")
app.use("/user", userRoutes)

/**
 * role route
 */
const roleRoutes = require("./api/role/roleRoutes")
app.use("/role", roleRoutes)

/**
 * permission route
 */
const permissionRoutes = require("./api/permissions/permissionRoutes")
app.use("/permission", permissionRoutes)

/**
 * brand route
 */
const brandRoutes = require("./api/brands/brandRoutes")
app.use("/brand", brandRoutes)

/**
 * storeGroup route
 */
const storeGroupRoutes = require("./api/storeGroup/storeGroupRoutes")
app.use("/storeGroup", storeGroupRoutes)

/**
 * family route
 */
const familyRoutes = require("./api/family/familyRoutes")
app.use("/family", familyRoutes)

/**
 * category route
 */
const categoryRoutes = require("./api/category/categoryRoutes")
app.use("/category", categoryRoutes)

/**
 * store route
 */
const storeRoutes = require("./api/store/storeRoutes")
app.use("/store", storeRoutes)

/**
 * customField route
 */
const customFieldRoutes = require("./api/customFields/customFieldRoutes")
app.use("/customField", customFieldRoutes)

/**
 * customFieldValue route
 */
const customFieldValueRoutes = require("./api/customFieldsValues/customFieldValueRoutes")
app.use("/customFieldValue", customFieldValueRoutes)

/**
 * product route
 */
const productRoutes = require("./api/product/productRoutes")
app.use("/product", productRoutes)

/**
 * visit route
 */
const visitRoutes = require("./api/visit/visitRoutes")
app.use("/visit", visitRoutes)

/**
 * displayType route
 */
const displayTypeRoutes = require("./api/displayType/displayTypeRoutes")
app.use("/displayType", displayTypeRoutes)

/**
* displaySection route
*/
const displaySectionRoutes = require("./api/displaySection/displaySectionRoutes")
app.use("/displaySection", displaySectionRoutes)

/**
* display route
*/
const displayRoutes = require("./api/display/displayRoutes")
app.use("/display", displayRoutes)

/**
* referencedProduct route
*/
const referencedProductRoutes = require("./api/referencedProduct/referencedProductRoutes")
app.use("/referencedProduct", referencedProductRoutes)

/**
* stock route
*/
const stockRoutes = require("./api/stock/stockRoutes")
app.use("/stock", stockRoutes)

/**
* stockSetting route
*/
const stockSettingRoutes = require("./api/stockSetting/stockSettingRoutes")
app.use("/stockSetting", stockSettingRoutes)

/**
* order route
*/
const orderRoutes = require("./api/order/orderRoutes")
app.use("/order", orderRoutes)

/**
* notificationConfig route
*/
const notificationConfigtRoutes = require("./api/notificationConfig/notificationConfigRoutes")
app.use("/notificationConfig", notificationConfigtRoutes)

/**
* notification route
*/
const notificationRoutes = require("./api/notification/notificationRoutes")
app.use("/notification", notificationRoutes)

/**
* notification route
*/
const utilsRoutes = require("./api/utils/utilsRoutes")
app.use("/utils", utilsRoutes)

/**
* start server
*/
server.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening at http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
})