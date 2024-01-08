import jwt from 'jsonwebtoken'
//const {sign, decode, verify} = jwt;

export const createToken = (name:string, email: string, expiresIn: string) =>{
    const payload = {name, email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
};