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
    ** De plus, l'api bénéficie maintenant de l'argument:
    ** -index [true|false] => doit être à true pour lancer l'index
    ** Ajout des commandes npm run deploy_win_index et deploy_unix_index
    ** Reste à implémenter la maj du modèle elasticSearch
    ** => update de l'index 'cases'.
    */
    process.argv.forEach(function (val, index, array) {
        let argExist = (array[index + 1]) ? true : false
        let indexTrue = false;
        if (argExist)
            indexTrue = (array[index + 1] === 'true')
        if (val === '-index' && indexTrue) {
            ESindex.init();
        }
    });
    app.get('/*', (req, res) => {
        res.sendFile(path.join(conf.clipath, 'index.html'));
    });
})
app.listen(3000);
