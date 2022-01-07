const mongoose = require('mongoose')
const UserSchema  = require( './users_schema')

const jobsSchema = mongoose.Schema({
    _id:{type: mongoose.Schema.Types.ObjectId, required: true},
    parentId: {type: mongoose.Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    pay: {type: String, required: true},
    type: {type: String, default: "On site"},
    skills: {type: [String], required: true},
    exp: {type: [String], required: true},
    dateAdded: Date,
    dateUpdated: {type:[Date], default:new Date().toISOString()},
    category: {type: String, required: true},
    location: {type: String, required: true}

})

module.exports = mongoose.model('JobsSchema', jobsSchema)
