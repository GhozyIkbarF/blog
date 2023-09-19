import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  {
    value: "sport",
    label: "Sport",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "fashion",
    label: "Fashion",
  },
  {
    value: "technology",
    label: "Technology",
  },
]

const Search = () => {
  return (
    <Card className="p-3">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button key={category.value} variant="outline" className="rounded-full border-dashed">{category.label}</Button>
          ))}
        </div>
        <Input className="w-60" type="text" name="search" id="search" placeholder="Search..." />
      </div>
    </Card>
  )
}

export default Search