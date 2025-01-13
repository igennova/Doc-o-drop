import { Activity, BarChart3, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FeatureCard  from '@/pages/Yoga1/YogaCard'
import NutritionDisplay from './NutririonDisplay'
import { Link } from 'react-router-dom'


export default function NutritionPage() {
  return (
    <div className="min-h=[50]-screen bg-gray-900">
   
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">
              AI-Powered Nutrition Analysis
              </h1>
              <h2 className="text-3xl font-semibold text-blue-400">
              Just Like Having a Personal Nutritionist
              </h2>
            </div>
            
            <div className="space-y-6">
              <FeatureCard
                icon={<Camera className="w-6 h-6 text-blue-400" />}
                title="Real-time Food Analysis"
                description="Advanced AI identifies food items and provides detailed nutritional information instantly."
              />
              <FeatureCard
                icon={<Activity className="w-6 h-6 text-blue-400" />}
                title="Dietary Recommendations"
                description="Get personalized meal suggestions based on your nutritional goals and preferences."
              />
              <FeatureCard
                icon={<BarChart3 className="w-6 h-6 text-blue-400" />}
                title="Nutrition Tracking"
                description="Track your daily intake and monitor your progress towards your health goals"
              />
            </div>

            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link to= "/nutrition">Start Analysis</Link>
            </Button>
          </div>

          <NutritionDisplay />
        </div>
      </main>
    </div>
  )
}

