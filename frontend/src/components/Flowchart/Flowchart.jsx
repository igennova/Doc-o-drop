'use client'

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

const MealPlanGenerator = () => {
  const [preferences, setPreferences] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [calories, setCalories] = useState("");
  const [dietType, setDietType] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateMealPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/generate-meal-plan", {
        preferences,
        restrictions,
        calories,
        dietType,
      });
      setMealPlan(response.data.mealPlan);
    } catch (err) {
      setError("Failed to generate the meal plan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderMealPlanCards = () => {
    if (!mealPlan) return null;

    const lines = mealPlan.split("\n");
    const headers = lines[0].split("|").map(header => header.trim());
    const rows = lines.slice(1).map(line => line.split("|").map(cell => cell.trim()));

    const weeklyMeals = rows.reduce((acc, row) => {
      const week = row[0];
      if (!acc[week]) {
        acc[week] = [];
      }
      acc[week].push(row);
      return acc;
    }, {});

    return Object.entries(weeklyMeals).map(([week, meals], weekIndex) => (
      <motion.div
        key={week}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: weekIndex * 0.1 }}
      >
        <Card className="mb-6 bg-gray-700 text-gray-100">
          <CardHeader>
            <CardTitle>{week}</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr>
                  {headers.slice(1).map((header, index) => (
                    <th
                      key={index}
                      className="px-2 py-1 text-left font-semibold text-sm text-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, mealIndex) => (
                  <tr key={mealIndex} className="border-t border-gray-600">
                    {meal.slice(1).map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-2 py-2 text-sm text-gray-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    ));
  };

  return (
    <div className="bg-gray-800 min-h-screen text-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Generate Your Weekly Meal Plan
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto p-6"
      >
        <Card className="bg-gray-700 text-gray-100">
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferences" className="text-gray-300">
                  Meal Preferences
                </Label>
                <Input
                  id="preferences"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g., Vegan, Vegetarian, etc."
                  className="bg-gray-600 text-gray-100 border-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="restrictions" className="text-gray-300">
                  Dietary Restrictions
                </Label>
                <Input
                  id="restrictions"
                  value={restrictions}
                  onChange={(e) => setRestrictions(e.target.value)}
                  placeholder="e.g., Gluten-free, Nut allergy, etc."
                  className="bg-gray-600 text-gray-100 border-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="calories" className="text-gray-300">
                  Caloric Intake
                </Label>
                <Input
                  id="calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="e.g., 2000"
                  className="bg-gray-600 text-gray-100 border-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="dietType" className="text-gray-300">
                  Diet Type
                </Label>
                <Input
                  id="dietType"
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                  placeholder="e.g., Keto, Mediterranean, etc."
                  className="bg-gray-600 text-gray-100 border-gray-500"
                />
              </div>
            </div>
            <Button
              onClick={handleGenerateMealPlan}
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-gray-100"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Meal Plan"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-center text-red-400"
        >
          {error}
        </motion.p>
      )}

      {mealPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Your Generated Meal Plan
          </h2>
          <div className="max-w-4xl mx-auto"> {/* Limit the width and center */}
      {renderMealPlanCards()}
    </div>
        </motion.div>
      )}
    </div>
  );
};

export default MealPlanGenerator;
