const cases   = require('../../models/casesModel');

cases.find(function(err, c) {
        if (err) {
            return console.log("rekt");
        }
    toto = json(c)
}
stream = cases.synchronize()
count = 0;

stream.on('data', function(err, doc){
  count++;
});
stream.on('close', function(){
  console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
  console.log(err);
});
