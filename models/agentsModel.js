const mongoose     = require('mongoose'),
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
        required: false
                },
    status:     {
        type: String,
        required: true
    }
},
{
    collection: 'agents',
})

module.exports = mongoose.model('Agents', Agents)
