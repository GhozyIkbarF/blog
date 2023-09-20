import React from 'react'
import Navbar from './section/navbar/navbar'

type LayoutProps = {
  children: React.ReactNode,
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="min-h-screen w-4/6 py-5 mx-auto flex flex-col gap-2">
        <Navbar />
        {children}
      </main>
    </>
  )
}

export default Layout