import { extname } from 'path'
import { S3Config } from './S3.config'

require('dotenv').config()
const AWS = require('aws-sdk')
const { v4: uuid } = require('uuid')

export default async function uploadS3 (upload, path) {
    const S3 = new AWS.S3(S3Config(path))

    const { createReadStream, filename, mimetype } = upload

    const file = await S3.upload({
        Body: createReadStream(),
        Key: `${uuid()}${extname(filename)}`,
        ContentType: mimetype
    }).promise()

    return file.Location
}
