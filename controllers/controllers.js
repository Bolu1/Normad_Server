const mongoose = require('mongoose')
const User = require('../schema/users_schema')
const Jobs = require('../schema/jobs_schema')
const App = require('../schema/application_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addJobs = async (req,res) =>{

    console.log(req.userData)
    const job = {
        _id: new mongoose.Types.ObjectId(),
        parentId: req.userData.id,
        title: req.body.title,
        description: req.body.description,
        dateAdded: new Date().toISOString(),
        category: req.body.category,
        location: req.body.location,
        skills: req.body.skills,
        exp: req.body.experience,
        pay: req.body.pay,
        type: req.body.type
    }

    const jobs = new Jobs(job)

    try{
        await jobs.save()

        res.status(201).json(jobs)
    }catch(error){
        console.log(error)
        res.status(409).json({ message: error })
    }

}

exports.apply = async(req,res) =>{
    
    const job = {
        _id: new mongoose.Types.ObjectId(),
        jobId: req.body.id,
        applicantId: req.userData.id,
        dateAdded: Date.now()
    }
    const app = new App(job)
    try{
        await app.save()
        res.status(201).json(app)

    }catch(error){
        console.log(error)
        res.status(500).json({ message: error })
    }
}

exports.getall = async(req,res) =>{

    try{
        
        const response = await User.find()
        console.log("here" + response)
        // res.status(200).json(response)
        res.send(response)
    }catch(error){
        res.status(404).json({message: error})
    }
}

exports.getYourApplication = async(req,res) =>{

    try{
        var id
        var job
        const idd = req.userData.id
        // console.log(req.userData.id)
        const app = await App.find({applicantId: idd})
        .exec()
        .then(res=>{
            id =  res.map(r =>{
            return r.jobId
         })

        })
        // console.log(id)
        const jobs = await Jobs.find({'_id': {$in: id}})
        console.log(jobs)
        // console.log("app "+app)
        res.status(200).json(jobs)
    }catch(error){
        console.log(error)
    }    
}


exports.find = async(req,res) =>{
    var l = req.body.post
    console.log(l)
    try{

        const response = await Jobs.find({ description : { "$regex": l, "$options": "i" }})
        console.log(response)
        res.status(200).json(response)
        // res.render({response})
    }catch(error){
        res.status(404).json({error: error})
    }
    
}

exports.findOne = async(req,res) =>{
    
    
    try{
        const l = req.query.post
        console.log("thius "+req.query.post)
        const response = await Jobs.find({ _id : l})
        const cat =(response[0].category)
        const response1 = await Jobs.find({category : cat})
        console.log(response1)
        res.status(200).json({value:response,
                                similar: response1})
    }catch(error){
        res.status(404).json({error: error})
    }
    
}



exports.findMyOne = async(req,res) =>{
    
    
    try{
        var id
        const l = req.query.post
        console.log("thius "+req.query.post)
        const response = await Jobs.find({ _id : l})
        const cat =(response[0].category)
        const response1 = await App.find({jobId : l})
        .exec()
        .then(res=>{
            id =  res.map(r =>{
            return r.applicantId
         })

        })
        // console.log(id)
        const jobs = await User.find({'_id': {$in: id}})
        console.log(response1)
        res.status(200).json({value:response,
                                application: jobs})
    }catch(error){
        res.status(404).json({error: error})
    }
    
}

exports.getDetailsUser = async(req,res,next) =>{

    try{
        const response = await User.find({_id: req.query.post})
        console.log(response[0].category)
        res.status(200).json(response)
    }catch(error){
        console.log(error)
        res.status(404).json({error:error})
    }
}

exports.editProfile = async(req,res,next) =>{
    console.log(req.body)
    try{
        
        await User.updateOne(
            { email: req.userData.email},
            { $set: {
                imageUrl: req.body.imageUrl,
                name: req.body.name,
                linkedin: req.body.linkedin,
                twitter: req.body.twitter,
                portfolio: req.body.portfolio
            }}
        )
        res.status(200).json({message:"User Updated"})
    }catch(error){
        console.log(error)
        res.status(500).json({error: error})
    }
}

