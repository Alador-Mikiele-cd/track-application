import connectDb from "@/lib/db";
import Application from '@/lib/models/application'
import {requireAuth} from '@/lib/auth'
export async function GET(req:Request) {

    const auth = await requireAuth(req)

    if(!auth.ok){
        return Response.json({ message: auth.message }, { status: 401 })
    }

    try{
         await connectDb()
    const app = await Application.find({userId : auth.userId}).populate('userID')
    if(!app){
        return Response.json({message:'application not found'},{status:404})
    }
    return Response.json(app,{status:200})
    }catch(err:any){
        return Response.json({err : err.message},{status:500})
    }
}

export async function POST(req:Request) {
    const auth = await requireAuth(req)
    if(!auth.ok){
        return Response.json( {message: auth.message }, { status: 401 })
    }
    try{
        await connectDb()
      const{company_name,role,status,note} = await req.json()
      const app = await Application.create({userId : auth.userId,company_name,role,status,note})
      return Response.json(app,{status:200})
    }catch(err:any){
        return Response.json({err : err.message},{status:500})
    }
}

