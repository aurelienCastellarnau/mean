const path       = require('path');

const config = {
    "database": 'mongodb',
    "addr":     '127.0.0.1',
    "dbport":   '27017',
    "dbname":   'test',
    "clipath":  path.join(__dirname, 'cli', 'dist'),
    "secret":   'Je5u1sUnT0keN'
};
config.dsn = config.database + '://' + config.addr + ':' + config.dbport + '/' + config.dbname;
module.exports = config;
