import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, FileText, MessageCircle, ChevronDown, User, Activity } from 'lucide-react';

const AIYogaItems = [
  { title: "Personalized Routines", href: "/ai-yoga/personalized-routines", icon: Activity },
  { title: "Pose Analysis", href: "/ai-yoga/pose-analysis", icon: Activity },
  { title: "Virtual Instructor", href: "/ai-yoga/virtual-instructor", icon: Activity },
  { title: "Progress Tracking", href: "/ai-yoga/progress-tracking", icon: Activity },
];

const YogaExperimentalItems = [
  { title: "Mind & Meditation", href: "/yoga", icon: Activity },
  { title: "Strength & Balance", href: "/yoga", icon: Activity },
  { title: "Breathing & Energy", href: "/yoga", icon: Activity }
];

const Navbar = () => {
  const [aiYogaOpen, setAiYogaOpen] = useState(false);
  const [experimentalOpen, setExperimentalOpen] = useState(false);
  const aiYogaRef = useRef(null);
  const experimentalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aiYogaRef.current && !aiYogaRef.current.contains(event.target)) {
        setAiYogaOpen(false);
      }
      if (experimentalRef.current && !experimentalRef.current.contains(event.target)) {
        setExperimentalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAiYogaToggle = () => {
    setAiYogaOpen(!aiYogaOpen);
    setExperimentalOpen(false);
  };

  const handleExperimentalToggle = (e) => {
    e.stopPropagation();
    setExperimentalOpen(!experimentalOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-8 flex">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">Fit Fusion</span>
          </a>
        </div>
        <nav className="flex flex-1 items-center justify-between">
          <ul className="flex space-x-8 text-base font-medium">
            <li>
              <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
            </li>
            <li ref={aiYogaRef} className="relative">
              <button
                onClick={handleAiYogaToggle}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Activity className="w-5 h-5 mr-2" />
                AI Yoga
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {aiYogaOpen && (
                <ul className="absolute left-0 top-full mt-2 w-64 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                  {AIYogaItems.map((item) => (
                    <li key={item.title}>
                      <a href={item.href} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                        <item.icon className="w-5 h-5 mr-2" />
                        {item.title}
                      </a>
                    </li>
                  ))}
                  <li ref={experimentalRef}>
                    <button
                      onClick={handleExperimentalToggle}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <Activity className="w-5 h-5 mr-2" />
                      Specified Yoga
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    </button>
                    {experimentalOpen && (
                      <ul className="absolute left-full top-0 mt-0 w-64 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                        {YogaExperimentalItems.map((item) => (
                          <li key={item.title}>
                            <a href={item.href} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                              <item.icon className="w-5 h-5 mr-2" />
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link href="/appointments" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Calendar className="w-5 h-5 mr-2" />
                Appointments
              </Link>
            </li>
            <li>
              <Link href="/records" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <FileText className="w-5 h-5 mr-2" />
                Records
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact
              </Link>
            </li>
          </ul>
          <button className="flex items-center rounded-full bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            <User className="w-5 h-5 mr-2" />
            Login
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

