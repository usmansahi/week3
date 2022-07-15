const { response } = require('express');
const { request } = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const usersDB = require('../database/db');
const generateJWT = require('../utils/jwt');

/* post /login */
router.post('/',async(request,response)=>{
    const {username, password} = request.body;
    
    const databaseUser = usersDB.find(user => user.username == username);
    if (!databaseUser){
        response.sendStatus(401);
    } 
        
        const isAuthorized = await bcrypt.compare(password, databaseUser.password);
    if(!isAuthorized){
        return response.sendStatus(401);
    }
    // creat JWT -JSON WEB TOKEN

    const token = generateJWT(username);
    response.send({token: token});
      
});
module.exports= router;