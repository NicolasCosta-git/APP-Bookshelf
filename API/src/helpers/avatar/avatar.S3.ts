const S3Config = require('./S3.config')
require('dotenv').config()
const AWS = require('aws-sdk')

export const S3 = new AWS.S3(S3Config.S3.s3)
