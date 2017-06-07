const mongoose = require('mongoose'),
      mongoosastic = require('mongoosastic'),
      esClient = require('../utils/elasticsearch.js');
      Schema = mongoose.Schema;

let Case = new Schema({
      compnos: {
            type: Number,
            es_indexed: true,
            required: true
      },
      naturecode: {
            type: String,
            es_indexed: true,
            required: true
      },
      incident_type_description: {
            type: String,
            es_indexed: true,
            required: true
      },
      main_crimecode: {
            type: String,
            es_indexed: true,
            required: true
      },
      reptdistrict: {
            type: String,
            es_indexed: true,
            required: true
      },
      reportingarea: {
            type: Number,
            es_indexed: true,
      },
      fromdate: {
            type: String,
            es_indexed: true,
      },
      weapontype: {
            type: String,
            es_indexed: true,
      },
      shooting: {
            type: String,
            es_indexed: true,
      },
      domestic: {
            type: String,
            es_indexed: true,
      },
      shift: {
            type: String,
            es_indexed: true,
      },
      year: {
            type: Number,
            es_indexed: true,
      },
      month: {
            type: Number,
            es_indexed: true,
      },
      day_weak: {
            type: String,
            es_indexed: true,
      },
      ucrpart: {
            type: String,
            es_indexed: true,
      },
      x: {
            type: Number,
            es_indexed: true,
      },
      y: {
            type: Number,
            es_indexed: true,
      },
      streetname: {
            type: String,
            es_indexed: true,
            required: true
      },
      xstreetname: {
            type: String,
            es_indexed: true,
      },
      location: {
            type: String,
            es_indexed: true,
            required: true
      }
},
      {
            collection: 'cases'
      })

Case.plugin(mongoosastic, {
      esClient: esClient,
      index: 'cases'
})
/*
** Décommente pour synchro avec ta base:
**

var C = mongoose.model('case', Case)
  , stream = C.synchronize()
  , count = 0;
 
stream.on('data', function(err, doc){
  count++;
});
stream.on('close', function(){
  console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
  console.log(err);
});

 */
Case.static.setCompnos = function setCompnos(compnos) {
      this.compnos = compnos
}

Case.statics.generateCompnos = function generateCompnos(c, callback) {
      const projection = {
            _id : 0,
            compnos: true
      }
      if (!this.compnos)
            this.find({'compnos': {'$not': {'$type': 2}}}, {'compnos': true, '_id': 0})
            .sort({'compnos': -1})
            .limit(1)
            .exec(callback)
};
module.exports = mongoose.model('Case', Case);
