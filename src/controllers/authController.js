const User = require('../models/User')
const jwt = require('jsonwebtoken')

const SignUp = async (req, res, next) => {
    if (!(UserExist(req.body.email)))
        return res.status(401).send('user email already exists')

    let localResp = {}
    const { userName, email, password } = req.body
    const newUser = new User({ userName, email, password })
    newUser.password = await newUser.encryptPassword(newUser.password)
    await newUser.save()
        .then((dt) => {
            localResp = { 'ok': dt }
            jwt.sign({ id: dt._id }, process.env.SECRET, {
                expiresIn: 60 * 60
            })
            console.log(process.env.SECRET)
            console.log(jwt)
        })
        .catch((err) => { localResp = { err } })

    return res.json({ 'resp': localResp })
}

const SignIn = async (req, res, next) => {
    console.log('ok')
    return res.json({ 'ok': 'ok' })
}

const Me = async (req, res, next) => {
    console.log('ok')
    return res.json({ 'ok': 'ok' })
}

const UserExist = async (email) => {
    const existUser = await User.findOne({ email: email })
    return (!existUser) ? false : true
}

module.exports = { SignUp, SignIn, Me }