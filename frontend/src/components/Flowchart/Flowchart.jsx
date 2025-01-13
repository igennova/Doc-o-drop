import React, { useState } from "react";
import axios from "axios";

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

  const renderMealPlanTable = () => {
    if (!mealPlan) return null;

    const lines = mealPlan.split("\n");
    const headers = lines[0].split("|").map(header => header.trim());
    const rows = lines.slice(1).map(line => line.split("|").map(cell => cell.trim()));

    return (
      <table className="table-auto border-collapse w-full mt-6 shadow-lg border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 text-left font-semibold text-gray-700">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 text-gray-600">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Generate Your Weekly Meal Plan</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600">Meal Preferences:</label>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g., Vegan, Vegetarian, etc."
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-600">Dietary Restrictions:</label>
          <input
            type="text"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            placeholder="e.g., Gluten-free, Nut allergy, etc."
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-600">Caloric Intake:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="e.g., 2000"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-600">Diet Type:</label>
          <input
            type="text"
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
            placeholder="e.g., Keto, Mediterranean, etc."
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={handleGenerateMealPlan}
          disabled={loading}
          className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </div>

      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

      {mealPlan && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Generated Meal Plan:</h2>
          {renderMealPlanTable()}
        </div>
      )}
    </div>
  );
};

export default MealPlanGenerator;
