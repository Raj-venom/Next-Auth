"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

function signupPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const handleLogin = async () => {

        try {
            setLoading(true)
            setError("")
            const response = await axios.post("/api/users/login", data)
            if (response.data) {
                console.log("Logged in");
                toast.success("Login sucess")


            }
        } catch (error: any) {
            setError(error.response.data.error)
            console.log(error);
            toast.error("Login failed")

        }
        finally {
            setLoading(false)
        }

    }

    console.log(data);

    return (
        <>

            <div className=' min-h-screen flex flex-col justify-center items-center'>

                <h2 className='text-4xl'> Login page</h2>

                <div className='mt-5'>
                    {error ? <div>{error}</div> : "no error"}

                </div>
                <div>
                    <div className=' mt-2'>
                        <label htmlFor="email">UserName</label>
                        {" "}
                        <input
                            id='email'
                            type="email"
                            placeholder='email'
                            className='text-black'
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            value={data.email}
                        />
                    </div>

                    <div className=' mt-2'>
                        <label htmlFor="password">UserName</label>
                        {" "}
                        <input
                            id='password'
                            type="password"
                            placeholder='password'
                            className='text-black'
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            value={data.password}
                        />
                    </div>

                </div>

                <button className='bg-slate-400 ' onClick={handleLogin}>Login</button>

                <div>
                    <Link href={"/signup"}><p>Create account</p></Link>

                </div>
                <Toaster />
            </div>
        </>

    )
}

export default signupPage