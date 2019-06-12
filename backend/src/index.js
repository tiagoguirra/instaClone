const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

require('dotenv').config({ path: path.resolve(__dirname,'..','.env') })

const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect(process.env.MONGO_HOST,{
    useNewUrlParser:true,
    dbName:process.env.MONGO_DB
})

app.use((req,res,next)=>{
    req.io = io;
    
    next();
})

app.use(cors())
app.use('/files',express.static(path.resolve(__dirname,'..','uploads','resized')))
app.use(require('./routes'))
const host = process.env.APP_HOST || 'localhost'
const port = process.env.APP_PORT || 3333
server.listen(port,host,()=>{
    console.log(`Running at host: ${host} on port: ${port}`)
})