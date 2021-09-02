const ormjson = require('../../ormconfig.json')
export const connection = {
    ...ormjson,
    database: 'testbookshelf',
    name: 'testConnection',
    dropSchema: true
}
