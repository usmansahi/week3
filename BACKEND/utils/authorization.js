const jwt = require('jsonwebtoken');
function authorize(request, response, next){
   // read the token and validate it
    const authenticationHeader =request.headers.authorization;
    console.log(authenticationHeader);
    if (!authenticationHeader){
        return response.sendStatus(401);
    }
    const token = authenticationHeader.split(' ')[1];
    console.log(authenticationHeader);
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload); 
        console.log(payload.user);
        request.user = payload.user;
        next()
    }catch (error){
        return response.status(401).send({
            message: error
        });
    }
    

}
module.exports=authorize;