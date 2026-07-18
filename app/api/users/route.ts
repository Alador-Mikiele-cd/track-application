import bcrypt from 'bcrypt'
import User from '@/lib/models/user'
import connectDb from '@/lib/db'


export async function POST(req:Request) {
    try{
        await connectDb()
        const{name,email , password} = await req.json()

        const user = await User.findOne({email})
        if(user){
            return Response.json({message : "user already existes" },{status:409})
        }

        const hased = await bcrypt.hash(password , 10)

        const users = await User.create({name,email,password:hased})
         return Response.json({users }, {status:201})
    }catch(err:any){
        return Response.json({err : err.message }, {status:500})
    }
}