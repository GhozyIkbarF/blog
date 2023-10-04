import React, { use, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setIsLogin, setUserData } from "@/Utlis";
import { set } from "react-hook-form";

const AvatarProfile = () => {
  const [open, setOpen] = useState(false);
  const { userData } = useSelector((state: RootState) => state.utils);
  const [data, setData] = useState(userData);
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;

  const logout = async () => {
    try {
      const res = await axios.delete(`${baseURL}/logout`, {
        withCredentials: true,
      });
      toast({
        title: "Logout Success!",
        duration: 2500,
      });
      if (res) {
        router.push("/");
        dispatch(setIsLogin(false));
        dispatch(setUserData({
          name: "",
          userEmail: "",
          userId: 0,
          username: "",
          photoProfile: "",
        }))
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Logout Failed!",
        duration: 2500,
      });
    }
  };

  useEffect(() => {
    setData(userData);
  }, [userData])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={data.photoProfile} />
            <AvatarFallback>{data.name?.split('')[0].toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/profile/${data.userId}`)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/settings/profile")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialog open={open} onOpenChange={() => setOpen(true)}>
            <AlertDialogTrigger asChild className="px-2 py-1.5">
              <Button className="w-full justify-start text-red-500 hover:text-red-500" variant="ghost" size="sm">
                <LogOut className="mr-2 h-4 w-4 text-red-500" /> Log Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will logging you out from
                  the app.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" className="w-1/2 sm:w-auto" onClick={() => logout()}>
                  Log Out
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="hidden sm:flex sm:flex-col">
        <h6 className="text-sm">{data.name}</h6>
        <h6 className="text-sm text-muted-foreground">@{data.username}</h6>
      </div>
    </>
  );
};

export default AvatarProfile;
