require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')

const AWS_CONFIG = {
    accessKeyId: process.env.ACESSKEY,
    secretAccessKey: process.env.SECRETKEY,
    region: process.env.REGION
}

AWS.config.update({ ...AWS_CONFIG, apiVersion: '2006-03-01' })

export async function sendToS3 (path, filename, encoding) {
    const S3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.REGION })

    const fileContent = fs.readFile(path, { ...encoding })
    console.log(fileContent)
    const params = {
        Bucket: process.env.AWS_S3_AVATAR_BUCKET,
        key: filename,
        body: fileContent
    }
    const data = await S3.upload(params).promise()
    console.log(data)
    return data.Location
}
