import React from 'react'
import { TabsContent } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"

const Password = () => {
  return (
    <TabsContent value="password">
      <h4>Password</h4>
      <small className="muted-text">This is how others will see you on the site.</small>
      <Separator className="my-6" />
      <form>
        <div className="grid w-full items-center gap-5">
          <div>
            <Label htmlFor="OldPassword" className="after:content-['*'] after:text-red-500">Old Password </Label>
            <Input type="password" id="old_password" className="mt-2" placeholder="Enter your old password" />
            <small className="text-red-500">an example of error message</small>
          </div>
          <div>
            <Label htmlFor="NewPassword" className="after:content-['*'] after:text-red-500">New Password </Label>
            <Input type="password" id="new_password" className="mt-2" placeholder="Enter your new password" />
            <small className="text-red-500">an example of error message</small>
          </div>
          <div>
            <Label htmlFor="ConfirmPassword" className="after:content-['*'] after:text-red-500">Confirm Password </Label>
            <Input type="password" id="confirm_password" className="mt-2" placeholder="Password confirmation" />
            <small className="text-red-500">an example of error message</small>
          </div>
        </div>
        <Button type="submit" className="mt-6">
          Update Password
        </Button>
      </form>
    </TabsContent>
  )
}

export default Password