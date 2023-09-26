import React from "react";
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

interface Inputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Password = () => {
  const { userData } = useSelector((state: RootState) => state.utils);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(EDIT_PASSWORD),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

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
        console.log(res);
        reset();
        toast({
          title: "Password is updated successfully",
          duration: 2500,
        });
      }
    } catch (err) {
      // setError("oldPassword", {
      //   type: "custom",
      //   message: "old password is wrong",
      // });
      console.error(err);
      toast({
        title: "Password is wrong",
        duration: 2500,
      });
    }
  };

  const inputData = [
    {
      label: "Old Password",
      htmlFor: "NewPassword",
      id: "oldPassword",
      placeholder: "Enter your old password",
      error: errors.oldPassword,
      errorMessage: errors.oldPassword?.message,
    },
    {
      label: "New Password",
      htmlFor: "OldPassword",
      id: "newPassword",
      placeholder: "Enter your new password",
      error: errors.newPassword,
      errorMessage: errors.newPassword?.message,
    },
    {
      label: "Confirm password",
      htmlFor: "ConfirmPassword",
      id: "confirmPassword",
      placeholder: "Password confirmation",
      error: errors.confirmPassword,
      errorMessage: errors.confirmPassword?.message,
    },
  ];

  return (
    <>
      <h4>Password</h4>
      <small className="muted-text">
        This is how others will see you on the site.
      </small>
      <Separator className="my-6" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-5">
          {inputData.map((item, index) => (
            <div key={index}>
              <Label
                htmlFor={item.htmlFor}
                className="after:content-['*'] after:text-red-500"
              >
                {item.label}
              </Label>
              <Input
                type="password"
                id={item.id}
                {...register(
                  item.id as "oldPassword" | "newPassword" | "confirmPassword"
                )}
                className="mt-2"
                placeholder={item.placeholder}
              />
              {item.error && (
                <small className="text-red-500">{item.errorMessage}</small>
              )}
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
