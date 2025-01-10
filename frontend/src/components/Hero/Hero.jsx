import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from 'lucide-react'
import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-slate-950"></div>
      <div className="container relative grid min-h-[calc(80vh-3.5rem)] grid-cols-1 items-center gap-15 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
              Your Personal{" "}
              <span className="text-blue-500">AI</span>
              <br />
              <span className="text-blue-500">Healthcare</span>
              <br />
              Companion
            </h1>
            <p className="max-w-[600px] text-slate-400 md:text-xl">
              Experience the future of healthcare with AI-powered yoga training and seamless doctor appointments management.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="text-white">
              Book Appointment
            </Button>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue-500" />
              <span>AI-Powered Yoga</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue-500" />
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue-500" />
              <span>Secure Records</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-12 -top-12 -right-12 -bottom-12 bg-blue-500/5 blur-3xl rounded-[50%]"></div>
          <Card className="relative overflow-hidden bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center">🧘
                  <span className="text-2xl"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-white"> AI Yoga Session</h3>
                  <p className="text-sm text-slate-400">Start your wellness journey</p>
                </div>
              </div>
              <div className="h-32 rounded bg-slate-800/50 flex items-center justify-center text-5xl">🧘</div>
              <div className="mt-4 flex justify-end">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Link to="/start">Try NOW</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

