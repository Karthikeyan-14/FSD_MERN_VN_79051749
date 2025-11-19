const db=require('../model/model')
const bcrypt=require('bcrypt')

const getuser=async(req,res)=>{

    let data=await db.find()
    res.send({data})

}

const insert=async(req,res)=>{
    console.log(req.body)
    let data=await db.create(req.body)
    res.send({data})

}

const login=async(req,res)=>{
    try{
        let {email,password}=req.body
        let data=await db.findOne({email:email})
        if(data){
            // let check_pass=await db.findOne({password:password})
            let verify=await bcrypt.compare(password,data.password)
            if(verify){
                return res.status(200).send({message:"Welcome",data})    
            }
            else{
                return res.status(404).send({message:"Wrong password"})
            }    
        }
        else{
            res.status(404).send({message:"user Id not found"})
        }
    }
    catch(err){
        res.status(404).send(err)
    }
}

const reg=async(req,res)=>{
    try{
        let {name,email,password}=req.body
        let hashed_pass=await bcrypt.hash(password,10)
        let data=await db.findOne({email:email})
        if(data){
            res.status(404).send({message:"You have already have account and your details are.. !!",data})
        }
        else{
            let data=await db.create({
                name:name,
                email:email,
                password:hashed_pass

            })
            res.status(200).send({message:"successfully created user",data})
        }

    }
    catch(err){
        res.status(404).send(err)
    }
 
}

const update_user=async(req,res)=>{
    try{
        let data=req.body
        let name=req.params.name
        let result=await db.findOneAndUpdate({name:name},data,{new:true})
        res.status(200).send({message:"successfully Updated",data})
    }
    catch(err){
        res.status(400).send(err)
    }

}
const delete_user=async(req,res)=>{
    console.log("hello")
    try{
        let name=req.params.name
        let data=await db.findOneAndDelete({name:name})
        res.status(200).send({message:"deleted Succesfully",data})
    }
    catch(err){
        res.status(400).send(err)
    }


}
module.exports={getuser,insert,login,reg,update_user,delete_user}