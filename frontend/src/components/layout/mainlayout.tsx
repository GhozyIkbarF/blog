import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../section/navbar/navbar'
import Title from '../head';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setIsLogin, setUserData } from '@/Utlis';


interface token {
  exp: number;
  iat: number;
  name: string;
  userEmail: string;
  userId: number;
  username: string;
}
type LayoutProps = {
  children: React.ReactNode,
};

const Layout = ({ children }: LayoutProps) => {
  const router  = useRouter();
  const dispatch = useDispatch();
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${baseURL}/token`, {
        withCredentials: true,
      });
      const decode: token = jwt_decode(res.data.accessToken);
      
      if(decode){
        dispatch(setIsLogin(true));
        dispatch(setUserData({
          name: decode.name,
          username: decode.username,
          userEmail: decode.userEmail,
          userId: decode.userId
        }));
      } 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);
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