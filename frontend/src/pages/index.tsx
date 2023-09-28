import Title from "@/components/head";
import Post from "@/components/section/content/post";
import { Toaster } from "@/components/ui/toaster";
import Menu from '@/components/section/menu'

export default function Home() {

  return (
    <>
      <Title title="Home" />
      <Menu />
      <Post />
      <Toaster />
    </>
  );
}
