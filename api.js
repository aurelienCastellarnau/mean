const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      app        = express(),
      router     = require('./routes/')(app);
      conf       = require('./co.js');

app.use(bodyParser.json());

mongoose.connect(conf.dsn);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (){
    console.log('connection succeeded');
})
app.listen(3000);
