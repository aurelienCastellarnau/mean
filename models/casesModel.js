const mongoose = require('mongoose')
const Schema   = mongoose.Schema;

const Cases = new Schema({
            compnos:                   Number,
            naturecode:                String,
            incident_type_description: String,
            main_crimecode:            String,
            reptdistrict:              String,
            reportingarea:             Number,
            fromdate:                  String,
            weapontype:                String,
            shooting:                  String,
            domestic:                  String,
            shift:                     String,
            year:                      Number,
            month:                     Number,
            day_weak:                  String,
            ucrpart:                   String,
            x:                         Number,
            y:                         Number,
            streetname:                String,
            xstreetname:               String,
            location:                  String
      },
      {
            collection:       'cases'
      });

module.exports = mongoose.model('Cases', Cases);
