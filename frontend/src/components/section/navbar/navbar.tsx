import React from 'react'
import { Card } from '@/components/ui/card'
import NewPost from './newpost'
import AvatarProfile from './avatarprofile'
import LoginBtn from './loginbtn'

const Navbar = () => {
  return (
    <Card className="p-3">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {/* <LoginBtn /> */}
          <AvatarProfile />
        </div>
        <NewPost />
      </div>
    </Card>
  )
}

export default Navbar