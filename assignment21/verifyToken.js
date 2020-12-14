const jwt = require('jsonwebtoken');
let tokenkey = "tokenkey";


module.exports = function verifyToken(req, res, next){
    let tokenData = req.headers['authorization'];
    if(tokenData!=undefined){
        let token = tokenData.split(" ")[1];
        jwt.verify(token, tokenkey, async (err, user)=>{
            if(err!=null){
                res.status(401);
                res.send({"message": "Invalid Token"});
            } else {
                req.user = user;
                next();
            }
        })
        
    }else {
        res.status(403);
        res.send({"message": "Forbidden"})
    }
}
