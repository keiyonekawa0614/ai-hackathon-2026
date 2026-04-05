import { Header } from "@/components/header"
import { ImageUpload } from "@/components/image-upload"
import { ChatInterface } from "@/components/chat-interface"
import { HistoryDashboard } from "@/components/history-dashboard"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-screen-2xl px-4 py-6">
          {/* Main Content Area - Two Column Layout */}
          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            {/* Left Column: Image Upload & Settings */}
            <div className="order-2 lg:order-1">
              <ImageUpload />
            </div>
            
            {/* Right Column: Chat Interface */}
            <div className="order-1 min-h-[500px] lg:order-2">
              <ChatInterface />
            </div>
          </div>
          
          {/* History / Dashboard Area */}
          <div className="mt-6">
            <HistoryDashboard />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4">
        <div className="container max-w-screen-2xl px-4">
          <p className="text-center text-sm text-muted-foreground">
            AI Hackathon 2026 - Powered by Vertex AI & Firebase
          </p>
        </div>
      </footer>
    </div>
  )
}
