const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = module.exports = express(),
    conf = require('./config.js'),
    cookieParser = require('cookie-parser'),
    router = require('./routes/')(app),
    ESindex = require('./services/elastic.js');

app.use(bodyParser.json());
app.use(cookieParser());
app.set('superSecret', conf.secret);

mongoose.Promise = require('bluebird');
mongoose.connect(conf.dsn);
const db = mongoose.connection;
console.log('coco')
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connection succeeded');
    app.use(express.static(path.join(conf.clipath)));
    /*
    ** Appel du service d'indexation en dehors du flow des
    ** middlewares. Comme ca on l'appelle qu'une fois...
    ** Reste à implémenter la maj du modèle elasticSearch
    ** => update de l'index 'cases'.
    */
    ESindex.init();
    app.get('/*', (req, res) => {
        res.sendFile(path.join(conf.clipath, 'index.html'));
    });
})
app.listen(3000);
