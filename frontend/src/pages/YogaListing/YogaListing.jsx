"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Hero/Navbar';

const yogaData = {
    "Mind & Meditation": [
        {
            name: "Padmasana",
            hindiName: "पद्मासन",
            description: "Lotus Pose is the ultimate pose for meditation and mindfulness practices.",
            benefits: ["Calms mind", "Reduces anxiety", "Improves concentration", "Promotes inner peace"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "15-20 minutes",
            level: "Intermediate"
        },
        {
            name: "Sukhasana",
            hindiName: "सुखासन",
            description: "Easy Pose provides a comfortable seated position for meditation and breathing exercises.",
            benefits: ["Reduces mental fatigue", "Improves posture", "Calms nervous system", "Enhances focus"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "10-15 minutes",
            level: "Beginner"
        },
        {
            name: "Vajrasana",
            hindiName: "वज्रासन",
            description: "Diamond Pose aids in digestion and is perfect for meditation after meals.",
            benefits: ["Improves digestion", "Reduces anxiety", "Calms mind", "Strengthens concentration"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "10-20 minutes",
            level: "Beginner"
        },
        {
            name: "Savasana",
            hindiName: "शवासन",
            description: "Corpse Pose is essential for deep relaxation and meditation.",
            benefits: ["Reduces stress", "Improves sleep", "Calms nervous system", "Promotes healing"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "10-15 minutes",
            level: "Beginner"
        }
    ],
    "Core & Abs": [
        {
            name: "Navasana",
            hindiName: "नावासन",
            description: "Boat Pose strengthens the deep core muscles while improving balance.",
            benefits: ["Strengthens abs", "Improves balance", "Tones lower back", "Enhances focus"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "5-10 minutes",
            level: "Intermediate"
        },
        {
            name: "Dhanurasana",
            hindiName: "धनुरासन",
            description: "Bow Pose deeply stretches the core while strengthening the back muscles.",
            benefits: ["Strengthens core", "Improves posture", "Stimulates organs", "Reduces stress"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "3-5 minutes",
            level: "Advanced"
        },
        {
            name: "Chaturanga Dandasana",
            hindiName: "चतुरंग दंडासन",
            description: "Four-Limbed Staff Pose builds core strength and upper body stability.",
            benefits: ["Builds strength", "Improves stability", "Tones arms", "Enhances core"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "2-4 minutes",
            level: "Advanced"
        },
        {
            name: "Paripurna Navasana",
            hindiName: "परिपूर्ण नावासन",
            description: "Full Boat Pose challenges core strength and balance.",
            benefits: ["Deep core workout", "Improves focus", "Builds stamina", "Enhances balance"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "3-5 minutes",
            level: "Intermediate"
        }
    ],
    "Flexibility & Stretching": [
        {
            name: "Uttanasana",
            hindiName: "उत्तानासन",
            description: "Standing Forward Bend stretches the entire back body.",
            benefits: ["Increases flexibility", "Calms mind", "Reduces stress", "Relieves tension"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "3-5 minutes",
            level: "Beginner"
        },
        {
            name: "Kapotasana",
            hindiName: "कपोतासन",
            description: "Pigeon Pose opens hip flexors and stretches deep glutes.",
            benefits: ["Opens hips", "Releases tension", "Improves flexibility", "Calms mind"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "5-7 minutes",
            level: "Intermediate"
        },
        {
            name: "Hanumanasana",
            hindiName: "हनुमानासन",
            description: "Splits Pose demonstrates and builds ultimate flexibility.",
            benefits: ["Extreme flexibility", "Strengthens legs", "Opens hips", "Builds confidence"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "5-8 minutes",
            level: "Advanced"
        },
        {
            name: "Ustrasana",
            hindiName: "उष्ट्रासन",
            description: "Camel Pose opens the entire front body and improves spinal flexibility.",
            benefits: ["Opens chest", "Improves posture", "Increases flexibility", "Energizes body"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "4-6 minutes",
            level: "Intermediate"
        }
    ],
    "Strength & Balance": [
        {
            name: "Bakasana",
            hindiName: "बकासन",
            description: "Crow Pose builds arm strength and improves balance.",
            benefits: ["Builds strength", "Improves balance", "Increases focus", "Builds confidence"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "2-4 minutes",
            level: "Advanced"
        },
        {
            name: "Vrksasana",
            hindiName: "वृक्षासन",
            description: "Tree Pose improves balance and concentration.",
            benefits: ["Enhances balance", "Strengthens legs", "Improves focus", "Builds confidence"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "3-5 minutes",
            level: "Beginner"
        },
        {
            name: "Garudasana",
            hindiName: "गरुडासन",
            description: "Eagle Pose challenges balance while strengthening legs.",
            benefits: ["Improves balance", "Builds strength", "Enhances focus", "Opens joints"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "4-6 minutes",
            level: "Intermediate"
        },
        {
            name: "Sirsasana",
            hindiName: "शीर्षासन",
            description: "Headstand is the king of all yoga poses.",
            benefits: ["Builds strength", "Improves balance", "Increases focus", "Boosts confidence"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "5-10 minutes",
            level: "Advanced"
        }
    ],
    "Breathing & Energy": [
        {
            name: "Pranayama",
            hindiName: "प्राणायाम",
            description: "Breathing exercises to control and direct life force energy.",
            benefits: ["Improves breathing", "Reduces stress", "Increases energy", "Calms mind"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "10-15 minutes",
            level: "All Levels"
        },
        {
            name: "Nadi Shodhana",
            hindiName: "नाडी शोधन",
            description: "Alternate nostril breathing balances the nervous system.",
            benefits: ["Balances energy", "Reduces stress", "Improves focus", "Calms mind"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "5-10 minutes",
            level: "All Levels"
        },
        {
            name: "Bhastrika",
            hindiName: "भस्त्रिका",
            description: "Bellows Breath energizes the body and mind.",
            benefits: ["Increases energy", "Improves focus", "Clears mind", "Boosts metabolism"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "3-5 minutes",
            level: "Intermediate"
        },
        {
            name: "Kapalabhati",
            hindiName: "कपालभाति",
            description: "Skull Shining Breath cleanses and energizes.",
            benefits: ["Cleanses system", "Increases energy", "Improves focus", "Reduces stress"],
            image: "/placeholder.svg?height=200&width=300",
            duration: "5-7 minutes",
            level: "Intermediate"
        }
    ]
};

const YogaListing = () => {
    const [activeTab, setActiveTab] = useState(Object.keys(yogaData)[0]);
    const [isLoading, setIsLoading] = useState(false);

    const handleTabChange = (tab) => {
        setIsLoading(true);
        setActiveTab(tab);
        setTimeout(() => setIsLoading(false), 300);
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Yoga Practices</h1>
                {/* Tabs */}
                <div className="flex justify-center space-x-4 mb-6">
                    {Object.keys(yogaData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`py-2 px-4 rounded-lg text-sm font-medium 
                                ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <p className="text-lg font-medium">Loading...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {yogaData[activeTab].map((yoga, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <img
                                        src={yoga.image}
                                        alt={yoga.name}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />
                                    <h2 className="text-xl font-semibold mb-2">{yoga.name}</h2>
                                    <h3 className="text-sm text-gray-500 mb-2">
                                        {yoga.hindiName}
                                    </h3>
                                    <p className="text-gray-700 mb-3">{yoga.description}</p>
                                    <ul className="text-gray-600 text-sm list-disc pl-5 mb-3">
                                        {yoga.benefits.map((benefit, i) => (
                                            <li key={i}>{benefit}</li>
                                        ))}
                                    </ul>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-bold">Duration:</span> {yoga.duration}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-bold">Level:</span> {yoga.level}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default YogaListing;


