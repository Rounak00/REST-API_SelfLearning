import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js'

export function verifyToken (req, res,next) {
    const token = req.cookies.access_token;
    if(!token){
        return res.json({ msg: "You are not authenticated" });
    }
    jwt.verify(token,JWT_SECRET, (err, user) => {
        if(err) {
            return res.json({ msg: "You are not authenticated" });
        }
        req.user = user;
        next();
    })
}

export function verifyUser(req,res,next) {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.json({ msg: "You are unauthorized" });
        }
    })
}

export function verifyAdmin(req,res,next) {
    verifyToken(req,res,() => {
        if(req.user.isAdmin){
            next()
        }else{
            return res.json({ msg: "You are unauthorized" });
        }
    })
}
