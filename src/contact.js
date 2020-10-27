const { select, insert, update, remove } = require('./sql')

const tableName = 'information'

const findAll = select(tableName)
const add = insert(tableName)
const change = update(tableName, 'i_id')
const removeById = remove(tableName, 'i_id')

module.exports = { findAll, add, change, removeById }