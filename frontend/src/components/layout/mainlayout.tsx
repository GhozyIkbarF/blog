import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../section/navbar/navbar'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setIsLogin, setAccessToken, setUserData } from '@/Utlis';
import { Toaster } from '../ui/toaster';

interface token {
  exp: number;
  iat: number;
  name: string;
  userEmail: string;
  userId: number;
  username: string;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${baseURL}/token`, {
        withCredentials: true,
      });
      const decode: token = jwt_decode(res.data.accessToken);

      if (decode) {
        dispatch(setIsLogin(true));
        dispatch(setAccessToken(res.data.accessToken));
        dispatch(setUserData({
          name: decode.name,
          username: decode.username,
          userEmail: decode.userEmail,
          userId: decode.userId
        }));
      }
    } catch (err) {
      // console.error(err);
      dispatch(setIsLogin(false));
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <main className="min-h-screen w-full py-5 mx-auto flex flex-col gap-2 sm:w-4/6">
        <Navbar />
        {children}
      </main>

      <Toaster />
    </>
  )
}

export default Layout