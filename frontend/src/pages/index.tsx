import Title from "@/components/head";
import Navbar from "@/components/section/navbar/navbar";
import Search from "@/components/section/search";
import Post from "@/components/section/content/post";
import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from '@/components/section/menu'

export default function Home() {

  return (
    <>
      <Menu />
      <Post />
      <Toaster />
    </>
  );
}
