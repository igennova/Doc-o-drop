import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// Ensure the GENERATIVE_AI_API_KEY is set in the environment
if (!process.env.GENERATIVE_AI_API_KEY) {
  console.error('API key is missing. Set GENERATIVE_AI_API_KEY in your environment variables.');
  process.exit(1);
}

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to prepare file for generative part
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
}

// Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// Middleware for handling JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle image upload and analysis
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imagePath = req.file.path;
//   const inputText = req.body.input || ''; // Get additional input from form

  try {
    // Define the prompt for the Gemini API
    const prompt = `
 "Analyze the food items in the image and provide the nutritional breakdown for each item. List the food items and provide the following details:

Carbohydrates
Proteins
Fats
Calories
Output the data like this:

[Food Item Name]

Carbohydrates: [X]g
Proteins: [X]g
Fats: [X]g
Calories: [X]
    ...
  `;

    // Prepare the image part
    const mimeType = req.file.mimetype;
    const imagePart = fileToGenerativePart(imagePath, mimeType);

    // Send the image part and prompt to the model
    const result = await model.generateContent([prompt, imagePart]);

    // Ensure the response is valid and contains the expected data
    if (!result || !result.response || !result.response.text) {
      throw new Error('Invalid response from the AI model.');
    }

    // Extract and log the result
    const nutritionInfo = result.response.text();

    // Respond with the analysis
    res.json({nutritionInfo})

  } catch (err) {
    console.error('Error generating AI response:', err.message);
    res.status(500).send(`Failed to analyze the image. Error: ${err.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
