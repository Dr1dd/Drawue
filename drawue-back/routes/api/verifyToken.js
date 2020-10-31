const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (req, res, next) =>{
    let token = req.cookies['access-token'];
    let refreshToken = req.cookies['refresh-token'];
    if(refreshToken === undefined) {
        res.cookie('access-token', token,{
            maxAge: 0,
            httpOnly: true,
        });
        res.cookie('refresh-token', refreshToken,{
            maxAge: 0,
            httpOnly: true,
        });
        req.error = true;
    }
    try{
        const verified = jwt.verify(token, config.get('PrivateKey'));
        req.user = verified;
        
    } catch(err){
        
         try{
            const verifiedRefresh = jwt.verify(refreshToken, config.get('PrivateKey2'));
            var userInfo = verifiedRefresh;
            const signToken = jwt.sign({_id : userInfo._id} , config.get('PrivateKey'), {expiresIn: '2m'});
            res.cookie('access-token', signToken,{
                maxAge: 1000*60*2,
                httpOnly: true,
            });
            const verified = jwt.verify(signToken, config.get('PrivateKey'));
            req.user = verified;
         }
         catch(e){
            req.error = true;
        }
    }
    next();
}
module.exports = {verifyToken: verifyToken};