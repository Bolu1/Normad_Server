const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const auth = async (req,res, next)=>{
    try{
    
    const token = req.headers.authorization.split(" ")[1]
    if(token){
    let decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decoded.email
    const main = decoded.email
    console.log("omoc "+decoded?.email)
    
    res.status(409).json({message:"Already Logedin"})}
    else{
        next()
    }
    }catch(err){
        console.log(err)
        next()
    }
    
}

module.exports = auth