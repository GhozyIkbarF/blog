import React from 'react'
import Title from '@/components/head'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Login = () => {
  return (
    <>
      <Title title="Sign In / The Social" />

      <main className="h-screen">
        <div className="w-4/5 h-full my-0 py-10 mx-auto flex flex-col items-center justify-center lg:w-11/12 2xl:w-7/12">
          <Card className="w-96 mb-5">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
              <CardDescription className="text-center">Enter your email and password to login.</CardDescription>
            </CardHeader>
            <form>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" name="email" id="email" placeholder="someone@example.com" />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Sign In</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </>
  )
}

export default Login