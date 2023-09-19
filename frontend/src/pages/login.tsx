import React, { useState } from 'react'
import Title from '@/components/head'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff } from "lucide-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN } from '@/validation'


interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

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

  const { toast } = useToast();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: Inputs) => {
    try{
      console.log(data);
      toast({
        variant: "default",
        description: "Login success",
        duration: 2500,
      })
      clearErrors(["email", "password"])
      reset()
    }catch(err){
      console.log(err);
      
    }
  }

  return (
    <>
      <Title title="Sign In / The Social" />

      <main className="h-screen">
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
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="text"
                      id="email" 
                      placeholder="someone@example.com" 
                      {...register('email', { required: true, pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },})}
                    />
                    {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="password">Password</Label>
                    <div className='relative'>
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        id="password" 
                        placeholder="Enter your password" 
                        {...register('password', { required: true })}
                        />
                      <Button 
                          type="button"
                          onClick={togglePasswordVisibility} 
                          className="absolute top-0.5 right-1 text-gray-500 cursor-pointer bg-transparent hover:bg-transparent"
                          variant='ghost'
                          size='sm'
                          
                          >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                    </div>
                    {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
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