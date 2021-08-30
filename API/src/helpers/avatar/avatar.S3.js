require('dotenv').config()
const AWS = require('aws-sdk')

const AWS_CONFIG = {
    accessKeyId: process.env.ACESSKEY,
    secretAccessKey: process.env.SECRETKEY,
    region: process.env.REGION
}

AWS.config.update({ ...AWS_CONFIG, apiVersion: '2006-03-01' })

const S3 = new AWS.S3()
