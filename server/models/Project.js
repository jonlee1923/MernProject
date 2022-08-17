const mongoose = require('mongoose');

//creating a mongoose schema 
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,  
    },
    description: {
        type: String,  
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']  
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', //assigning the clientId to be the same as another model, which is the clients id in client js
    }
})

module.exports = mongoose.model('Project', ProjectSchema);