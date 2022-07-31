import cron from 'node-cron'
import { returnStatus } from "../../utils/ReturnStatus"
import { pointageAlert, findNotifications, findConsultedNotifications, upsertNotification, findUnrealizedVisits } from './notificationServices'
import { findNotificationConfigsByType } from '../../api/notificationConfig/notificationConfigServices'
import { checkInStarter, checkOutStarter, unrealizedVisitsStarter } from '../../utils/cronStarters'
import { findUserByRole } from '../users/userServices'
import { socket } from '../../app'
import { transporter } from '../../utils/Emails'
import {StoreById} from '../store/storeServices'
/**
 * 
 * @param {Array} [Notification] Notification list
 * @description update status of not consulted notifications 
 */
export const updateNotification = (req, res) => {
    const notifications = req.body
    return new Promise((resolve, reject) => {
        resolve(
            notifications.forEach(element => {
                upsertNotification({ ...element, consulted: true })
            })
        )
    }).then(() => {
        setTimeout(() => {
            returnStatus(res, 201, 1, undefined, "Notification modifié")
        }, 100)
    })
}

/**
 * @description get Notification list
 */
export const getNotification = (req, res) => {
    const limit = parseInt(req.params.limit)
    const offset = parseInt(req.params.offset)
    const userId = parseInt(req.params.userId)
    let notConsulted = 0

    findConsultedNotifications(userId)
        .then((res) => {
            notConsulted = res
        })
    findNotifications(userId, limit, offset)
        .then((data) => {
            returnStatus(res, 200, 1, { notifications: data, notConsulted: notConsulted })
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}

function groupBySupervisor(items) {
    return items.reduce((acc, curr) => {
        if (curr) {
            const { id } = curr.user;
            const currentItems = acc[id];
            return {
                ...acc,
                [id]: currentItems ? [...currentItems, curr] : [curr]
            };
        }
        return acc;
    }, {});
}

/**
 * find Adminsitrators
 */
let admins = []
findUserByRole('admin')
    .then((data) => {
        data.forEach(element => {
            admins.push(element.dataValues);   
              
        });
    })

export const stockNotification = (stock) => {
    findNotificationConfigsByType('StockOut').then((data) => {
        data.forEach(async element => {
       
            const t=await StoreById(stock[0].storeId)
            const notificationReferencings = element.dataValues.notificationReferencings
            let stores = []
            let products = []
            
            // get referenced product & store  : pour le stockout ou repture de stock 
            notificationReferencings.forEach( element => {
                
                if (stores.findIndex((storeId) => storeId === element.dataValues.storeId) === -1) {
                    stores.push(element.dataValues.store.dataValues)

                }
                if (products.findIndex((productId) => productId === element.dataValues.productId) === -1) {
                    products.push(element.dataValues.productId)
                }
            })
            
            if (element.dataValues.enabled) {
                console.log(stores,'mimiiiiiiiiiiiiiiiiiiiiii')
           
                stores.forEach(ele=>{
                    if(ele.id==stock[0].storeId && stock.findIndex((el) => (/*el.stockOut === null &&*/ el.quantity === 0)) !== -1)
                  
                    {
                      
                    
                    admins.forEach(async admin => {
                        
                        upsertNotification({
                            title: `StockOut`,
                            text: `StockOut mentionned at ${ele.name} .`, 
                       
                            
                            userId: admin.id
                        })
                            .then(() => {
                                if (element.dataValues.email) {
                                    transporter.sendMail({
                                        from: process.env.EMAIL_ADDRESS,
                                        to: admin.email,
                                        subject: `StockOut`,
                                        text: `StockOut mentionned at ${ele.name}.`
                                    })
                                }
                            })
                    })
                    setTimeout(() => {
                        socket.emit("notificationsCron", "notificationsCron");
                    }, 500);
                    }

                    
                })



                
                /*if (
                    (stores.findIndex((storeId) => storeId === stock[0].storeId) !== -1) &&
                    (
                        //stock.findIndex((el) => (el.stockOut === true && el.quantity === null)) !== -1 ||
                        stock.findIndex((el) => (/*el.stockOut === null && el.quantity === 0)) !== -1
                    )

                ) {
                    console.log( "4545454")
                    console.log(t)
                    admins.forEach(async admin => {
                        
                        upsertNotification({
                            title: `StockOut`,
                            text: `StockOut mentionned at ${stock[0].storeId} .`, 
                            
                            userId: admin.id
                        })
                            .then(() => {
                                if (element.dataValues.email) {
                                    transporter.sendMail({
                                        from: process.env.EMAIL_ADDRESS,
                                        to: admin.email,
                                        subject: `StockOut`,
                                        text: `StockOut mentionned at ${stock[0].storeId}.`
                                    })
                                }
                            })
                    })
                    setTimeout(() => {
                        socket.emit("notificationsCron", "notificationsCron");
                    }, 500);
                }*/
            }


        



        })
    })
}

const cronFunction = (element, from, to, notificationReferencings) => {
    let users = []
    let stores = []
    let visits = []

    
    // get referenced users & store  : pour checkin & checkout   
    notificationReferencings.forEach(element => {

      
        if (stores.findIndex((storeId) => storeId === element.dataValues.storeId) === -1) {
            stores.push(element.dataValues.store.dataValues)

           
        }
        if (users.findIndex((userId) => userId === element.dataValues.userId) === -1) {
            users.push(element.dataValues.userId)

          
        }
    })



    // get usersVisits
    pointageAlert(from, to, stores, users) 
        .then((res) => {
            res.forEach(element => {
                visits.push(element.dataValues)
            });
        })
    if (element.dataValues.pointage_type === "Check-In") {

   
        
        return cron.schedule(checkInStarter, () => {
            
            Object.values(groupBySupervisor(visits)).forEach(supervisorVisits => {
                
                let startPointage = new Date(supervisorVisits.sort((a, b) => { return a.start - b.start })[0].start)

                if (supervisorVisits.filter((visit) => visit.start === null).length === supervisorVisits.length) {

                   
                    admins.forEach( async admin => {
                        upsertNotification({
                            title: `Check-In unrealized`,
                            text: `${supervisorVisits[0].user.dataValues.first_name} ${supervisorVisits[0].user.dataValues.last_name} has not yet started his day.`,
                            userId: admin.id
                        })
                            .then(() => {
                                if (element.dataValues.email) {
                                    transporter.sendMail({
                                        from: process.env.EMAIL_ADDRESS,
                                        to: admin.email,
                                        subject: `Check-In unrealized`,
                                        text: `${supervisorVisits[0].user.dataValues.first_name} ${supervisorVisits[0].user.dataValues.last_name} has not yet started his day.`
                                    })
                                }
                            })
                    });
                } else if (
                    ((startPointage.getHours()) > parseInt(element.dataValues.pointage_time[0] + element.dataValues.pointage_time[1])) ||
                    ((startPointage.getHours()) === parseInt(element.dataValues.pointage_time[0] + element.dataValues.pointage_time[1]) && startPointage.getMinutes() > parseInt(element.dataValues.pointage_time[3] + element.dataValues.pointage_time[4]))
                ) {
                    admins.forEach(admin => {
                        upsertNotification({
                            title: `Late Check-In before ${element.dataValues.pointage_time.slice(0, 5)}`,
                            text: `${supervisorVisits[0].user.dataValues.first_name} ${supervisorVisits[0].user.dataValues.last_name} made his first Check-In at ${element.dataValues.pointage_time.slice(0, 5)}`,
                            userId: admin.id
                        })
                            .then(() => {
                                if (element.dataValues.email) {
                                    transporter.sendMail({
                                        from: process.env.EMAIL_ADDRESS,
                                        to: admin.email,
                                        subject: `Late Check-In before ${element.dataValues.pointage_time.slice(0, 5)}`,
                                        text: `${supervisorVisits[0].user.dataValues.first_name} ${supervisorVisits[0].user.dataValues.last_name} made his first Check-In at ${element.dataValues.pointage_time.slice(0, 5)}`
                                    })
                                }
                            })
                    });
                }
            })
            setTimeout(() => {
                socket.emit("notificationsCron", "notificationsCron");
            }, 500);
        }).start()
    }
    if (element.dataValues.pointage_type === "Check-Out") {
        return cron.schedule(checkOutStarter, () => {
            Object.values(groupBySupervisor(visits)).forEach((supervisorVisits) => {
                const timeOffset = new Date(supervisorVisits.sort((a, b) => { return a.end - b.end })[supervisorVisits.length - 1].end).getTimezoneOffset() / 60
                let endPointage = new Date(new Date(supervisorVisits.sort((a, b) => { return a.end - b.end })[supervisorVisits.length - 1].end)
                    .setHours(
                        new Date(supervisorVisits.sort((a, b) => { return a.end - b.end })[supervisorVisits.length - 1].end).getHours() + timeOffset
                    ))
                if (
                    ((endPointage.getHours()) < new Date(element.dataValues.pointage_time).getHours()) ||
                    ((endPointage.getHours()) === new Date(element.dataValues.pointage_time).getHours() && endPointage.getMinutes() < new Date(element.dataValues.pointage_time).getMinutes())
                ) {
                    admins.forEach(admin => {
                        upsertNotification({
                            title: `Check-Out before ${element.dataValues.pointage_time.slice(0, 5)}`,
                            text: `${supervisorVisits[0].user.dataValues.first_name} ${supervisorVisits[0].user.dataValues.last_name} made his last Check-Out at ${endPointage.getHours()}:${endPointage.getMinutes()}`,
                            userId: admin.id
                        })
                            .then(() => {
                                if (element.dataValues.email) {
                                    transporter.sendMail({
                                        from: process.env.EMAIL_ADDRESS,
                                        to: admin.email,
                                        subject: `Check-Out before ${element.dataValues.pointage_time.slice(0, 5)}`,
                                        text: `${supervisorVisits[0].user.dataValues.first_name} ${supervisorVisits[0].user.dataValues.last_name} made his last Check-Out at ${endPointage.getHours()}:${endPointage.getMinutes()}`
                                    })
                                }
                            })
                    });
                }
            })
            setTimeout(() => {
                socket.emit("notificationsCron", "notificationsCron");
            }, 500);
        }).start()
    }
}

/**
 * planned notification starter
 */
export const getPlannedNotif = async () => {
    findNotificationConfigsByType('Pointage').then((data) => {
        data.forEach(element => {
            const notificationReferencings = element.dataValues.notificationReferencings
            if (element.dataValues.enabled) {
                cronFunction(
                    element,
                    new Date().setHours(0),
                    new Date(),
                    notificationReferencings
                )
            }
        })
    })
}

/**
 * unrealized visits starter
 */
export const getUnrealizedVisits = () => {
    return cron.schedule(unrealizedVisitsStarter, () => {
        findUnrealizedVisits()
            .then((visits) => {
                Object.values(groupBySupervisor(visits))
                    .forEach(supervisorVisits => {
                        const unrealized = supervisorVisits.filter((visit) => visit.surveyResponses.length === 0).length
                        admins.forEach(admin => {
                            upsertNotification({
                                title: `Visite(s) non réalisée(s)`,
                                text: `${supervisorVisits[0].user.dataValues.first_name} ${supervisorVisits[0].user.dataValues.last_name} a ${unrealized} visite(s) non realisée(s)`,
                                userId: admin.id
                            })
                        });
                    })
            })
        setTimeout(() => {
            socket.emit("notificationsCron", "notificationsCron");
        }, 500);
    })
}

