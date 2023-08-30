import Image from 'next/image'
import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='h-screen'>
      <div className="flex items-center p-4 justify-center">
        <Image src={"/perdieum.svg"} alt='logo' width={60} height={40}/>
      </div>
      <div className="flex items-center h-[80%] w-full px-4 lg:px-0">
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
