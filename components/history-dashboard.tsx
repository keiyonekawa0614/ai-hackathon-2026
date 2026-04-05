"use client"

import { useState } from "react"
import { Clock, CheckCircle2, Loader2, AlertCircle, MoreVertical, Trash2, Eye, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Status = "success" | "processing" | "error"

interface HistoryItem {
  id: string
  title: string
  thumbnail: string
  createdAt: Date
  status: Status
  model: string
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    title: "風景画像の分析",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    status: "success",
    model: "Gemini Pro Vision",
  },
  {
    id: "2",
    title: "コード生成リクエスト",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=150&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    status: "success",
    model: "Gemini Pro",
  },
  {
    id: "3",
    title: "データ分析タスク",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    status: "processing",
    model: "Gemini Ultra",
  },
  {
    id: "4",
    title: "テキスト要約",
    thumbnail: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=200&h=150&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "success",
    model: "Gemini Pro",
  },
  {
    id: "5",
    title: "画像生成エラー",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=150&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: "error",
    model: "Gemini Pro Vision",
  },
  {
    id: "6",
    title: "翻訳リクエスト",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=150&fit=crop",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: "success",
    model: "Gemini Pro",
  },
]

const statusConfig: Record<Status, { label: string; icon: React.ElementType; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  success: { label: "成功", icon: CheckCircle2, variant: "default" },
  processing: { label: "処理中", icon: Loader2, variant: "secondary" },
  error: { label: "エラー", icon: AlertCircle, variant: "destructive" },
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "たった今"
  if (minutes < 60) return `${minutes}分前`
  if (hours < 24) return `${hours}時間前`
  return `${days}日前`
}

export function HistoryDashboard() {
  const [history, setHistory] = useState(mockHistory)

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4" />
          履歴 / ダッシュボード
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <div className="flex gap-4 p-4 pt-0">
            {history.map((item) => {
              const StatusIcon = statusConfig[item.status].icon
              return (
                <Card
                  key={item.id}
                  className="w-[240px] shrink-0 overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute right-2 top-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 bg-background/80 backdrop-blur-sm"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            詳細を表示
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            ダウンロード
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="mb-2 truncate font-medium text-sm">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={statusConfig[item.status].variant} className="gap-1">
                        <StatusIcon className={`h-3 w-3 ${item.status === "processing" ? "animate-spin" : ""}`} />
                        {statusConfig[item.status].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 truncate text-xs text-muted-foreground">
                      {item.model}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
