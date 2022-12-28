const initOption = {};
const pgp = require('pg-promise')(initOption);

const cn = require('../configs/connectStr')

const connect = pgp(cn);
module.exports = { connect }