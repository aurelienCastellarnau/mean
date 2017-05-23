const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client( {
  hosts: '127.0.0.1:9200',
  log: 'trace'
});

module.exports = client;
