//module exports permet de récupérer l'instance express n'importe où
const express      = require('express'),
      path         = require('path'),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose'),
      app          = module.exports = express(),
      conf         = require('./config.js'),
      elasticS     = require('./services/elastic.js'),
      cookieParser = require('cookie-parser'),
      router       = require('./routes/')(app);

app.use(bodyParser.json());
app.use(cookieParser());
//app.use(elasticS.init);
app.set('superSecret', conf.secret);

mongoose.Promise = require('bluebird');
mongoose.connect(conf.dsn);
const db = mongoose.connection;
console.log('coco')
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (){
    console.log('connection succeeded');
    //db.collections.cases.createIndex({ })
    /*
    ** serve the client directory
    */
    app.use(express.static(path.join(conf.clipath)));
    /*
    ** all unmatched fall on cli/dist/index.html, entry point of angular2 app
    */
    app.get('/*', (req, res) => {
        res.sendFile(path.join(conf.clipath, 'index.html'));
    });
})
app.listen(3000);
