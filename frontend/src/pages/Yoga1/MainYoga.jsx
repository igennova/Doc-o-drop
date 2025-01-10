import { Activity, BarChart3, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FeatureCard  from '@/pages/Yoga1/YogaCard'
import  YogaDisplay  from '@/pages/Yoga1/YogaDisplay'


export default function Page() {
  return (
    <div className="min-h=[50]-screen bg-gray-900">
   
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">
                AI-Powered Yoga Training
              </h1>
              <h2 className="text-3xl font-semibold text-blue-400">
                Just Like Having a Personal Instructor
              </h2>
            </div>
            
            <div className="space-y-6">
              <FeatureCard
                icon={<Camera className="w-6 h-6 text-blue-400" />}
                title="Real-time Posture Analysis"
                description="Advanced AI monitors and corrects your yoga poses in real-time for perfect form and maximum benefits."
              />
              <FeatureCard
                icon={<Activity className="w-6 h-6 text-blue-400" />}
                title="Personalized Routines"
                description="Custom yoga sequences adapted to your skill level, goals, and progress."
              />
              <FeatureCard
                icon={<BarChart3 className="w-6 h-6 text-blue-400" />}
                title="Progress Tracking"
                description="Detailed analytics and progress reports to keep you motivated and improving."
              />
            </div>

            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Your AI Yoga Journey
            </Button>
          </div>

          <YogaDisplay />
        </div>
      </main>
    </div>
  )
}

