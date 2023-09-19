import React, { useState } from "react";
import Link from "next/link";
import Title from "@/components/head";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_USER } from "@/validation";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast"

interface Inputs {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);

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
      password: "",
      confirmPassword: "",
    },
  });
  const { toast } = useToast();
  const onSubmit = async (data: Inputs) => {
    try {
      console.log(data);
      toast({
        variant: "default",
        description: "Login success",
        duration: 2500,
      })
      reset();
      clearErrors(["name", "username", "email", "password", "confirmPassword"]);
      router.push('/login')
    } catch (err) {
      console.log(err);
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
      placeholder: "enter your name",
      error: errors.name,
      errorMessage: errors.name?.message,
    },
    {
      label: "Username",
      type: "text",
      id: "username",
      placeholder: "enter your username",
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
      label: "Password",
      type: "password",
      id: "password",
      placeholder: "enter your password",
      error: errors.password,
      errorMessage: errors.password?.message,
    },
    {
      label: "Confirm password",
      type: "password",
      id: "confirmPassword",
      placeholder: "enter your confirm password",
      error: errors.confirmPassword,
      errorMessage: errors.confirmPassword?.message,
    },
  ];

  return (
    <>
      <Title title="Sign Up / The Social" />
      <main className="h-screen">
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
                      <Label htmlFor="email">{item.label}</Label>
                      {item.type !== "password" ? (
                        <Input
                          type={item.type}
                          {...register(
                            item.id as
                              | "name"
                              | "username"
                              | "email"
                              | "password"
                              | "confirmPassword",
                            { required: true }
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

                          <Button
                            type="button"
                            onClick={
                              item.id === "password"
                                ? togglePasswordVisibility
                                : toggleConfirmPasswordVisibility
                            }
                            className="absolute top-0.5 right-1 text-gray-500 cursor-pointer bg-transparent hover:bg-transparent"
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
                        </div>
                      )}
                      {item.error && (
                        <p className="text-red-700">{item.errorMessage}</p>
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
