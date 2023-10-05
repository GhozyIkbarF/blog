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
  password: string;
  confirmPassword: string;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      password: "",
      confirmPassword: "",
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
        title: "Reset Password Success!",
        duration: 2500,
      })
      reset();
      clearErrors(["password", "confirmPassword"]);
    //   router.push('/')
    } catch (err: any) {
      if(err.response){
        for(const error in err.response.data){
         setError(error as 'password' | 'confirmPassword', {
            type: "manual",
            message: err.response.data[error],
          });
        }
    }
    toast({
      title: "Reset Password Failed!",
      duration: 5000,
    })
    }
  };

  const togglePasswordVisibility = (param: string) => {
    if(param === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword); 
  };

  const inputData = [
    {
      label: "Password",
      type: "password",
      id: "password",
      placeholder: "Enter your password",
      error: errors.password,
      errorMessage: errors.password?.message,
    },
    {
      label: "Confirm password",
      type: "password",
      id: "confirmPassword",
      placeholder: "Password confirmation",
      error: errors.confirmPassword,
      errorMessage: errors.confirmPassword?.message,
    },
  ];

  return (
    <>
      <Title title="Sign In" />

      <main className="min-h-screen">
        <div className="w-4/5 h-full my-0 py-10 mx-auto flex flex-col items-center justify-center lg:w-11/12 2xl:w-7/12">
          <Card className="w-96 mb-5">
            <CardHeader>
              <CardTitle className="text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">Enter your new password</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                {inputData.map((item, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <Label htmlFor="email" className="after:content-['*'] after:text-red-500">{item.label} </Label>
                        <div className="relative">
                          <Input
                            type={
                              item.id === "password"
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : showConfirmPassword
                                  ? "text"
                                  : "password"
                            }
                            id={item.id}
                            placeholder={item.placeholder}
                            {...register(
                              item.id as
                              | "password"
                              | "confirmPassword",
                              { required: true }
                            )}
                          />
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    item.id === "password"
                                      ? togglePasswordVisibility('password')
                                      : togglePasswordVisibility('confirmPassword')
                                  }
                                  className="absolute top-0.5 right-0.5 text-muted-foreground cursor-pointer hover:bg-transparent"
                                  variant="ghost"
                                  size="sm"
                                >
                                  {item.id === "password" ? (
                                    showPassword ? (
                                      <EyeOff />
                                    ) : (
                                      <Eye />
                                    )
                                  ) : showConfirmPassword ? (
                                    <EyeOff />
                                  ) : (
                                    <Eye />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {item.id === "password" ? (
                                  showPassword ? (
                                    "Hide password"
                                  ) : (
                                    "Show password"
                                  )
                                ) : showConfirmPassword ? (
                                  "Hide password"
                                ) : (
                                  "Show password"
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      {item.error && <small className="text-red-500">{item.errorMessage}</small>}
                    </div>
                  ))}
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