const client = require('./utils/elasticsearch.js');

client.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});
