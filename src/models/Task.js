const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String  , required: true},
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    CreatedBy:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    managerId: {type:mongoose.Schema.Types.ObjectId,  ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);