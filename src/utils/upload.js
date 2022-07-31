import multer from 'multer'
import path from 'path'
import sharp from "sharp"
import fs from "fs"

/**
 * @param {String} prefix image prefix
 */
export const upload = (prefix) => {
    return multer(
        {
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, process.env.NODE_ENV === "development" ? ('./src/uploads') : ('../src/uploads'))
                },
                filename: function (req, file, cb) {
                    cb(null, prefix + '-' + Date.now() + path.extname(file.originalname))
                }
            })
        }
    )
}

/**
 * 
 *to do
 save metadata
 */

/**
 * 
 * @param {File} file file to format
 * @param {String} protocol request protocol
 * @param {String} dest destination 
 * @description rotate, resize and save new image
 * @returns image path  
 */
export const formatImage = async (file, protocol, dest, mini, multiple) => {
    let newWidth, newHeight, dirPath, port;
    if (process.env.NODE_ENV === "development") {
        dirPath = './src/uploads/'
        port = ':' + process.env.APP_PORT
    } else {
        dirPath = '../src/uploads/'
        port = ""
    }

    sharp(dirPath + file.filename).metadata().then(async (data) => {
        if (data.width > data.height) {
            newWidth = 720
            newHeight = 520
        } else {
            newWidth = 520
            newHeight = 720
        }
        if (mini) {
            await sharp(dirPath + file.filename)
                .rotate()
                .resize(newWidth * 0.3, newHeight * 0.3)
                .jpeg({ quality: 75, force: false })
                .toFile(dirPath + dest + '/' + file.filename)
            if (!multiple) {
                fs.unlinkSync(dirPath + file.filename)
            }
        } else {
            await sharp(dirPath + file.filename)
                .rotate()
                .resize(newWidth, newHeight)
                .jpeg({ quality: 75, force: false })
                .toFile(dirPath + dest + '/' + file.filename)
            fs.unlinkSync(dirPath + file.filename)
        }
    })
    return (
        process.env.NODE_ENV === "development" ?
            ('http://' + process.env.APP_HOST + port + '/static/' + dest + '/' + file.filename) :
            ('https://' + process.env.APP_HOST + port + '/static/' + dest + '/' + file.filename)
    )
}