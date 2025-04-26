import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function navbar() {
  return (
    <div>
        <header>
            <div className="container mx-auto py-4">
              <Link className='flex  items-center gap-4 font-bold' href={"/"}>
              <Image src="logo.svg" alt='Logo Kawula' width={36} height={24}/>
              <h1 className='text-xl'>Kawula</h1>
              </Link>
            </div>
        </header>
    </div>
  )
}
