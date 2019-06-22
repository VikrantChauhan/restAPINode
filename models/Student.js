const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentSchema = new schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Student = mongoose.model('students',studentSchema);
