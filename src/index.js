const app = require('./app')
const cnn = require('./dbcnn')
const port = process.env.PORT || 3004

const init = async ()=>{
    await cnn
    await app.listen(port, () => {
        console.log('listen on ...', port)
    })    
}

init()