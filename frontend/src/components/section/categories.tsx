import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = [
  {
    value: "all",
    label: "All",
  },
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

const Categories = ({ className }: { className?: string }) => {
  return (
    <div className={`flex gap-2 overflow-x-auto ${className}`}>
      {categories.map((category, index) => (
        <Toggle key={index} variant="outline" aria-label="Toggle category" className="border-dashed">
          {category.label}
        </Toggle>
      ))}
    </div>
  )
}

export default Categories