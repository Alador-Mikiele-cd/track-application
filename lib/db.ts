import mongoose from "mongoose"
let MONGO_URI = process.env.MONGO_URI as string

let cached = (global as any).mongoose

if(!cached){
   cached = (global as any).mongoose = ({conn : null , promise : null})
}


async function connectDb() {
     if(cached.conn){
        return cached.conn
     }
     if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI).then((mongodb)=>{
            return mongodb
        })
     }

     cached.conn = await cached.promise

     return cached.conn
    
}

export default connectDb


