import { createUser, findUsers, findUserByUsername, findUserById, findUserByRole } from "./userServices"
import { emailRegex, phoneRegex } from "../../utils/RegularExpressions"
import { transporter } from "../../utils/Emails"
import generator from "generate-password"
import bcrypt from "bcryptjs"
import { returnStatus } from "../../utils/ReturnStatus"
import { formatImage } from "../../utils/upload"

/**
 * @description get user list
 */
export const getUsers = (req, res) => {
    findUsers()
        .then((data) => {
            returnStatus(res, 200, 1, data)
        })
        .catch((err) => {
            res.send(err)
        })
}

/**
 * @description get user by unsername
 */
export const getUserByUsername = (req, res) => {
    findUserByUsername(req.params.username)
        .then((data) => {
            if (!data) {
                returnStatus(res, 400, 0, null, "unknown user!")
            } else {
                returnStatus(res, 200, 1, data)
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

/**
 * @description get user by role name
 */
export const getUserByRole = (req, res) => {
    findUserByRole(req.params.role)
        .then((data) => {
            if (!data) {
                returnStatus(res, 400, 0, null, "unknown user!")
            } else {
                returnStatus(res, 200, 1, data)
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

/**
 * @description generate and send email with hashed password 
 */
export const resetPassword = (req, res) => {
    const pwd = generator.generate({
        length: 10,
        numbers: true,
        strict: true,
        symbols: true
    })

    const user = {
        id: req.body.id,
        password: bcrypt.hashSync(pwd, 12),
        email: req.body.email
    }
    if (!user.id) {
        returnStatus(res, 400, 0, undefined, "user undefined!")
    } else {
        createUser(user).then((data) => {
            if (data[0] === 1) {
                returnStatus(res, 201, 1, undefined, "password updated succeffully")

            } else {
                returnStatus(res, 400, 0, undefined, "user undefined!")
            }
        }).then(() => {
            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: "New Password",
                text: pwd
            }
            transporter.sendMail(mailOptions)
        }).catch((err) => {
            res.send(err)
        })
    }
}

/**
 * @description enable / disable user account 
 */
export const switchStateUser = (req, res) => {
    const user = {
        id: req.body.id,
        enabled: req.body.enabled
    }
    if (!user.id || user.enabled === null || user.enabled === undefined) {
        returnStatus(res, 400, 0, undefined, "all attributes are required!")
    } else {
        createUser(user).then((data) => {
            returnStatus(res, 201, 1, data, "account status updated")
        }).catch((err) => {
            res.send(err)
        })
    }
}

/**
 * @description update user password
 */
export const updatePassword = (req, res) => {

    let user = {
        id: req.body.id,
        password: req.body.password
    }
    const newPassword = req.body.newPassword
    if (!user.id || !user.password || !newPassword) {
        returnStatus(res, 400, 0, undefined, "bad inforations!")
    } else {
        findUserById(user.id).then((data) => {
            if (!data) {
                returnStatus(res, 400, 0, undefined, "bad inforations!")
            } else {
                bcrypt.compare(user.password, data.dataValues.password, (err, result) => {
                    if (result) {
                        user.password = newPassword
                        createUser(user).then(() => {
                            returnStatus(res, 201, 1, undefined, "password updated successfully")
                        }).catch((err) => {
                            res.send(err)
                        })
                    } else {
                        returnStatus(res, 400, 0, undefined, "bad inforations!")
                    }
                });
            }
        }).catch((err) => {
            res.send(err)
        })
    }
}

/**
 * update user if the object contain an id otherwise it create a new one
 */
export const upsertUser = async (req, res) => {

    const user = JSON.parse(req.body.user);

    if (!user.first_name || !user.last_name || !user.password || !user.phone_number || !user.enabled || !user.gender) {
        returnStatus(res, 400, 0, undefined, "missing required information!")
    }
    else if (!phoneRegex.test(user.phone_number)) {
        returnStatus(res, 400, 0, undefined, "invalid phone number format!")
    }
    else if (user.email && !emailRegex.test(user.email)) {
        returnStatus(res, 400, 0, undefined, "invalid email format!")
    }
    else if (!user.roleId) {
        returnStatus(res, 400, 0, undefined, "Role is required!")
    }
    else {
        if (!user.id) {
            user.username = user.first_name.split(' ').join('.') + "." + user.last_name[0]
        }
        if (req.file) {
            user.profile_picture = await formatImage(req.file, req.protocol, "users")
        }
        createUser(user)
            .then((data) => {
                returnStatus(res, 201, 1, data, "user created!")
            })
            .catch((err) => {
                if (err.name = "SequelizeUniqueConstraintError") {
                    returnStatus(res, 400, 0, undefined, "Email or phone number are already in use!")
                }
                else {
                    res.send(err)
                }
            })
    }
}
