'use client'
import { useState } from "react"

export default function Login(){
    const[email , setEamil] = useState('')
    const[pass , setPass] = useState('')
    async function getuser() {
        const user = await fetch('http://localhost:3000/api/users/login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password :pass})

        })
        const data = await user.json()
        localStorage.setItem('token',data.token)
    }
    function handle(){
        getuser()
    }
    return (
        <div className="">
            <input type="text" value={email} onChange={(e) => setEamil(e.target.value) }/>
            <input type="text" value={pass} onChange={(e) => setPass(e.target.value) }/>
            <button onClick={handle}>submite</button>
        </div>
    )
}