import React, { use, useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Globe,
  Image as Img,
  ChevronsUpDown,
  Check,
  Lock,
  PenSquare,
  Pencil,
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setPosts } from "@/Utlis";

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

const EditPost = ({ index, className }: { index?: number, className?: string }) => {
  const [open, setOpen] = useState(false);
  const { userData, posts } = useSelector((state: RootState) => state.utils);

  // const btnClose: HTMLElement | null = document.getElementById('btn-close-dialog');

  const dispatch = useDispatch();

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
      const res = await axios.patch(`${baseURL}/post`, postData, { headers });
      console.log(res);
      dispatch(setPosts([res.data, ...posts]))
      reset();
      toast({
        title: "Create new post is success!",
        duration: 2500,
      });
      // btnClose?.click();
    } catch (err) {
      console.error(err);
      toast({
        title: "Create new post is failed!",
        duration: 2500,
      });
    }
  };

  // useEffect(() => {
  //   if(!open) reset();
  // },[open])
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

  const handleEditPost = () => {
    const post = posts[index!];
    setValue("title", post.title);
    setValue("content", post.content);
    setValue("category", post.category);
    setValue("published", post.published);
    setValue("file", post.image);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  type="button" className={`ml-6 mt-3 rounded-full ${className}`} size="icon" variant="ghost" onClick={handleEditPost}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
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
              <Label htmlFor="content">Paragraph</Label>
              <Textarea
                className="min-h-[200px]"
                {...register("content")}
                id="content"
                placeholder="Write your mind here"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:justify-between">
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
                      <p>Everybody can see your post</p>
                    ) : (
                      <p>Only you can see your post</p>
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
                      : "Select category..."}
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
                    <Label htmlFor={"file"}>
                      <Input
                        {...register("file")}
                        type="file"
                        id="file"
                        className="cursor-pointer"
                        accept="image/*"
                      />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add an image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button type="submit" onClick={() => submitForm}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
};

export default EditPost;
