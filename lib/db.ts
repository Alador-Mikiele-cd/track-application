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


// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2YTViZjU2NzZlZjI2YWY5MDE4MzBlMTciLCJpYXQiOjE3ODQ0MTE1MTAsImV4cCI6MTc4NTAxNjMxMH0.nU-p76K3I-_W8Ia2_A4A4iY136RLt3YZeQlvw-iVgW4",
//     "id": "6a5bf5676ef26af901830e17",
//     "email": "12@gmail.com"
// }