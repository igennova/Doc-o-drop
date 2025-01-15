import { Calendar, Clock, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import  {FeatureCard}  from './DoctorCard'
import { AppointmentDisplay } from './DoctorDisplay'
import { Link } from 'react-router-dom'


export default function PageDoctor() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white">
                AI-MEAL PLANNER
              </h1>
              <h2 className="text-3xl font-semibold text-blue-400">
                Efficient Healthcare at Your Fingertips
              </h2>
            </div>
            
            <div className="space-y-6">
              <FeatureCard
                icon={Calendar}
                title="Smart Scheduling"
                description="AI-driven appointment scheduling that considers your preferences and doctor availability."
              />
              <FeatureCard
                icon={Stethoscope}
                title="Virtual Consultations"
                description="Secure video calls with your doctor for convenient check-ups and follow-ups."
              />
              <FeatureCard
                icon={Clock}
                title="Reminders & Follow-ups"
                description="Automated reminders for appointments and medication, ensuring you never miss important health events."
              />
            </div>

            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link to ="/flowchart" > Schedule Your Meal</Link>
             
            </Button>
          </div>

          <AppointmentDisplay />
        </div>
      </main>
    </div>
  )
}

