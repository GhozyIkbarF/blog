import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Title from '@/components/head'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN } from '@/validation'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from "@/store";

interface Inputs {
  email: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
  })

  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const headers = {
    'Content-Type': 'application/json'
  }

  const { toast } = useToast();
  const onSubmit = async (value: Inputs) => {
    try {
      const { data } = await axios.post(`${baseURL}/forgot-password`, value, {headers});
      console.log(data);
      
      toast({
        title: "Login Success!",
        duration: 2500,
      })
      reset();
      clearErrors(["email"]);
    //   router.push('/')
    } catch (err: any) {
      if(err.response){
        for(const error in err.response.data){
         setError(error as 'email', {
            type: "manual",
            message: err.response.data[error],
          });
        }
    }
    toast({
      title: "Sign Up Failed!",
      duration: 5000,
    })
    }
  };

  return (
    <>
      <Title title="Sign In" />

      <main className="min-h-screen">
        <div className="w-4/5 h-full my-0 py-10 mx-auto flex flex-col items-center justify-center lg:w-11/12 2xl:w-7/12">
          <Card className="w-96 mb-5">
            <CardHeader>
              <CardTitle className="text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">Enter your user account verified email address and we will send you a password reset link</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="email" className="after:content-['*'] after:text-red-500">Email </Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="someone@example.com"
                      autoComplete="on"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        }, pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && <small className="text-red-500">{errors.email?.message}</small>}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Reset Passsword</Button>
              </CardFooter>
            </form>
          </Card>
          <Button asChild className="w-96" variant="ghost">
            <Link href="/login">Cencel</Link>
          </Button>
        </div>
      </main>

      <Toaster />
    </>
  )
}

export default Login