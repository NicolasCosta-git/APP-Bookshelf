import { createWriteStream } from 'fs'
export default async function saveAvatar (upload) {
    const { createReadStream, filename } = upload
    const dir = __dirname + `../../../uploads/${filename}`
    const save = new Promise((resolve, reject) => {
        createReadStream()
            .pipe(createWriteStream(dir))
            .on('finish', () => resolve(true))
            .on('error', (error) => reject(console.log(error)))
    }).catch((err) => console.log(err))
    return dir
}
