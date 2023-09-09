import React from 'react'
import {useSession} from "next-auth/react"
import Link from 'next/link'

const Store = () => {
  const {data: session} = useSession()
  console.log("sessopn",session)
  return (
    <div className='min-h-screen'>
      <h1 className="text-2xl text-center text-gray-500">Store {session?.user.name}</h1>
      <Link href="/">Login</Link>
    </div>
  )
}

export default Store
