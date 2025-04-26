import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeaderAuth from '@/components/header-auth'
export default function navbar() {


  return (
    <div>
      <header>
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <Link className='flex justify-between  items-center gap-4 font-bold' href={"/"}>
              <Image src="logo.svg" alt='Logo Kawula' width={36} height={24} />
              <h1 className='text-xl'>Kawula</h1>
            </Link> 

            <HeaderAuth />
          </div>


        </div>
      </header>
    </div>
  )
}
