const path       = require('path');

const config = {
    "database": 'mongodb',
    "addr": '127.0.0.1',
    "dbport": '27017',
    "dbname": 'mean',
    "clipath": path.join(__dirname, 'cli', 'dist')
};
config.dsn = config.database + '://' + config.addr + ':' + config.dbport + '/' + config.dbname;
module.exports = config;
