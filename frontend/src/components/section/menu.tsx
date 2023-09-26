import React from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Categories from './categories'

const Menu = () => {
  return (
    <Card className="p-3">
      <div className="flex justify-between">
        <Categories />
        <Input className="w-60" type="text" name="search" id="search" placeholder="Search..." />
      </div>
    </Card>
  )
}

export default Menu