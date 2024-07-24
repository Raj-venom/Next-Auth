"use clientf"

import React from 'react'

function userProfile({params}: any) {
    
    return (
        <div className=' min-h-screen flex flex-col justify-center items-center'>
            <h2>hello</h2>
            <h3 className='bg-slate-200  text-black px-4 py-1 rounded-md'>{params.id}</h3>
        </div>
    )
}

export default userProfile
