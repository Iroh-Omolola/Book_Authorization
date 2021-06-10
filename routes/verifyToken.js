import jwt from 'jsonwebtoken';

 export default function auth(req, res, next) {
    const token = req.header("auth-token");
    if(!token) return res.status(401).json({msg:"Access Denied!"});
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verify;
        next();
    }
    catch(err){
        res .status(400).json({msg:"Invalid Token!"})
    }
}

