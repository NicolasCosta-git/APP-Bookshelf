const express = require('express')
const app = express()

require('dotenv').config()

app.get('/', (request: any, response: any) => response.send('hello world'))

app.listen(8080, () => {
  console.log('http://localhost:8080')
})
