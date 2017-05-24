const mongoose     = require('mongoose'),
      Schema       = mongoose.Schema;

const Cases = new Schema({
            compnos: {
                  type: Number,
                  required: true
            },
            naturecode: {
                  type: String,
                  required: true
            },
            incident_type_description: {
                  type: String,
                  required: true
            },
            main_crimecode: {
                  type: String,
                  required: true
            },
            reptdistrict: {
                  type: String,
                  required: true
            },
            reportingarea: {
                  type: Number,
            },
            fromdate: {
                  type: String,
            },
            weapontype: {
                  type: String,
            },
            shooting: {
                  type: String,
            },
            domestic: {
                  type: String,
            },
            shift: {
                  type: String,
            },
            year: {
                  type: Number,
            },
            month: {
                  type: Number,
            },
            day_weak: {
                  type: String,
            },
            ucrpart: {
                  type: String,
            },
            x: {
                  type: Number,
            },
            y: {
                  type: Number,
            },
            streetname: {
                  type: String,
                  required: true
            },
            xstreetname: {
                  type: String,
            },
            location: {
                  type: String,
                  required: true
            }
      },
      {
            collection:       'cases'
      });
module.exports = mongoose.model('Cases', Cases);
