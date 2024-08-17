import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Undo2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Categories from '@/components/section/categories'
import ProfilePosts from '@/components/section/content/[id]'
import Title from '@/components/head'
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from 'axios'
import ProfileLoad from '@/components/skeleton/profileload'
import { useDebounce } from 'use-debounce'
import { setPosts } from '@/Utlis'
import { useDispatch } from 'react-redux'

interface DetailedProfile {
  name: string;
  username: string;
  email: string;
  photo_profile: string;
}

const Profile = () => {
  const router = useRouter()
  const id: number | undefined = parseInt(router.query.id as string);
  const [detailProfile, setDetailProfile] = useState<DetailedProfile>();
  const [category, setCategory] = useState<string>("");
  const { userData, accessToken } = useSelector((state: RootState) => state.utils);
  const [isLoading, setLoading] = useState(true);
  const [categoryValue] = useDebounce(category, 1000);
  const dispatch = useDispatch();

  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const getDetailProfile = async (id: number) => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseURL}/user/${id}`);
      setDetailProfile(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!id) return;
    getDetailProfile(id);
  }, [id]);
  
  useEffect(() => { 
    if (!id || isLoading) return;
    handleSearch() 
  }, [categoryValue])

  const handleSearch = async () => {
    const { data } = await axios.get(`${baseURL}/search-post`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        id: id,
        category: categoryValue
      }
    });
    dispatch(setPosts(data))
  };

  useEffect(() => {
    if (!id || isLoading) return;
    handleSearch()
  }, [categoryValue])

  if (isLoading) return <ProfileLoad />;

  return (
    <>
      <Title title={`@${detailProfile?.username} Profile`} />

      <section>
        <Card>
          <section className="flex flex-col">
            <div className="flex flex-row ml-3 mt-3 items-center sm:ml-6">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button className="rounded-full" size="icon" variant="ghost" onClick={() => router.back()}>
                      <Undo2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Back to Previous Page</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <h3 className="ml-3">Profile</h3>
            </div>
            <div className="flex justify-center">
              <CardHeader className="flex flex-row space-y-0 px-3 pt-3 pb-0 sm:px-6 sm:pt-6">
                <Avatar className="w-28 h-28 sm:w-32 sm:h-32">
                  <AvatarImage src={detailProfile?.photo_profile} />
                  <AvatarFallback className="text-3xl sm:text-5xl">{detailProfile?.name.split('')[0].toLocaleUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex flex-col justify-between sm:ml-6">
                  <div className="flex flex-col">
                    <CardTitle className="text-xl line-clamp-1 sm:text-4xl">{detailProfile?.name}</CardTitle>
                    <CardDescription className="[&:not(:first-child)]:mt-0 text-base sm:text-lg">@{detailProfile?.username}</CardDescription>
                  </div>
                  {id === userData?.userId &&
                    <div>
                      <Button variant="secondary" size="sm" onClick={() => router.push("/settings/avatar")}>Edit profile</Button>
                    </div>
                  }
                </div>
              </CardHeader>
            </div>
            <Categories className="p-6 sm:justify-center" onClick={setCategory} />
            <ProfilePosts categoryLabel={categoryValue} />
          </section>
        </Card>
      </section>
    </>
  )
}

export default Profile