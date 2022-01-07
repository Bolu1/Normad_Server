const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const auth = async (req,res, next)=>{
    try{

    const token = req.headers.authorization.split(" ")[1]

    let decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = {
                        email: decoded.email,
                        id: decoded.id
                    }
    const main = decoded.email
    console.log("omoc "+decoded?.id)
    
    next()
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err})
    }
    
}

module.exports = auth