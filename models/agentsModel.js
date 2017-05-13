const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Agents = new Schema({
    agentcode:  Number,
    firstname:  String,
    lastname:   String,
    password:   String,
    rank:       {
                    type: 'string',
                    enum: ['admin', 'normal']
                },
},
{
    collection: 'agents',
})

module.exports = mongoose.model('Agents', Agents);
