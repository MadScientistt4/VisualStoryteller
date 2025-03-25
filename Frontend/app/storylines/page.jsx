"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Upload } from "lucide-react"
import { useState } from "react"
import FileManager from "@/components/file-manager"

function DocumentCard({ title, date, type, size }) {
  return (
    <div className="flex items-start gap-4 rounded-lg border bg-white p-4 hover:bg-gray-50">
      <div className="rounded-lg bg-blue-50 p-2">
        <FileText className="h-8 w-8 text-blue-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">{type}</span>
          <span className="text-xs text-gray-500">{size}</span>
        </div>
      </div>
    </div>
  )
}

export default function StorylinesPage() {
  const [documents, setDocuments] = useState([
    { id: 1, title: "The Hero's Journey", date: "Added Mar 15, 2025", type: "DOCX", size: "2.4 MB" },
    { id: 2, title: "Character Profiles", date: "Added Mar 12, 2025", type: "PDF", size: "1.8 MB" },
    { id: 3, title: "World Building Guide", date: "Added Mar 10, 2025", type: "DOCX", size: "3.2 MB" },
    { id: 4, title: "Plot Outline", date: "Added Mar 5, 2025", type: "TXT", size: "512 KB" },
    { id: 5, title: "Dialogue Examples", date: "Added Feb 28, 2025", type: "DOCX", size: "1.1 MB" },
    { id: 6, title: "Research Notes", date: "Added Feb 20, 2025", type: "PDF", size: "4.5 MB" },
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
      const fileExtension = selectedFile.name.split(".").pop().toUpperCase()
      const fileSize = (selectedFile.size / 1024).toFixed(0) + " KB"

      const newDocument = {
        id: documents.length + 1,
        title: selectedFile.name.split(".")[0],
        date: `Added ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
        type: fileExtension,
        size: fileSize,
      }

      setDocuments([newDocument, ...documents])
      setSelectedFile(null)

      // Reset the file input
      const fileInput = document.getElementById("document-upload")
      if (fileInput) fileInput.value = ""
    }
  }

  return (
    <FileManager>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Storylines</h1>
          <div className="flex items-center gap-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Document
            </Button>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="document-upload"
                className="hidden"
                accept=".doc,.docx,.pdf,.txt,.rtf"
                onChange={handleFileChange}
              />
              <label htmlFor="document-upload">
                <Button variant="outline" className="gap-2" as="span" tabIndex={0}>
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              </label>
              {selectedFile && <Button onClick={handleUpload}>Confirm Upload</Button>}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} title={doc.title} date={doc.date} type={doc.type} size={doc.size} />
          ))}
        </div>
      </div>
    </FileManager>
  )
}

