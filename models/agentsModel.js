const mongoose     = require('mongoose'),
      mongoosastic = require('mongoosastic'),
      Schema       = mongoose.Schema

const Agents = new Schema({
    agentcode:  {
        type: Number,
        required: true
    },
    firstname:  {
        type: String,
        required: true
    },
    lastname:   {
        type: String,
        required: true
    },
    password:   {
        type: String,
        required: true
    },
    role:       {
                    type: String,
                    enum: ['CHEF', 'DETECTIVE', 'AGENT'],
                    required: true
                },
},
{
    collection: 'agents',
})

Agents.plugin(mongoosastic)

module.exports = mongoose.model('Agents', Agents)
