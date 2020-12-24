const express = require('express')
const conectarDB = require('./config/db')

const app = express()

conectarDB();

const PORT = process.env.PORT || 4000

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})