import { createWriteStream } from 'fs'
import { sendToS3 } from './avatar.S3'

export default async function saveAvatar (upload) {
    let { createReadStream, filename } = upload
    filename = Math.random() * 1 + filename
    const dir = __dirname + `\\${filename}`
    async function saveLocally () {
        const save = new Promise((resolve, reject) => {
            createReadStream()
                .pipe(createWriteStream(dir))
                .on('finish', () => resolve(true))
                .on('error', (error) => reject(console.log(error)))
        }).catch((err) => console.log(err))
    }
    await (saveLocally())
    await sendToS3(dir, filename, { encoding: upload.encoding })
    return 'teste'
}
