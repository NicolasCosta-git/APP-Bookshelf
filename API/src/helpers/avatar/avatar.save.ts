import { extname } from 'path'
import { S3 } from './avatar.S3'
const { v4: uuid } = require('uuid')
export default async function saveAvatar (upload) {
    const { createReadStream, filename, mimetype } = upload
    const Location = await S3.upload({
        Body: createReadStream(),
        Key: `${uuid()}${extname(filename)}`,
        ContentType: mimetype
    }).promise()
    return { uri: Location }
}
