import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"

const Profile = () => {
  const inputData = [
    {
      label: "Name",
      type: "text",
      id: "name",
      placeholder: "Enter your name",
      value: "Yanda Agil",
      desc: "This is the name that will be displayed on your profile.",
      error: "an example of error message",
      errorMessage: "an example of error message",
    },
    {
      label: "Username",
      type: "text",
      id: "username",
      placeholder: "Enter your username",
      value: "yandaagil",
      desc: "This is your public display name. It can be your real name or a pseudonym.",
      error: "an example of error message",
      errorMessage: "an example of error message",
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      placeholder: "someone@example.com",
      value: "yandaagil@gmail.com",
      desc: "This is your email address to login.",
      error: "an example of error message",
      errorMessage: "an example of error message",
    }
  ];

  return (
    <>
      <h4>Profile</h4>
      <small className="muted-text">This is how others will see you on the site.</small>
      <Separator className="my-6" />
      <form>
        <div className="grid w-full items-center gap-5">
          {inputData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <Label htmlFor={item.id}>{item.label}</Label>
              <Input type={item.type} id={item.id} className="mt-2" placeholder={item.placeholder} autoComplete="on" />
              <small className="muted-text mt-1">{item.desc}</small>
              {<small className="text-red-500">{item.error}</small> && <small className="text-red-500">{item.errorMessage}</small>}
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-6">
              Update Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Type your password below to make changes to your profile. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Label htmlFor="Password" className="after:content-['*'] after:text-red-500">Password </Label>
              <Input id="password" placeholder="Enter your password" />
              <small className="text-red-500">an example of error message</small>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </>
  )
}

export default Profile