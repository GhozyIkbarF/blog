import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group';

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
  const toggleGroupItemClasses = "h-10 px-3 rounded-md text-sm font-medium ring-offset-background transition-colors border border-dashed border-input bg-transparent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground";

  const handleChangeCategory = (param: string) => {
    onClick(param)
  }

  return (
    <ToggleGroup.Root
      className={`flex gap-2 overflow-x-auto ${className}`}
      type="single"
      defaultValue=""
      aria-label="Text alignment"
    >
      {categories.map((category, index) => (
        <ToggleGroup.Item key={index} className={toggleGroupItemClasses} value={category.value} aria-label={category.label} onClick={() => handleChangeCategory(category.value)}>
          {category.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

export default Categories