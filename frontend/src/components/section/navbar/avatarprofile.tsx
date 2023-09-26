import React, { useRef } from "react";
import Link from "next/link";
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

const AvatarProfile = () => {
  const myItemRef = useRef<HTMLButtonElement | null>(null);
  const { userData }  =  useSelector((state: RootState) => state.utils);

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
        title: "Logout is Success!",
        duration: 2500,
      });
      if (res){
        if(myItemRef.current) myItemRef.current.click();
        router.push("/");
        dispatch(setIsLogin(false));
        dispatch(setUserData({
          name: "",          
          userEmail: "",
          userId: 0,
          username: "",
          // photoProfile: "",
        }))
      } 
    } catch (err) {
      console.error(err);
      toast({
        title: "Logout is Failed!",
        duration: 2500,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/yandaagil.png" />
            <AvatarFallback>{userData.name?.split('')[0].toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/profile/settings/profile">
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full justify-start text-red-500 hover:text-red-500"
                variant="ghost"
                size="sm"
              >
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
                <AlertDialogCancel ref={myItemRef}>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={() => logout()}>
                  Log Out
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-col">
        <h6 className="text-sm">{userData.name}</h6>
        <h6 className="text-sm text-muted-foreground">{userData.userEmail}</h6>
      </div>
    </>
  );
};

export default AvatarProfile;
