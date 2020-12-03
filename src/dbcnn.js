require('dotenv/config')

const mongoose = require('mongoose')

const cnn = mongoose.connect(process.env.DB_CONNECTION, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('db connected!') })
    .catch((err) => { console.log('err:', err) })

module.exports = cnn