const mongoose= require('mongoose')

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true},
    password: {type: String, required: true},
    imageUrl: {type: String, default: "img/default.jpg"},
    name: {type: String, default: "No Name"},
    dateJoined: Date,
    accountType: String,
    portfolio: String,
    twitter: String,
    linkedin: String,
    
})

module.exports = mongoose.model('UsersSchema', usersSchema)
