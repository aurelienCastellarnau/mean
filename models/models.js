const mongoose = require('mongoose')
const Schema   = mongoose.Schema;

const Cases = new Schema({
            compnos:                   Int32,
            naturecode:                String,
            incident_type_description: String,
            main_crimecode:            String,
            reptdistrict:              String,
            reportingarea:             Int32,
            fromdate:                  String,
            weapontype:                String,
            shooting:                  String,
            domestic:                  String,
            shift:                     String,
            year:                      Int32,
            month:                     Int32,
            day_weak:                  String,
            ucrpart:                   String,
            x:                         Double,
            y:                         Double,
            streetname:                String,
            xstreetname:               String,
            location:                  String
        })
module.exports = mongoose.model('Cases', Cases);
