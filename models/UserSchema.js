const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validator:{
            validator: function(v){
                return v.length > 4
            },
            message: props => `Username must be longer than 4 characters.`
        }
    },
    name: String,
    passwordHash: String,
    blogs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

UserSchema.set('toJson',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete retruendObject._v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User