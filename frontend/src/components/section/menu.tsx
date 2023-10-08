import React, { useState, useEffect, use } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Categories from './categories'
import axios from 'axios'
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux'
import { setPosts } from '@/Utlis'
import { useRouter } from 'next/router'

const Menu = () => {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const router = useRouter()
  const id: number | undefined = parseInt(router.query.id as string);
  const [debounceValue] = useDebounce(search, 1500);
  const [categoryValue] = useDebounce(category, 1000);
  const dispatch = useDispatch();

  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const handleSearch = async () => {
    const { data } = await axios.get(`${baseURL}/search-post`, {
      params: {
        search: debounceValue,
        category: categoryValue
      }
    });
    // console.log(data);

    dispatch(setPosts(data))
  };

  useEffect(() => {
    handleSearch()
  }, [debounceValue, categoryValue])

  return (
    <Card className="p-3">
      <div className="flex flex-col-reverse gap-2 justify-between sm:flex-row">
        <Categories onClick={setCategory} />
        <Input
          className="w-full sm:w-60"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </Card>
  )
}

export default Menu