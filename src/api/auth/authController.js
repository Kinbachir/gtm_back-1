var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { findUser } = require("./authServices");
const { returnStatus } = require('../../utils/ReturnStatus');

/**
 * get user list
 */
export const login = (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    let payload
    findUser(user)
        .then((data) => {
            payload = {
                username: data.dataValues.username,
                role: data.dataValues.role.name,
                permissions: JSON.stringify(data.dataValues.role.permissions)
            }
            if (!data || !data.dataValues.enabled) {
                returnStatus(res, 401, 0, undefined, "Unauthorized!")
            } else {
                bcrypt.compare(user.password, data.password, function (err, result) {
                    if (result) {
                        const token = jwt.sign({ payload }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_VALIDITY })
                        returnStatus(res, 200, 1, token, "success")
                    } else {
                        returnStatus(res, 401, 0, undefined, "Unauthorized!")
                    }
                });
            }
        }).catch(() => {
            returnStatus(res, 401, 0, undefined, "unknown user!")
        })
}