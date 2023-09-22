import React, { useState } from "react";
import Link from "next/link";
import Title from "@/components/head";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_USER } from "@/validation";
import { useRouter } from "next/router";
import axios from 'axios'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

interface Inputs {
  name: string;
  username: string;
  email: string;
  photo_profile?: null | string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(CREATE_USER),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      photo_profile: "",
      password: "",
      confirmPassword: "",
    },
  });

  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const headers = {
    'Content-Type': 'application/json'
  }
  
  const { toast } = useToast();
  const onSubmit = async (data: Inputs) => {
    console.log(data);
    
    try {
      const res = await axios.post(`${baseURL}/register`, data, {headers});
      toast({
        title: "Sign Up Success!",
        duration: 2500,
      })
      reset();
      console.log(res);
      clearErrors(["name", "username", "email", "photo_profile", "password", "confirmPassword"]);
      router.push('/login')
    } catch (err) {
      console.log(err);
      toast({
        title: "Sign Up Failed!",
        duration: 2500,
      })
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const inputData = [
    {
      label: "Name",
      type: "text",
      id: "name",
      placeholder: "Enter your name",
      error: errors.name,
      errorMessage: errors.name?.message,
    },
    {
      label: "Username",
      type: "text",
      id: "username",
      placeholder: "Enter your username",
      error: errors.username,
      errorMessage: errors.username?.message,
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      placeholder: "someone@example.com",
      error: errors.email,
      errorMessage: errors.email?.message,
    },
    {
      label: "Photo profile",
      type: "text",
      id: "photo_profile",
      placeholder: "Enter your photo profile",
      error: errors.photo_profile,
      errorMessage: errors.photo_profile?.message,
    },
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
      <Title title="Sign Up / The Social" />
      <main className="min-h-screen">
        <Toaster />
        <div className="w-4/5 h-full my-0 py-10 mx-auto flex flex-col items-center justify-center lg:w-11/12 2xl:w-7/12">
          <Card className="w-96 mb-5">
            <CardHeader>
              <CardTitle className="text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to create your account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  {inputData.map((item, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <Label htmlFor="email" className="after:content-['*'] after:text-red-500">{item.label} </Label>
                      {item.type !== "password" ? (
                        <Input
                          type={item.type}
                          {...register(
                            item.id as
                            | "name"
                            | "username"
                            | "email"
                            | "photo_profile"
                            | "password"
                            | "confirmPassword",
                          )}
                          id={item.id}
                          placeholder={item.placeholder}
                        />
                      ) : (
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
                              | "name"
                              | "username"
                              | "email"
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
                                  onClick={
                                    item.id === "password"
                                      ? togglePasswordVisibility
                                      : toggleConfirmPasswordVisibility
                                  }
                                  className="absolute top-0.5 right-0.5 text-gray-500 cursor-pointer hover:bg-transparent"
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
                                    <span>Hide password</span>
                                  ) : (
                                    <span>Show password</span>
                                  )
                                ) : showConfirmPassword ? (
                                  <span>Hide password</span>
                                ) : (
                                  <span>Show password</span>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                      {item.error && (
                        <small className="text-red-500">{item.errorMessage}</small>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </Card>
          <Button asChild className="w-96" variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default SignUp;
