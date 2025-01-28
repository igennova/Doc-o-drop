'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Upload, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFileDrop } from './useFileDrop';

const NutritionAi = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For showing the uploaded image
  const [nutritionInfo, setNutritionInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const { isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useFileDrop();

  const handleImageChange = (file) => {
    setImage(file);
    setFileName(file.name);
    setImagePreview(URL.createObjectURL(file)); // Generate preview URL
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    setIsLoading(true);
    try {
      const response = await axios.post('https://doc-o-drop.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNutritionInfo(response.data.nutritionInfo);
    } catch (error) {
      console.error('Error uploading image:', error);
      setNutritionInfo('Failed to retrieve nutrition info.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <Card className="w-full max-w-3xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">NutritionAI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className={`flex items-center justify-center w-full ${
                isDragging ? 'border-blue-500' : 'border-gray-600'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, handleImageChange)}
            >
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-8pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files && handleImageChange(e.target.files[0])}
                  accept="image/*"
                />
              </label>
            </div>
            <AnimatePresence>
              {fileName && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-sm text-gray-400 text-center"
                >
                  Selected file: {fileName}
                </motion.p>
              )}
            </AnimatePresence>
            {imagePreview && (
              <div className="w-full flex justify-center">
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="w-full max-h-64 object-contain rounded-md"
                />
              </div>
            )}
            <Button
              onClick={handleUpload}
              disabled={!image || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ChevronRight className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </Button>
            <AnimatePresence>
  {nutritionInfo && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-4"
    >
      <h3 className="text-lg font-semibold mb-2">Nutrition Info:</h3>
      <div className="text-gray-300">
        {/* This will display each food item in a clean format */}
        {nutritionInfo.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionAi;
