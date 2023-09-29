import React from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Categories from './categories'

const Menu = () => {
  return (
    <Card className="p-3">
      <div className="flex flex-col-reverse gap-2 justify-between sm:flex-row">
        <Categories />
        <Input className="w-full sm:w-60" type="text" name="search" id="search" placeholder="Search..." />
      </div>
    </Card>
  )
}

export default Menu