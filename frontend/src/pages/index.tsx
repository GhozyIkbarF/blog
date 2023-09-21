import Menu from '@/components/section/menu'
import Post from '@/components/section/content/post'
import { Toaster } from "@/components/ui/toaster"

export default function Home() {

  return (
    <>
      <Menu />
      <Post />
      <Toaster />
    </>
  )
}
