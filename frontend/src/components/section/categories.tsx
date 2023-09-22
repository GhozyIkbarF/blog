import React from 'react'
import { Toggle } from "@/components/ui/toggle"

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

interface CategoriesProps {
  className?: string;
}

const Categories: React.FC<CategoriesProps> = ({ className }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {categories.map((category, index) => (
        <Toggle key={index} variant="outline" aria-label="Toggle category" className="border-dashed">
          {category.label}
        </Toggle>
      ))}
    </div>
  )
}

export default Categories