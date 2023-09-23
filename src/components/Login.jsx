'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Login = () => {
  const { data: session, status } = useSession()
  const logout = async () => {
    await signOut({ callbackUrl: '/' })
  }
  console.log(session, status)
  if (status === 'unauthenticated') {
    return (
      <div>
        <button onClick={() => signIn('google')}>Sign in with google</button>
      </div>
    )
  }
  return (
    <div>
      <Image src={session?.user.image} alt={session?.user.name} width={100} height={100} />
      <h2>{session?.user.name}</h2>
      <p>{session?.user.email}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Login
