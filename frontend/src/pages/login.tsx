import React, { useState } from 'react'
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
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN } from '@/validation'
import axios from 'axios'

interface Inputs {
  email: string;
  password: string;
}



const Login = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LOGIN),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const headers = {
    'Content-Type': 'application/json'
  }
  
  const { toast } = useToast();
  const onSubmit = async (data: Inputs) => {
    console.log(data);
    
    try {
      const res = await axios.post(`${baseURL}/login`, data, {
        headers, 
        withCredentials: true,
      });
      toast({
        title: "Sign Up Success!",
        duration: 2500,
      })
      reset();
      console.log(res);
      clearErrors(["email", "password" ]);
      router.push('/')
    } catch (err) {
      console.log(err)
      toast({
        title: "Sign Up Failed!",
        duration: 5000,
      })
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Title title="Sign In / The Social" />

      <main className="min-h-screen">
        <Toaster />
        <div className="w-4/5 h-full my-0 py-10 mx-auto flex flex-col items-center justify-center lg:w-11/12 2xl:w-7/12">
          <Card className="w-96 mb-5">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
              <CardDescription className="text-center">Enter your email and password to login.</CardDescription>
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
                        required: true, pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && <small className="text-red-500">{errors.email.message}</small>}
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="password" className="after:content-['*'] after:text-red-500">Password </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        autoComplete="on"
                        {...register("password", { required: true })}
                      />
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute top-0.5 right-0.5 text-gray-500 cursor-pointer hover:bg-transparent"
                              variant="ghost"
                              size="sm"

                            >
                              {showPassword ? <EyeOff /> : <Eye />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {showPassword ? <span>Hide password</span> : <span>Show password</span>}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {errors.password && <small className="text-red-500">{errors.password.message}</small>}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Sign In</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </>
  )
}

export default Login