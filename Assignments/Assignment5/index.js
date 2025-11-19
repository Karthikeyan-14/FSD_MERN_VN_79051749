const express=require('express')
const app=express()
const mongoose=require('mongoose')
const PORT=4000
app.use(express.json())
const userroute=require('./router/router')

mongoose.connect("mongodb+srv://karthi:karthi4836w@cluster0.rciymzf.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("Connect to db")
})
.catch((err)=>{
    console.log(err)
})

app.use(userroute)



app.listen(PORT,()=>{
    console.log("server is working")
})