exports.editJob = async(req,res,next) =>{
    console.log(req.body)
    try{
        const jobs = await Jobs.find({_id: req.query.post})
        
        const dateUp = jobs[0].dateUpdated
        const dd = new Date().toISOString()
        dateUp.push(dd)
        console.log(dateUp)
        await Jobs.updateOne(
            { _id: req.query.post},
            { $set: {
                title: req.body.title,
                description: req.body.description,
                dateUpdated: dateUp,
                category: req.body.category,
                location: req.body.location,
                skills: req.body.skills,
                exp: req.body.experience,
                pay: req.body.pay,
                type: req.body.type
            }}
        )
        res.status(200).json({message:"User Updated"})
    }catch(error){
        console.log(error)
        res.status(500).json({error: error})
    }
}



exports.getDetailsJob = async(req,res,next)=>{

    const l = req.body.post
    try{

        const response = await Jobs.find({ description : { "$regex": l, "$options": "i" }})
        res.status(200).json(response)
    }catch(error){
        res.status(404).json({error: error})
    }
}

exports.profile = async(req,res,next)=>{

    try{
        const idd = req.userData.id
        console.log(req.userData.id)
        const jobs = await User.find({_id: idd})
        console.log(jobs)
        res.status(200).json(jobs)
    }catch(error){
        console.log(error)
    }    
}

exports.getJobDetails = async(req,res,next)=>{

    try{
        const idd = req.query.post
        console.log(req.querypost)
        const jobs = await Jobs.find({_id: idd})
        console.log(jobs)
        res.status(200).json(jobs)
    }catch(error){
        console.log(error)
    }    
}

exports.profileJob = async(req,res,next)=>{

    try{
        const idd = req.userData.id
        console.log(req.userData.id)
        const jobs = await Jobs.find({parentId: idd})
        console.log(jobs)
        res.status(200).json(jobs)
    }catch(error){
        console.log(error)
    }
}

exports.deleteJob = async(req,res) =>{

    const id = req.body.post

    const resp = await Jobs.findByIdAndRemove(id)
    console.log(resp)
    console.log('Job deleted')
    res.json({message:"Job deleted"})
}

exports.deleteApp = async(req,res) =>{

    const id = req.bodypost

    await App.findByIdAndRemove(id)
    console.log('Job deleted')
    res.json({message:"Job deleted"})
}


exports.signin = (req,res,next)=>{
    var op = req.body.email
    var id, time, date
    console.log("email "+ req.body.password)
    User.findOne({ email: req.body.email})
    .then(
        result => {
            id = result._id
            var myHour = new Date()
            time = (myHour.getHours()+ 1)
            var myDate = new Date()
            date = (myDate.getDate())

            if(result.length < 1){
                console.log("E no enter" + result)
                return res.status(404).json({message:"Invalid login parameters"})               
      }
         bcrypt.compare(req.body.password, result.password, (err, result) => {
            console.log(result) 
             if(err){
                 console.log("First one "+ err)
                 return res.status(500).json({message:"Invalid login parameters"}) 
             }
             if(result){

                console.log("time "+date)
                 const token = jwt.sign({
                     email: req.body.email,
                     id: id
                    
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    })
                console.log("Treu dta "+req.body.email)
                // res.cookie('token', token, {
                //     httpOnly: true})
                // res.json({token})
                const tokenn= token
                // const ab = jwt.decode(token, options={"verify_signature": true})
                // JSON.stringify(jwtdecode(token))
                


                return res.status(200).json({message: "Signin",
                                            token: token,
                                            time:time,
                                            date:date}) 
             }
             console.log("Last one")
             return res.status(404).json({message: "Invalid login parameters"}) 
         }) 
      }
)
    .catch(error =>{console.log(error)
        res.status(500).json({message:"Invalid Login Parameters"})
    })
}




exports.signup = (req,res,next)=>{
    User.find({email: req.body.email}).exec()
    .then(result=>{
        if(result.length > 0){
            console.log("mo " +result)
            res.status(500).json({"message":  "This Email already belongs to a user"})
            return
        }
        else{
            if(req.body.password.length>1){
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                if(err){
                     console.log("this "+err)
                     res.status(500).json({error:err})
                     return
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })  
                    user.save()
                    .then(result=>{
                        console.log("fg "+result)
                        res.status(200).json({message:"signup"})
                        return
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).json({Error:err})
                    })
                }
            })
        }else{
                console.log("too short")
                res.status(500).json({message:"Password too short"})
            }}
    })
      
}