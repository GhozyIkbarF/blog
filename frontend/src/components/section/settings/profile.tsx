import React, { ChangeEvent, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { EDIT_PROFILE } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserData } from "@/Utlis";
import { RootState } from "@/store";
import axios from "axios";
import Title from "@/components/head";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";

interface Inputs {
  name: string;
  username: string;
  email: string;
  password: string;
}

const Profile = () => {
  const { userData } = useSelector((state: RootState) => state.utils);
  const myForm = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(EDIT_PROFILE),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch()
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (userData) {
      setValue('name', userData?.name)
      setValue('username', userData?.username)
      setValue('email', userData?.userEmail)
    }
  }, [userData, setValue]);

  const headers = {
    'Content-Type': 'application/json',
  }

  const onSubmit = async (data: Inputs) => {
    const baseURL = process.env.NEXT_PUBLIC_API_CALL;
    try {
      const res = await axios.patch(`${baseURL}/user/edit/${userData.userId}`, data, { headers })
      if (res) {
        dispatch(setUserData({
          name: res.data.name,
          userId: userData.userId,
          username: res.data.username,
          userEmail: res.data.email,
        }
        ))
        reset();
        router.push('/settings/profile')
        toast({
          title: "Profile updated successfully!",
          duration: 2500,
        })
      }
    } catch (err) {
      setError('password', { type: 'custom', message: 'Password is not correct' })
      toast({
        title: "Failed to update Profile",
        duration: 2500,
      })
    }
  }

  const inputData = [
    {
      label: "Name",
      type: "text",
      id: "name",
      placeholder: "Enter your name",
      desc: "This is the name that will be displayed on your profile.",
      error: errors.name,
      errorMessage: errors.name?.message,
    },
    {
      label: "Username",
      type: "text",
      id: "username",
      placeholder: "Enter your username",
      desc: "This is your public display name. It can be your real name or a pseudonym.",
      error: errors.username,
      errorMessage: errors.username?.message,
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      placeholder: "someone@example.com",
      desc: "This is your email address to login.",
      error: errors.email,
      errorMessage: errors.email?.message,
    },
  ];

  return (
    <>
      <Title title="Profile Settings" />

      <h4>Profile</h4>
      <small className="muted-text">
        This is how others will see you on the site.
      </small>
      <Separator className="my-6" />
      <form ref={myForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-5">
          {inputData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <Label htmlFor={item.id} className="after:content-['*'] after:text-red-500">{item.label}{" "}</Label>
              <Input
                type={item.type}
                id={item.id}
                {...register(item.id as "name" | "username" | "email")}
                className="mt-2"
                placeholder={item.placeholder}
                autoComplete="on"
              />
              {item.error
                ? <small className="muted-text text-red-500 mt-1">{item.errorMessage}</small>
                : <small className="muted-text mt-1">{item.desc}</small>}
            </div>
          ))}
          <div className="flex flex-col">
            <Label
              htmlFor="password"
              className="after:content-['*'] after:text-red-500"
            >
              Password{" "}
            </Label>
            <Input type="password" id="password" {...register('password')} className="mt-2" placeholder="Enter your password" />
            {errors.password
              ? <small className="muted-text text-red-500 mt-1">{errors.password?.message}</small>
              : <small className="muted-text mt-1">Enter your password to confirm changes.</small>}
          </div>
        </div>
        <Button type="submit" className="mt-6">Update Profile</Button>
      </form>
    </>
  );
};

export default Profile;
