"use client"

import { useState, useCallback } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export function ImageUpload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [creativity, setCreativity] = useState([50])
  const [model, setModel] = useState("gemini-pro")
  const [outputFormat, setOutputFormat] = useState("markdown")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const removeImage = useCallback(() => {
    setUploadedImage(null)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <ImageIcon className="h-4 w-4" />
          画像アップロード & 設定
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isDragging
              ? "border-accent bg-accent/10"
              : "border-muted-foreground/25 hover:border-accent/50"
          }`}
        >
          {uploadedImage ? (
            <div className="relative w-full p-2">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="mx-auto max-h-[140px] rounded-md object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center gap-2 p-6">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                ドラッグ&ドロップ
              </span>
              <span className="text-xs text-muted-foreground/70">
                または クリックして選択
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          )}
        </div>

        <FieldGroup className="space-y-4">
          <Field>
            <FieldLabel>AIモデル</FieldLabel>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="モデルを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
                <SelectItem value="gemini-ultra">Gemini Ultra</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>出力フォーマット</FieldLabel>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger>
                <SelectValue placeholder="フォーマットを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="markdown">Markdown</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="text">プレーンテキスト</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>クリエイティビティ</FieldLabel>
              <span className="text-sm text-muted-foreground">{creativity[0]}%</span>
            </div>
            <Slider
              value={creativity}
              onValueChange={setCreativity}
              max={100}
              step={1}
              className="mt-2"
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
