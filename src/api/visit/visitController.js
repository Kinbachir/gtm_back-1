import { createVisit, findVisitsByUser, removeVisit } from "./visitServices"
import { returnStatus } from "../../utils/ReturnStatus"
import { socket } from "../../app"

/**
 * @description get Visits ByUser
 */
export const getVisitsByUser = (req, res) => {
    const userId = req.params.userId
    const from = req.params.from
    const to = req.params.to

    findVisitsByUser(userId, from, to)
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            returnStatus(res, 400, 0, undefined, err)
        })
}
/**
 * @description get Visits ByUsers 
 */
 export const getVisitsByUsers = async (req, res) => {
    const userId = req.params.userId
    console.log("userId111111111111")
    const listUsers=userId.toString().split(',');
    const from = req.params.from
    const to = req.params.to
    let result=[];
    for(var i=0;i<listUsers.length;i++)
    {
        console.log(listUsers[i])
        await findVisitsByUser(listUsers[i], from, to)
        .then((data) => {
            console.log("resultat")
            console.log(data)
            result.push(data)
            
        })
    }
    returnStatus(res, 200, 1, result) 
}

/**
 * @description update visit if the object contain an id otherwise it create a new one
 */
export const upsertVisit = (req, res) => {
    const visits = req.body
    visits.forEach((visit) => {
        if (!visit.day || !visit.storeId || !visit.userId) {
            returnStatus(res, 400, 0, undefined, "missing required fields!")
        } else {
            if (visit.type === "start") {
                visit.start = new Date()
            } else if (visit.type === "end") {
                visit.end = new Date()
            }
            createVisit(visit).then(() => {
                returnStatus(res, 201, 1)
            }).catch((error) => {
                returnStatus(res, 400, 0, undefined, error)
            })
        }
    })
}

/**
 * 
 * @description delete visit by id
 */
export const deleteVisit = (req, res) => {
    if (req.user.payload.role !== "admin") {
        returnStatus(res, 401, 0, undefined, "unauthorized!")
    } else {
        const visitId = req.params.visitId
        if (visitId) {
            removeVisit(visitId).then(() => {
                returnStatus(res, 202, 1, undefined, "visit deleted!")
            }).catch((error) => {
                returnStatus(res, 400, 0, undefined, error)
            })
        } else {
            returnStatus(res, 400, 0, undefined, "visitId required")
        }
    }
}