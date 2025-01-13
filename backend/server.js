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
if (!process.env.GENERATIVE_AI_API_KEY) {
  console.error('API key is missing. Set GENERATIVE_AI_API_KEY in your environment variables.');
  process.exit(1);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
}

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imagePath = req.file.path;


  try {
  
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


    const mimeType = req.file.mimetype;
    const imagePart = fileToGenerativePart(imagePath, mimeType);

    const result = await model.generateContent([prompt, imagePart]);

    if (!result || !result.response || !result.response.text) {
      throw new Error('Invalid response from the AI model.');
    }


    const nutritionInfo = result.response.text();


    res.json({nutritionInfo})

  } catch (err) {
    console.error('Error generating AI response:', err.message);
    res.status(500).send(`Failed to analyze the image. Error: ${err.message}`);
  }
});
app.post('/generate-meal-plan', async (req, res) => {
  const { preferences, restrictions, calories, dietType } = req.body;

  if (!preferences || !restrictions || !calories || !dietType) {
    return res.status(400).send('Missing required parameters.');
  }

  try {
    const prompt = `
    You are the best meal planer out there so only give meal plan and nothing else
      Generate a weekly meal plan (Sunday to Monday) in a table-like format based on the following:
      - Preferred meals: ${preferences}
      - Dietary restrictions: ${restrictions}
      - Caloric intake: ${calories}
      - Diet type: ${dietType}

      Output the meal plan as follows:

     
      | Day      | Meal 1      | Meal 2      | Meal 3      |
      |----------|-------------|-------------|-------------|
      | Sunday   | [Meal 1]    | [Meal 2]    | [Meal 3]    |
      | Monday   | [Meal 1]    | [Meal 2]    | [Meal 3]    |
      | Tuesday  | [Meal 1]    | [Meal 2]    | [Meal 3]    |
      | Wednesday| [Meal 1]    | [Meal 2]    | [Meal 3]    |
      | Thursday | [Meal 1]    | [Meal 2]    | [Meal 3]    |
      | Friday   | [Meal 1]    | [Meal 2]    | [Meal 3]    |
      | Saturday | [Meal 1]    | [Meal 2]    | [Meal 3]    |
    `;

    // Send the request to the AI model
    const result = await model.generateContent([prompt]);

    // Check the response
    if (!result || !result.response || !result.response.text) {
      throw new Error('Invalid response from the AI model.');
    }

    const mealPlan = result.response.text ? result.response.text() : result.response.text;
    res.json({ mealPlan });

  } catch (err) {
    console.error('Error generating meal plan:', err.message);
    res.status(500).send(`Failed to generate the meal plan. Error: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
