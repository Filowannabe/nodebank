const knex = require('knex');

module.exports = knex({
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/mibanco',
    pool: { min: 1, max: 2 },
    acquireConnectionTimeout: 5000,
});