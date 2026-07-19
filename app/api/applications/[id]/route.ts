import connectDb from "@/lib/db"
import { requireAuth } from '@/lib/auth'
import Application from "@/lib/models/application"
import User from "@/lib/models/user"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = await requireAuth(req)
    if (!auth.ok) {
        return Response.json({ message: auth.message }, { status: 401 })
    }

    try {
        await connectDb()
        const { id } = await params
        const { status } = await req.json()

        const app = await Application.findOneAndUpdate(
            { _id: id, userId: auth.userId },
            { status },
            { new: true }
        )

        if (!app) {
            return Response.json({ message: 'Application not found' }, { status: 404 })
        }

        return Response.json(app, { status: 200 })
    } catch (err: any) {
        return Response.json({ err: err.message }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const auth = await requireAuth(req)

    if (!auth.ok) {
        return Response.json({ message: auth.message }, { status: 401 })
    }

    try {
        await connectDb()
        const { id } = await params
        const deleted = await Application.findOneAndDelete({ _id: id, userId: auth.userId })
        if (!deleted) {
            return Response.json({ message: 'Application not found' }, { status: 404 })
        }
        return Response.json({ message: "application deleted" }, { status: 200 })
    } catch (err: any) {
        return Response.json({ err: err.message }, { status: 500 })
    }
}