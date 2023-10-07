import React, { ChangeEvent, useRef, useState } from "react";
import Link from "next/link";
import Title from "@/components/head";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Slider } from "@/components/ui/slider"
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_USER } from "@/validation";
import { useRouter } from "next/router";
import axios from 'axios'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import AvatarEditor from "react-avatar-editor";

interface Inputs {
  name: string;
  username: string;
  email: string;
  photo_profile?: File | string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [src, setSrc] = useState("");
  const [preview, setPreview] = useState(""); // value harusnya ambil dari foto di database
  const [cropping, setCropping] = useState(false);
  const [slideValue, setSlideValue] = useState([10]);
  const cropRef = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(CREATE_USER),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      // photo_profile: "",
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
      // const res = await axios.post(`${baseURL}/register`, data, { headers });
      // reset();
      // console.log(res);
      // clearErrors(["name", "username", "email", "photo_profile", "password", "confirmPassword"]);
      // router.push('/login')
      toast({
        title: "Sign Up Success!",
        duration: 2500,
      })
    } catch (err) {
      console.log(err);
      toast({
        title: "Sign Up Failed!",
        duration: 2500,
      })
    }
  };

  const togglePasswordVisibility = (param: string) => {
    if(param === 'password') setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword); 
  };

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSrc(URL.createObjectURL(file));
    setCropping(true);
    console.log(cropping);
  };

  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current?.getImage().toDataURL();
      console.log(dataUrl);
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      const newfile = new File([blob], "file5645456.webp", { type: 'image/webp' });
      setPreview(URL.createObjectURL(blob));
      setValue("photo_profile", newfile)
      setCropping(false);
    }
  };

  const handleCancelCropping = () => {
    setPreview("")
    setSrc("")
    setCropping(false)
  }

  const deleteAvatar = () => {
    setPreview("") 
    // setValue("file", )
  }

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
      type: "file",
      id: "photo_profile",
      placeholder: "Upload your avatar",
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
      <Title title="Sign Up" />

      <main className="min-h-screen">
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
                      {item.type !== "password" && item.type !== "file"
                        ? <Input
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
                          autoComplete="on"
                        />
                        : item.type === "password" ?
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
                                // | "photo_profile"
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
                          : <div className="">
                            {preview &&
                              <div className="grid">
                                <Avatar className="justify-self-center w-44 h-44">
                                  <AvatarImage src={preview} />
                                  <AvatarFallback className="text-5xl sm:text-7xl">A</AvatarFallback>
                                </Avatar>
                              </div>
                            }
                            {cropping &&
                              <div className="grid">
                                <div className="justify-self-center">
                                  <AvatarEditor
                                    ref={cropRef}
                                    image={src}
                                    width={176}
                                    height={176}
                                    border={0}
                                    borderRadius={150}
                                    color={[0, 0, 0, 0.5]}
                                    scale={slideValue[0] / 10}
                                    rotate={0}
                                  />
                                </div>
                                <div className="my-3 flex flex-row justify-center gap-2">
                                  <Slider min={10} max={100} step={1} name="slider" className="cursor-pointer" value={slideValue} onValueChange={(e) => setSlideValue(e)} />
                                  <Button type="button" onClick={handleSave}>Crop</Button>
                                  <Button type="button" variant="outline" onClick={handleCancelCropping}>Cancel</Button>
                                </div>
                              </div>
                            }
                            {preview && <Button type="button" className="my-3" variant="destructive" onClick={deleteAvatar}>Remove Avatar</Button>}
                            <Input
                              type={item.type}
                              id={item.id}
                              className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all"
                              accept="image/*"
                              {...register(
                                item.id as
                                | "name"
                                | "username"
                                | "email"
                                // | "photo_profile"
                                | "password"
                                | "confirmPassword",
                              )}
                              onChange={handleImgChange}
                            />
                          </div>
                      }
                      {item.error && <small className="text-red-500">{item.errorMessage}</small>}
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

      <Toaster />
    </>
  );
};

export default SignUp;
