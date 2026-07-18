import { Schema , model , models } from "mongoose";



const applicationSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true

    },
    company_name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
         enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    },
    note:{
        type:String
    }
})

const Application = models.Application || model("Application",applicationSchema)

export default Application