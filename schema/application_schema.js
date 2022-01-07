const mongoose = require('mongoose')

const applicationsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobId: mongoose.Schema.Types.ObjectId,
    applicantId: mongoose.Schema.Types.ObjectId,
    dateAdded: Date

    
})

module.exports = mongoose.model('ApplicationsSchema', applicationsSchema)