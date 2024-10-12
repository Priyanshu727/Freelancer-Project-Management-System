// /models/projectModel.js
const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure this is set to true
    },
    description: {
        type: String,
        required: true, // Ensure this is set to true
    },
    startDate: {
        type: Date,
        required: true, // Ensure this is set to true
    },
    endDate: {
        type: Date,
        required: true, // Ensure this is set to true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

// Create the Project model from the schema
const Project = mongoose.model('Project', projectSchema);

// Export the model
module.exports = Project;
