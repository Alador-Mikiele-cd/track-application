import { promises } from 'dns'
import jwt from 'jsonwebtoken'

export async function const(req:Request):Promise< { ok: true, userId: string } | { ok: false, message: string } >{
    const authHeader = req.headers.get('authorization')
    if(!authHeader){
        return {ok : false ,  message: 'Authorization token required'}
    }
    const token = authHeader.split(' ')[1]

    if(!token){
        return { ok: false, message: 'Authorization token required' }
    }
    try{
       const decoded = jwt.verify(token,process.env.JWT as string) as {userid : string}
       return { ok: true, userId : decoded.userid }
    }catch(err){
        return { ok: false, message: 'Authorization token required' }
    }
}