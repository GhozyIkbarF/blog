import Title from '@/components/head'
import Navbar from '@/components/section/navbar/navbar'
import Search from '@/components/section/search'
import Post from '@/components/section/content/post'

export default function Home() {
  return (
    <>
      <Title title="Home / The Social" />

      <main className="min-h-screen w-4/6 py-5 mx-auto flex flex-col gap-2">
        <Navbar />
        <Search />
        <Post />
      </main>
    </>
  )
}
