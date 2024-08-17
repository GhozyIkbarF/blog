import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Title from '@/components/head'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Slider } from "@/components/ui/slider"
import AvatarEditor from "react-avatar-editor";
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/Utlis'
import { useToast } from '@/components/ui/use-toast'

const AvatarSettings = () => {
  const { userData } = useSelector((state: RootState) => state.utils);
  const [src, setSrc] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<Blob | string>("")
  const [cropping, setCropping] = useState(false);
  const [slideValue, setSlideValue] = useState([10]);
  const cropRef = useRef(null);

  const { toast } = useToast();

  const convertToFormData = () => {
    const formData = new FormData();
    if (file !== null && file !== undefined && file !== "") {
      formData.append("file", file);
    }
    return formData
  };

  const dispatch = useDispatch();
  const baseURL = process.env.NEXT_PUBLIC_API_CALL;
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const oldUserData = Object.assign({}, userData);
    try {
      const newPhoto = convertToFormData();
      const { data } = await axios.patch(`${baseURL}/user/edit/photoProfile/${userData.userId}`, newPhoto, { headers })
      oldUserData.photoProfile = data.photo_profile
      dispatch(setUserData(oldUserData))
      toast({
        title: "Profile photo updated successfully",
        duration: 2500,
      });
    } catch (err) {
      toast({
        title: "Update photo profile is failed",
        duration: 2500,
      });
    }
  }
  console.log(userData?.photoProfile);
  
  useEffect(() => {
    if (userData?.photoProfile) {
      setPreview(userData.photoProfile)
      setFile("")
    }
  }, [userData])

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSrc(URL.createObjectURL(file));
    setCropping(true);
  };


  const handleSave = async () => {
    if (cropRef.current) {
      const dataUrl = (cropRef.current as any)?.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      const newfile = new File([blob], "file5645456.webp", { type: 'image/webp' });
      setPreview(URL.createObjectURL(blob));
      setFile(newfile)
      setCropping(false);
    }
  };

  const handleCancelCropping = () => {
    setPreview("")
    setSrc("")
    setCropping(false)
  }

  const deleteAvatar = () => {
    setPreview("")
    setFile("")
  }

  return (
    <>
      <Title title="Avatar Settings" />

      <h4>Avatar</h4>
      <small className="muted-text">
        This is how your avatar look like on the site.
      </small>
      <Separator className="my-6" />
      <form onSubmit={onSubmit}>
        <div className="grid w-full items-center gap-5">
          <div className="grid">
            {!cropping
              ? <Avatar className="justify-self-center w-44 h-44">
                <AvatarImage src={preview} />
                <AvatarFallback className="text-5xl sm:text-7xl">{userData.name?.split('')[0].toLocaleUpperCase()}</AvatarFallback>
              </Avatar>
              : <>
                <div className="justify-self-center">
                  <AvatarEditor
                    ref={cropRef}
                    image={src}
                    width={176}
                    height={176}
                    border={0}
                    borderRadius={150}
                    color={[0, 0, 0, 0.5]}
                    scale={slideValue[0] / 10}
                    rotate={0}
                  />
                </div>
                <div className="mt-3 flex flex-row justify-center gap-2">
                  <Slider min={10} max={100} step={1} name="slider" className="cursor-pointer" value={slideValue} onValueChange={(e) => setSlideValue(e)} />
                  <Button type="button" onClick={handleSave}>Crop</Button>
                  <Button type="button" variant="outline" onClick={handleCancelCropping}>Cancel</Button>
                </div>
              </>
            }
            {preview && <Button type="button" className="mt-3" variant="destructive" onClick={deleteAvatar}>Remove Avatar</Button>}
            <Input
              type="file"
              id="photo_profile"
              className="mt-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all"
              accept="image/*"
              onChange={handleImgChange}
            />
          </div>
        </div>
        <Button type="submit" className="mt-6" disabled={!preview}>Update Avatar</Button>
      </form>
    </>
  )
}

export default AvatarSettings