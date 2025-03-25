"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import FileManager from "@/components/file-manager"

function ImageCard({ src, title, date }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={src || "/placeholder.svg?height=300&width=400"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  )
}

export default function VisualsPage() {
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Fantasy Castle",
      date: "Added Mar 15, 2025",
      src: "https://polymart-attachments.s3.amazonaws.com/70095384-e8c3-4c7b-bd1d-b3bc0bac535c/default/attachment.png",
    },
    {
      id: 2,
      title: "Dragon Illustration",
      date: "Added Mar 12, 2025",
      src: "https://as2.ftcdn.net/jpg/03/89/67/53/1000_F_389675304_xgTi91JLKsSfvB6f9bEACcE7JLWBGN13.jpg",
    },
    {
      id: 3,
      title: "Forest Landscape",
      date: "Added Mar 10, 2025",
      src: "https://i.pinimg.com/736x/71/8b/1b/718b1b205e0da6a1ca4a9027f9afccea.jpg",
    },
    {
      id: 4,
      title: "Character Concept",
      date: "Added Mar 5, 2025",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6s1VRE1FiUpLmfIueeLDPvrrPJX2hbLH6QQ&s",
    },
    {
      id: 5,
      title: "Magic Portal",
      date: "Added Feb 28, 2025",
      src: "https://w0.peakpx.com/wallpaper/972/171/HD-wallpaper-fantasy-portal-child-magic.jpg",
    },
    {
      id: 6,
      title: "Ancient Map",
      date: "Added Feb 20, 2025",
      src: "https://images.stockcake.com/public/6/1/7/617c8618-f818-4b06-a0ab-4579018ab35f_large/ancient-world-map-stockcake.jpg",
    },
  ])

  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just add it to our local state
      const newImage = {
        id: images.length + 1,
        title: selectedFile.name.split(".")[0],
        date: `Added ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
        src: "/placeholder.svg?height=300&width=400&text=New+Upload",
      }

      setImages([newImage, ...images])
      setSelectedFile(null)

      // Reset the file input
      const fileInput = document.getElementById("image-upload")
      if (fileInput) fileInput.value = ""
    }
  }

  return (
    <FileManager>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Visuals</h1>
          <div className="flex items-center gap-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Visual
            </Button>
            <div className="flex items-center gap-2">
              <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
              <label htmlFor="image-upload">
                <Button variant="outline" className="gap-2" as="span" tabIndex={0}>
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
              </label>
              {selectedFile && <Button onClick={handleUpload}>Confirm Upload</Button>}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Visuals</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <ImageCard key={image.id} src={image.src || "/placeholder.svg"} title={image.title} date={image.date} />
          ))}
        </div>
      </div>
    </FileManager>
  )
}

