"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function signupPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })


    const handleSignup = async () => {

        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", data)
            if (response.data) {
                console.log("signup in");
                router.push("/login")
            }
        } catch (error: any) {
            setError(error.response.data.error)
            console.log(error);

        }
        finally {
            setLoading(false)
        }

    }

    console.log(data);

    return (
        <>

            <div className=' min-h-screen flex flex-col justify-center items-center'>

                <h2 className='text-4xl'> signup page</h2>
                <div className='mt-5'>
                    {error ? <div>{error}</div> : "no error"}

                </div>
                <div>
                    <div className=' mt-2'>
                        <label htmlFor="username">UserName</label>
                        {" "}
                        <input
                            id='username'
                            type="text"
                            placeholder='username'
                            className='text-black'
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            value={data.username}
                        />
                    </div>

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

                <button className='bg-slate-400 ' onClick={handleSignup}>signup</button>

                <div>
                   
                    <Link href={"/login"}> <p>Already have account</p></Link>
                
                </div>
            </div>
        </>

    )
}

export default signupPage