const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '30m'})
}


// login logic
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)
        // res.json({ mssg: "user logged in" })
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup logic
const signupUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body

    try {
        const user = await User.signup(email, password, confirmPassword)

        // create a token
        const token = createToken(user._id)
        // res.json({ mssg: "user created successfully" })
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})

    }
    }


    module.exports = {
        loginUser,
        signupUser
    }