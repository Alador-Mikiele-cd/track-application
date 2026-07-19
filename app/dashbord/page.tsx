'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const router = useRouter()
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [note, setNote] = useState('')
    const [applications, setApplications] = useState<any[]>([])
    const [error, setError] = useState('')

    function getToken() {
        return localStorage.getItem('token')
    }

    async function getApplications() {
        const token = getToken()
        const res = await fetch('/api/applications', {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (!res.ok) {
            setError(data.message || data.err || 'Failed to load applications')
            return
        }
        setApplications(data)
    }

    async function handleAdd() {
        const token = getToken()
        const res = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ company_name: company, role, note })
        })
        const data = await res.json()
        if (!res.ok) {
            setError(data.message || data.err || 'Failed to add application')
            return
        }
        setCompany('')
        setRole('')
        setNote('')
        getApplications()
    }

    async function handleStatusChange(id: string, status: string) {
        const token = getToken()
        const res = await fetch(`/api/applications/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        })
        if (!res.ok) {
            const data = await res.json()
            setError(data.message || data.err || 'Failed to update status')
            return
        }
        getApplications()
    }

    async function handleDelete(id: string) {
        const token = getToken()
        const res = await fetch(`/api/applications/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) {
            const data = await res.json()
            setError(data.message || data.err || 'Failed to delete')
            return
        }
        getApplications()
    }

    useEffect(() => {
        const token = getToken()
        if (!token) {
            router.push('/login')
            return
        }
        getApplications()
    }, [])

    const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected']

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Applications</h1>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <div className="flex flex-col gap-3 mb-8">
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company"
                    className="border-2 rounded px-3 py-2"
                />
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role"
                    className="border-2 rounded px-3 py-2"
                />
                <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                    className="border-2 rounded px-3 py-2"
                />
                <button onClick={handleAdd} className="bg-black text-white rounded px-4 py-2">
                    Add application
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {applications.map((app) => (
                    <div key={app._id} className="border rounded p-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-semibold">{app.company_name}</h2>
                                <p className="text-gray-600 text-sm">{app.role}</p>
                                {app.note && <p className="text-gray-500 text-sm mt-1">{app.note}</p>}
                            </div>
                            <button
                                onClick={() => handleDelete(app._id)}
                                className="text-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>

                        <div className="flex gap-2 mt-3">
                            {statusOptions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleStatusChange(app._id, s)}
                                    className={`text-xs px-2 py-1 rounded border ${
                                        app.status === s ? 'bg-black text-white' : 'bg-white'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}