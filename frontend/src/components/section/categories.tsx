import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = [
  {
    value: "",
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

type CategoriesProps = {
  className?: string,
  onClick: (param: string) => void
}

const Categories = ({ className, onClick }: CategoriesProps) => {
  const handleChangeCategory = (param: string) => {
    onClick(param)
  }

  return (
    <div className={`flex gap-2 overflow-x-auto ${className}`}>
      {categories.map((category, index) => (
        <Toggle key={index} variant="outline" aria-label="Toggle category" className="border-dashed" onClick={() => handleChangeCategory(category.value)}>
          {category.label}
        </Toggle>
      ))}
    </div>
  )
}

export default Categories