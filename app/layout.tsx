import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  variable: '--font-noto-sans-jp',
  weight: ['300', '400', '500', '700'],
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'ZEN - 釣り動画判定AI',
  description: '最短で、より善い情報を。YouTubeの「釣り動画」をAIが分析し、善なる情報へのアクセスをサポートします。',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1e' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className="bg-background">
      <body className={`${notoSansJP.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
