import  StatsCard  from '@/pages/Yoga1/statsard'

export default function NutritionDisplay() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-[1px] rounded-2xl">
        <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
          <div className="aspect-video bg-black/40 rounded-lg flex items-center justify-center">
            <div className="text-amber-400 text-6xl">🍔</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Nutrition Value</span>
              <span className="text-blue-400">8%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8%' }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatsCard value={25} label="Carbs" />
            <StatsCard value={12} label="Oils" />
            <StatsCard value={15} label="Fats" />
          </div>
        </div>
      </div>
    </div>
  )
}

