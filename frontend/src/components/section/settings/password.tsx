import React, { useState } from "react";
import Title from "@/components/head";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { EDIT_PASSWORD } from "@/validation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, EyeOff } from "lucide-react";

interface Inputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userData } = useSelector((state: RootState) => state.utils);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(EDIT_PASSWORD),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { toast } = useToast();

  const headers = {
    "Content-Type": "application/json",
  };
  const onSubmit = async (data: Inputs) => {
    const baseURL = process.env.NEXT_PUBLIC_API_CALL;
    try {
      const res = await axios.patch(
        `${baseURL}/user/edit/password/${userData.userId}`,
        data,
        { headers }
      );
      if (res) {
        reset();
        toast({
          title: "Password updated successfully",
          duration: 2500,
        });
      }
    } catch (err: any) {
      console.error(err);
      if(err.response.data.oldPassword){
        setError('oldPassword', { type: 'manual', message: 'Old password is not correct' })
      }
      toast({
        title: "Failed to update password",
        duration: 2500,
      });
    }
  };

  const inputData = [
    {
      label: "Old Password",
      id: "oldPassword",
      placeholder: "Enter your old password",
      error: errors.oldPassword,
      errorMessage: errors.oldPassword?.message,
    },
    {
      label: "New Password",
      id: "newPassword",
      placeholder: "Enter your new password",
      error: errors.newPassword,
      errorMessage: errors.newPassword?.message,
    },
    {
      label: "Confirm password",
      id: "confirmPassword",
      placeholder: "Password confirmation",
      error: errors.confirmPassword,
      errorMessage: errors.confirmPassword?.message,
    },
  ];

  return (
    <>
      <Title title="Password Settings" />

      <h4>Password</h4>
      <small className="muted-text">
        This is your secret code to login.
      </small>
      <Separator className="my-6" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-5">
          {inputData.map((item, index) => (
            <div key={index}>
              <Label
                htmlFor={item.id}
                className="after:content-['*'] after:text-red-500"
              >
                {item.label}{" "}
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id={item.id}
                  {...register(
                    item.id as "oldPassword" | "newPassword" | "confirmPassword"
                  )}
                  className="mt-2"
                  placeholder={item.placeholder}
                />
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-0.5 right-0.5 text-muted-foreground cursor-pointer hover:bg-transparent"
                        variant="ghost"
                        size="sm"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {showPassword ? "Hide password" : "Show password"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {item.error && <small className="muted-text text-red-500 mt-1">{item.errorMessage}</small>}
            </div>
          ))}
        </div>
        <Button type="submit" className="mt-6">
          Update Password
        </Button>
      </form>
    </>
  );
};

export default Password;
