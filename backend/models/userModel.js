const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type : String,
        required : true,
        unique : true
    }, 
    password: {
        type : String,
        required : true
    },
    confirmPassword: {
        type : String,
        required : true
    }
})

// static signup method
userSchema.statics.signup = async function (email, password, confirmPassword) {

    // validation
    if (!email || !password || !confirmPassword) {
        throw new Error('all fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid email')
        return
    }

    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
    }

    // if (password !== confirmPassword) {
    //     throw new Error('passwords do not match')
    // }
    if (!validator.isStrongPassword(password)) {
        throw new Error('password is not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error('This email is already a user, do you want to login?')
    } 

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const hash2 = await bcrypt.hash(confirmPassword, salt)

    
    // modern way of creating new user. both lines gives the same outcome
    // const user = new this({ email, password: hash })
    const user = this.create({ email, password: hash, confirmPassword: hash2 })
    return user
}


// static login method
userSchema.statics.login = async function (email, password) {

    if(!email || !password) {
        throw new Error('All fields are required')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Invalid email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error('Incorrect Password')
    }

    return user
    }



module.exports = mongoose.model('User' , userSchema)