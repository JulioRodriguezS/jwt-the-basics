const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    savedDate: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userSchema.methods.validPassword = function(password){
    return bcrypt.compare(this.password, password)
}
module.exports = mongoose.model('User', userSchema)