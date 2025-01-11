import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'

import Home from './pages/Home/Home.jsx'
import Yoga from './pages/Yoga/Yoga.jsx'
import About from './pages/About/About.jsx'
import Tutorials from './pages/Tutorials/Tutorials.jsx'

import './App.css'
import { MyPlugin } from './components/test/test.jsx'
import WebcamTest from './pages/Yoga/camera.jsx'
import YogaPoseTrainer from './components/test/Nutrition.jsx'
import NutritionAi from './pages/Nutrition/Nutrition.jsx'


export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/start' element={<Yoga />} />
        <Route path='/about' element={<About />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/camera' element={<WebcamTest></WebcamTest>} />
        <Route path="/nutrition" element={<NutritionAi/>}/>
        
        <Route path='/test' element={<div className="min-h-screen bg-neutral-900 text-white"><MyPlugin/>
          </div>} />
      </Routes>
      </BrowserRouter>
  )
}
