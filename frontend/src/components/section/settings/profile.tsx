import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface Inputs {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface Res {
  name: string;
  username: string;
  email: string;
}

const Profile = () => {
  const { userData } = useSelector((state: RootState) => state.utils);
  const myForm = useRef<HTMLFormElement | null>(null);
  console.log(myForm);
  
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
  useEffect(() => {
    if(userData){
      setValue('name', userData?.name)
      setValue('username', userData?.username)
      setValue('email', userData?.userEmail)
    }
  },[userData]);
  


  const headers = {
    'Content-Type': 'application/json',
  }
  const onSubmit = async (data: Inputs) => {
    const baseURL = process.env.NEXT_PUBLIC_API_CALL; 
    try{
      const res: Res = await axios.patch(`${baseURL}/user/edit/${userData.userId}`, data, {headers})
      if(res){
        console.log(res);
        dispatch(setUserData({
          name: res.name,
          userId: userData.userId,
          username: res.username,
          userEmail: res.email,
        }
        ))
        reset();
    }
    }catch(err){
      setError('password', { type: 'custom', message: 'password is wrong' })
      console.error(err);
      
    }
  }

  const submitForm = () => {
    if (myForm.current) {
      console.log('submit');
      // myForm.current.submit();
      handleSubmit
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
      <h4>Profile</h4>
      <small className="muted-text">
        This is how others will see you on the site.
      </small>
      <Separator className="my-6" />
      <form ref={myForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-5">
          {inputData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <Label htmlFor={item.label}>{item.label}</Label>
              <Input
                type={item.type}
                id={item.id}
                {...register(item.id as "name" | "username" | "email")}
                className="mt-2"
                placeholder={item.placeholder}
              />
              <small className="muted-text mt-1">{item.desc}</small>
              {item.error && (<small className="text-red-500">{item.errorMessage}</small>)}
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-6">Update Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Type your password below to make changes to your profile. Click
                save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Label
                htmlFor="Password"
                className="after:content-['*'] after:text-red-500"
              >
                Password{" "}
              </Label>
              <Input type="password" id="password" {...register('password')} placeholder="Enter your password" />
              {errors.password && <small className="text-red-500">{errors.password?.message}</small>}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => submitForm() }>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};

export default Profile;
