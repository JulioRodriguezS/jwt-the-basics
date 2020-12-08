const User = require('../models/User')
const jwt = require('jsonwebtoken')

const SignUp = async (req, res, next) => {
    const userE = await UserExist(req.body.email)
    if (userE)
        return res.status(401).send('user email already exists')

    let localResp = {}
    const { userName, email, password } = req.body
    const newUser = new User({ userName, email, password })
    newUser.password = await newUser.encryptPassword(newUser.password)
    await newUser.save()
        .then(async (data) => {
            const token = await SignJWT(data._id)
            localResp = { 'ok': [{ 'token': token }, { 'data': data }] }
        })
        .catch((err) => { localResp = { err: err } })

    return res.json({ 'resp': localResp })
}

const SignIn = async (req, res, next) => {
    const { email, password } = req.body
    const verifyUser = await VerifyUser(email, password)
    if (!verifyUser.coincide) {
        return res.status(401).send("The user password doesn't coincide")
    }
    const token = await SignJWT(verifyUser.data._id)
    return res.json({ 'ok': token })
}

const Me = async (req, res, next) => {
    console.log('ok')
    return res.json({ 'ok': 'ok' })
}

const Tasks = async (req, res, next) => {
    res.json([{
        _id: 1,
        name: 'Task one',
        description: 'Lorem Ipsum...',
        date: '2020-12-06T18:59:18.629Z'
    },
    {
        _id: 2,
        name: 'Task twoo',
        description: 'Lorem Ipsum...',
        date: '2020-12-06T18:59:18.629Z'
    },
    {
        _id: 3,
        name: 'Task three',
        description: 'Lorem Ipsum...',
        date: '2020-12-06T18:59:18.629Z'
    }
    ]).json()
}

const PrivateTask = async (req, res, next) => {
    res.json([{
        resp: 'this is a private route'
    }, {
        _id: 1,
        name: 'Task one',
        description: 'Lorem Ipsum...',
        date: '2020-12-06T18:59:18.629Z'
    },
    {
        _id: 2,
        name: 'Task twoo',
        description: 'Lorem Ipsum...',
        date: '2020-12-06T18:59:18.629Z'
    },
    {
        _id: 3,
        name: 'Task three',
        description: 'Lorem Ipsum...',
        date: '2020-12-06T18:59:18.629Z'
    }
    ]).json()
}

const UserExist = async (email) => {
    const existUser = await User.findOne({ email: email })
    return (!existUser) ? false : true
}
const VerifyUser = async (email, password) => {
    let localResp = {}
    await User.findOne({ email: email })
        .then(async (data) => {
            const passCoincide = await data.validPassword(password)
            if (!passCoincide) {
                localResp.coincide = false
            } else {
                localResp.coincide = true
                localResp.data = data
            }
        })
        .catch((err) => {
            localResp.coincide = false
            localResp.errorMessage = err
        })
    return localResp
}
const SignJWT = async (id) => {
    const token = await jwt.sign({ _id: id }, process.env.SECRET, {
        expiresIn: 60 * 60
    })
    return token
}
const VerifyToken = (req, res, next) => {
    if (!req.headers.authorization)
        res.status(401).send('no permissions')

    const token = req.headers.authorization.split(' ')[1]
    try {
        const payLoad = jwt.verify(token, process.env.SECRET)
        req.userId = payLoad._id
    } catch (e) {
        res.status(403).json({ err: e })
    }
    next()
}

module.exports = { SignUp, SignIn, Me, Tasks, PrivateTask, VerifyToken }