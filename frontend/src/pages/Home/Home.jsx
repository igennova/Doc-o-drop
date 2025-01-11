import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, SpaceIcon as Yoga } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/Hero/Hero';
import FancyNavbar from '@/components/Hero/Navbar';
// import doctor from "@/components/PoseStart/hero.png"
import Page from '../Yoga1/MainYoga';
import PageDoctor from '../Doctor/Doctor';

export default function Home() {
 



  return (
    <>

    <div className=" bg-gray-900">
      <FancyNavbar />
      <HeroSection />
      <Page/>
      
          
      <PageDoctor/>
      </div>
    </>
  );
}
