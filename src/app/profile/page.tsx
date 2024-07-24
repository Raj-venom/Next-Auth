"use client"
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface User {
    _id: String,
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
}
// 
function page() {

    const [data, setData] = useState<User | null>(null);
    const router = useRouter()

    const logOut = async () => {

        try {
            const res = await axios.get("/api/users/logout")
            toast.success("Logout sucessfull")
            router.push("/login")
            
        } catch (error:any) {
            toast.error("Failed to logout")

        }

    }


    useEffect(() => {

        try {
            ; (async () => {

                const response = await axios.get("/api/users/current")
                console.log(response.data.user);
                setData(response.data.user)

            })()
        } catch (error: any) {

            toast.error("error.message")

        }

    }, [])

    return (
        <div className=' min-h-screen flex flex-col justify-center items-center'>

            <h2 className='text-3xl font-bold'>Profile</h2>
            <h3 className='mt-1 mb-4'>{data?.username}</h3>

            <div className='flex gap-2'>
                <h3>click to view details: </h3>
                <h3> <Link href={`/profile/${data?._id}`}>{data?._id}</Link></h3>
           
            </div>

            <button onClick={logOut} className='px-5 py-1 rounded-xl mt-2 bg-slate-400'>Logout</button>

            <Toaster />
        </div>
    )
}

export default page