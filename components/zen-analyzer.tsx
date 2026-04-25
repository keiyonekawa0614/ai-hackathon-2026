"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Play, Eye, ThumbsUp, MessageCircle, Calendar, ArrowLeft } from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"

type AppState = "initial" | "loading" | "result"

// Dummy data for the analysis result
const dummyVideoData = {
  title: "【衝撃の結末】これを見たら人生が変わります...最後まで見てください",
  channel: "驚愕チャンネル",
  publishedAt: "2024年3月15日",
  thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=640&h=360&fit=crop",
  views: "1,234,567",
  likes: "45,678",
  comments: "1,234",
}

const dummyRadarData = [
  { subject: "タイトル誇張度", value: 85, fullMark: 100 },
  { subject: "サムネ煽り度", value: 92, fullMark: 100 },
  { subject: "内容乖離度", value: 78, fullMark: 100 },
  { subject: "感情的釣り度", value: 88, fullMark: 100 },
  { subject: "緊急性演出度", value: 70, fullMark: 100 },
]

const dummyScore = 78
const dummyComment = "サムネイルの赤い極太フォントと『衝撃の結末』というタイトルの時点で、再生数を釣ろうとする煩悩が溢れ出ています。内容はただの日常vlogです。心静かにブラウザバックを推奨します。"

function ScoreGauge({ score, isVisible }: { score: number; isVisible: boolean }) {
  const [displayScore, setDisplayScore] = useState(0)
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  useEffect(() => {
    if (!isVisible) return
    
    const duration = 1500
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(score * easeOut))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [score, isVisible])

  const getScoreColor = (s: number) => {
    if (s >= 70) return "text-destructive"
    if (s >= 40) return "text-yellow-600"
    return "text-accent"
  }

  const getScoreLabel = (s: number) => {
    if (s >= 70) return "釣り度: 高"
    if (s >= 40) return "釣り度: 中"
    return "釣り度: 低"
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-52 w-52">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-out ${getScoreColor(displayScore)}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-light ${getScoreColor(displayScore)}`}>
            {displayScore}
          </span>
          <span className="mt-1 text-sm text-muted-foreground">/ 100</span>
        </div>
      </div>
      <Badge variant="secondary" className="mt-4 text-sm font-normal">
        {getScoreLabel(displayScore)}
      </Badge>
    </div>
  )
}

export function ZenAnalyzer() {
  const [state, setState] = useState<AppState>("initial")
  const [url, setUrl] = useState("")

  const handleAnalyze = useCallback(() => {
    if (!url.trim()) return
    setState("loading")
    setTimeout(() => {
      setState("result")
    }, 2500)
  }, [url])

  const handleReset = useCallback(() => {
    setState("initial")
    setUrl("")
  }, [])

  // Initial State - Hero Section
  if (state === "initial") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl animate-fade-in text-center">
          <h1 className="mb-4 text-4xl font-light tracking-tight md:text-5xl">
            ZEN
          </h1>
          <p className="mb-12 text-lg text-muted-foreground">
            最短で、より善い情報を。
          </p>
          
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="YouTubeのURLを入力..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              className="h-14 rounded-2xl border-border/50 bg-card px-6 text-base shadow-sm transition-shadow focus:shadow-md"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!url.trim()}
              className="h-12 w-full rounded-2xl text-base font-normal transition-all hover:shadow-md"
            >
              分析する
            </Button>
          </div>
          
          <p className="mt-12 text-sm text-muted-foreground/60">
            AIが動画の「釣り度」を分析し、<br className="sm:hidden" />
            善なる情報へのアクセスをサポートします
          </p>
        </div>
      </div>
    )
  }

  // Loading State
  if (state === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="animate-fade-in text-center">
          <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin text-accent" />
          <p className="text-lg text-muted-foreground">
            AI（Gemini）が動画の「善」を分析中...
          </p>
        </div>
      </div>
    )
  }

  // Result State - Dashboard
  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleReset}
          className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          新しい分析
        </Button>

        {/* Grid Layout */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Video Info Card */}
          <Card className="animate-fade-in overflow-hidden rounded-2xl shadow-sm">
            <div className="aspect-video overflow-hidden">
              <img
                src={dummyVideoData.thumbnail}
                alt="Video thumbnail"
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h2 className="mb-2 line-clamp-2 text-lg font-medium leading-snug">
                {dummyVideoData.title}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {dummyVideoData.channel}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-normal">
                  <Eye className="mr-1.5 h-3 w-3" />
                  {dummyVideoData.views}回
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  <ThumbsUp className="mr-1.5 h-3 w-3" />
                  {dummyVideoData.likes}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  <MessageCircle className="mr-1.5 h-3 w-3" />
                  {dummyVideoData.comments}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  <Calendar className="mr-1.5 h-3 w-3" />
                  {dummyVideoData.publishedAt}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Score Gauge Card */}
          <Card className="animate-fade-in animate-delay-100 rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-lg font-normal text-muted-foreground">
                総合スコア
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center pb-8">
              <ScoreGauge score={dummyScore} isVisible={state === "result"} />
            </CardContent>
          </Card>

          {/* Radar Chart Card */}
          <Card className="animate-fade-in animate-delay-200 rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-lg font-normal text-muted-foreground">
                5軸分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={dummyRadarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                    />
                    <Radar
                      name="釣り度"
                      dataKey="value"
                      stroke="hsl(var(--accent))"
                      fill="hsl(var(--accent))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Comment Card */}
          <Card className="animate-fade-in animate-delay-300 rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-normal text-muted-foreground">
                AIからのコメント
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-foreground/90">
                {dummyComment}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-sm text-muted-foreground/60">
          ZEN - Powered by Gemini AI
        </p>
      </div>
    </div>
  )
}
