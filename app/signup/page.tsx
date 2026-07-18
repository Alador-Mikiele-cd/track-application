import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '@/lib/models/user'
import connectDb from '@/lib/db'

export async function POST(req: Request) {
    try {
        await connectDb()
        const { name, email, password } = await req.json()

        const exist = await User.findOne({ email })
        if (exist) {
            return Response.json({ message: "user already exists" }, { status: 409 })
        }

        const hashedpassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedpassword })

        const token = jwt.sign({ userid: user._id }, process.env.JWT as string, { expiresIn: '7d' })

        return Response.json(
            { token, userId: user._id, email: user.email },
            { status: 201 }
        )
    } catch (err: any) {
        return Response.json({ err: err.message }, { status: 500 })
    }
}