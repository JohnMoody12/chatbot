import jwt from 'jsonwebtoken'
//const {sign, decode, verify} = jwt;

export const createToken = (id:string, email: string, expiresIn: string) =>{
    const payload = {id, email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
};