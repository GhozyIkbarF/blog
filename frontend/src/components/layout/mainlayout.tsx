import React from 'react'
import Navbar from '../section/navbar/navbar'
import Title from '../head';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Title title="Home / The Social" />
      <main className="min-h-screen w-4/6 py-5 mx-auto flex flex-col gap-2">
        <Navbar />
        {children}
      </main>
    </>
  )
}

export default Layout