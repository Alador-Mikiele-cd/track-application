import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import User from '@/lib/models/user'
import connectDb from '@/lib/db'


export async function POST(req:Request) {
    try{
        await connectDb()
        const {name,email,password} = await req.json()

        const userexists = await User.findOne({email})
        if(!userexists){
         return Response.json({message:'user not found'},{status : 404})
        }
        const compare = await bcrypt.compare(password , userexists.password)

        if(!compare){
           return Response.json({message:'user not found'},{status : 404})
        }
        const token = jwt.sign({userid :userexists._id}, process.env.JWT as string , {expiresIn :'7D'})
        return Response.json({token,id:userexists._id,email:userexists.email},{status : 200})
        

    }catch(err:any){
        return Response.json({err:err.message},{status : 500})
    }
}