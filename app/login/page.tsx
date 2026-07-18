'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const route = useRouter()

    async function getuser() {
        const res = await fetch('/api/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: pass })
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.message || data.err || 'Something went wrong')
            return
        }

        localStorage.setItem('token', data.token)
        route.push('/dashbord')
    }

    function handle() {
        getuser()
    }

    return (
        <div className="max-w-sm mx-auto p-6 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold mb-2">Log in</h1>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border-2 rounded px-3 py-2"
            />
            <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password"
                className="border-2 rounded px-3 py-2"
            />
            <button onClick={handle} className="bg-black text-white rounded px-4 py-2">
                Log in
            </button>
        </div>
    )
}