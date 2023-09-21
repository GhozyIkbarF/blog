import Title from "@/components/head";
import Navbar from "@/components/section/navbar/navbar";
import Search from "@/components/section/search";
import Post from "@/components/section/content/post";
import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface token {
  exp: number;
  iat: number;
  name: string;
  userEmail: string;
  userId: number;
  username: string;
}

export default function Home() {
  const [token, setToken] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router  = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${baseURL}/token`, {
        withCredentials: true,
      });
      const decode: token = jwt_decode(res.data.accessToken);
      setUsername(decode.username)
      console.log(decode);
    } catch (err) {
      console.error(err);
      router.push('/login')
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <Title title="Home / The Social" />
      <Layout>
        <Search />
        <Post />
        <Toaster />
      </Layout>
    </>
  );
}
