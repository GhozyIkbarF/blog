import React, { ChangeEvent, useRef, useState } from 'react'
import Title from '@/components/head'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Slider } from "@/components/ui/slider"
import AvatarEditor from "react-avatar-editor";
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const AvatarSettings = () => {
  const { userData } = useSelector((state: RootState) => state.utils);
  const [src, setSrc] = useState("");
  const [preview, setPreview] = useState(""); // value harusnya ambil dari foto di database
  const [cropping, setCropping] = useState(false);
  const [slideValue, setSlideValue] = useState([10]);
  const cropRef = useRef(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSrc(URL.createObjectURL(file));
    setCropping(true);
  };

  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current?.getImage().toDataURL();
      console.log(dataUrl);
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      setCropping(false);
    }
  };

  const handleCancelCropping = () => {
    setPreview("") // set value kembali dari foto database
    setSrc("")
    setCropping(false)
    // setValue("file", )
  }

  const deleteAvatar = () => {
    setPreview("") // hapus foto dari database
    // setValue("file", )
  }

  return (
    <>
      <Title title="Avatar Settings" />

      <h4>Avatar</h4>
      <small className="muted-text">
        This is how your avatar look like on the site.
      </small>
      <Separator className="my-6" />
      <form>
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
        <Button type="submit" className="mt-6">Update Avatar</Button>
      </form>
    </>
  )
}

export default AvatarSettings