import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LoginBtn = () => {
  return (
    <>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/signup">
        <Button variant="ghost">Sign Up</Button>
      </Link>
    </>
  )
}

export default LoginBtn