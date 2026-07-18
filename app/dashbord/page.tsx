'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Signup(){
      const[email , setEamil] = useState('')
      const[pass , setPass] = useState('')
      const[name,setName] = useState('')
      const route = useRouter()
      async function getuser() {
        const res = await fetch('http://localhost:3000/api/users/login',{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({name,email,password:pass})
        })
        const data = await res.json()
        localStorage.setItem('token',data.token)
        route.push('/dashbord')
        
      }
      function handle(){
        getuser()

      }
    return(
    <h1>hi</h1>   
    )
}