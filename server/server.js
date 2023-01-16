require('dotenv').config()
const express=require('express')
const path=require('path')
const router=require('./routes')


const app=express()
const cors=require('cors')

app.use(cors())
const PORT=process.env.API_PORT
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

app.listen(PORT,(err)=>{
    console.log("API server running at port 3001")
})