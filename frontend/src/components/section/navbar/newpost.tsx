import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Globe, Image as Img, ChevronsUpDown, Check, Lock, PenSquare } from "lucide-react"

interface Categories { value: string; label: string }

const categories: Array<Categories> = [
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

const NewPost = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [publicPost, setPublicPost] = useState<Boolean>(true)

  const handlePublicPost = () => {
    setPublicPost(!publicPost)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold"><PenSquare className="mr-2" /><span>New Post</span></Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
          <DialogDescription>
            What&apos;s on your mind?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-3">
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" id="title" placeholder="Summarize your thoughts" />
          </div>
          <div className="flex flex-col space-y-3">
            <Label htmlFor="content">Paragraph</Label>
            <Textarea className="min-h-[200px]" placeholder="Write your mind here" />
          </div>
        </div>
        <DialogFooter className="flex-col sm:justify-between">
          <div className="flex justify-start gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><Img /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add an image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handlePublicPost}>{publicPost ? <Globe /> : <Lock />}</Button>
                </TooltipTrigger>
                <TooltipContent>
                  {publicPost ? <p>Everybody can see your post</p> : <p>Only you can see your post</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? categories.find((category) => category.value === value)?.label
                    : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        className="cursor-pointer"
                        key={category.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check className={"mr-2 h-4 w-4 " + (value === category.value ? "opacity-100" : "opacity-0")} />
                        {category.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewPost