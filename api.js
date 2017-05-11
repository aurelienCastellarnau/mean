const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      app        = express(),
      router     = require('./routes/')(app);

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mean');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (){
    console.log('connection succeeded');
})
app.listen(3000);
