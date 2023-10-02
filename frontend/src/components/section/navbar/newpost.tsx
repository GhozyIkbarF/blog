import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Globe, ChevronsUpDown, Check, Lock, PenSquare, Image as ImageIcon, X } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setPosts } from "@/Utlis";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";

interface Categories {
  value: string;
  label: string;
}

type modalProps = {
  modalTitle: string;
  modalButton: string;
  children: React.ReactNode;
}

const categories: Categories[] = [
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
];

interface Inputs {
  title: string;
  content: string;
  published: boolean;
  category: string;
  file: FileList | string;
}

const NewPost = () => {
  const dispatch = useDispatch();
  const myItemRef = useRef<HTMLButtonElement | null>(null);
  const maxCharLength = 2500;
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("")
  const [text, setText] = useState("");
  const { userData, posts } = useSelector((state: RootState) => state.utils);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    // resolver: yupResolver(EDIT_PASSWORD),
    defaultValues: {
      title: "",
      content: "",
      published: true,
      category: "",
    },
  });

  const category = watch("category");
  const published = watch("published");
  const file = watch("file");

  const { toast } = useToast();

  useEffect(() => { }, [file]);

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const convertToFormData = (data: Inputs) => {
    const formData = new FormData();
    formData.append("authorId", userData.userId?.toString());
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("published", data.published.toString());
    formData.append("file", data.file[0]);
    return formData;
  };

  const onSubmit = async (data: Inputs) => {
    const baseURL = process.env.NEXT_PUBLIC_API_CALL;
    try {
      const postData = convertToFormData(data);
      const res = await axios.post(`${baseURL}/post`, postData, { headers });
      dispatch(setPosts([res.data, ...posts]))
      reset();
      toast({
        title: "Create new post is success!",
        duration: 2500,
      });
      setText("")
      setPreviewImage("")
      setValue("file", "")
      if (myItemRef.current) myItemRef.current.click();
    } catch (err) {
      console.error(err);
      toast({
        title: "Create new post is failed!",
        duration: 2500,
      });
    }
  };

  const handleSelectedCategory = (value: string) => {
    setValue("category", value);
    setOpen(false);
  };

  const handlePublicPost = () => {
    setValue("published", !published);
  };

  const submitForm = async () => {
    handleSubmit(onSubmit);
  };

  const getPreviewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file))
  }

  const deletePreviewImage = () => {
    setPreviewImage("")
    setValue("file", "")
  }

  const handleText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const countCharacters = (inputText: string) => {
    return inputText.length;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="px-2 font-bold sm:px-4">
          <PenSquare className="sm:mr-2" />
          <span className="hidden sm:inline-block">New Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>New Post</DialogTitle>
            <DialogDescription>What&apos;s on your mind?</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                {...register("title")}
                id="title"
                placeholder="Summarize your thoughts"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex flex-row justify-between">
                <Label htmlFor="content">Paragraph</Label>
                {countCharacters(text) < 2500
                  ? <small className="muted-text">{countCharacters(text)} / {maxCharLength}</small>
                  : <small className="muted-text text-red-500">{countCharacters(text)} / {maxCharLength}</small>}
              </div>
              <Textarea
                className="min-h-[200px]"
                {...register("content")}
                id="content"
                maxLength={2500}
                value={text}
                onChange={handleText}
                placeholder="Write your mind here"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <Label htmlFor={"file"} className="flex flex-col gap-1 items-center justify-center cursor-pointer h-28 w-full text-muted-foreground rounded-md border-2 border-input border-dashed bg-background px-3 py-2 transition-colors hover:border-muted-foreground">
                {previewImage !== ""
                  ? <div className="relative h-full w-full">
                    <Image src={previewImage} className="object-contain" alt="Preview image" fill={true} />
                  </div>
                  : <>
                    <ImageIcon />
                    Add an image
                  </>
                }
              </Label>
              {previewImage !== "" && <Button type="button" variant="destructive" onClick={deletePreviewImage}>Delete Image</Button>}
            </div>
          </div>
          <DialogFooter className="flex-col gap-3 sm:justify-between">
            <div className="flex justify-start gap-2">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handlePublicPost()}
                    >
                      {published ? <Globe /> : <Lock />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {published ? (
                      <p className="text-sm">Everybody can see your post</p>
                    ) : (
                      <p className="text-sm">Only you can see your post</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {category
                      ? categories.find((item) => item.value === category)
                        ?.label
                      : "Category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((item) => (
                        <CommandItem
                          className="cursor-pointer"
                          key={item.value}
                          onSelect={(currentValue) => {
                            handleSelectedCategory(currentValue);
                          }}
                        >
                          <Check
                            className={
                              "mr-2 h-4 w-4 " +
                              (category === item.value
                                ? "opacity-100"
                                : "opacity-0")
                            }
                          />
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div>
                      <Input
                        {...register("file")}
                        type="file"
                        id="file"
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all"
                        accept="image/*"
                        onChange={getPreviewImage}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Add an image
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button type="submit" onClick={() => submitForm}>
              Post
            </Button>
          </DialogFooter>
        </form>
        <DialogClose ref={myItemRef} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog >
  );
};

export default NewPost;
