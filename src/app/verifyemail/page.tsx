"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

function VerifyPage() {

    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const [verify, setVerify] = useState(false)

    const verifyEmail = async () => {
        try {
            setError("")
            console.log(token);
            console.log(typeof token);
            
            await axios.post("/api/users/verify", {token})
            setVerify(true)
        } catch (error: any) {
            setError(error.response.data.error)
            console.log(error);
        }

    }

    useEffect(() => {
        const token = window.location.search.split("=")[1]
        setToken(token || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])


    return (
        <div className=' min-h-screen flex flex-col justify-center items-center'>

            <h1>Verify email</h1>
            {error && <div>{error}</div>}
            {token && <div>{token}</div>}
            {verify && (<div>
                <h2>Email verifyed sucessfully</h2>
                <Link href={"/login"}>Login</Link>
            </div>)}

        </div>
    )
}

export default VerifyPage