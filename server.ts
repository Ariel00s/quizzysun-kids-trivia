import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));

  // Helper to lazy-initialize GoogleGenAI
  const getAIClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please set it in Settings > Secrets.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Route: Smart AI Explainer with Google Search Grounding
  app.post("/api/gemini/explain", async (req, res) => {
    try {
      const { questionText, context, language } = req.body;
      const ai = getAIClient();

      const systemInstruction = language === "he"
        ? "אתה מדריך מדע וידע כללי חברותי לילדים. הסבר את הנושא בצורה פשוטה, מרתקת ומלהיבה. השתמש בשפה פשוטה ונקייה ובסגנון חינוכי, ללא מונחים מסובכים מדי."
        : "You are a friendly science and general knowledge guide for kids. Explain the topic in a simple, highly engaging, and exciting way. Use clean, clear language and an educational, kid-friendly style without overly complex jargon.";

      const prompt = language === "he"
        ? `הסבר לילדים בהרחבה על: "${questionText}". הקשר נוסף: "${context}". אנא השתמש בחיפוש גוגל כדי להביא עובדות מעודכנות ומדויקות ביותר בנושא!`
        : `Explain in detail for kids about: "${questionText}". Additional context: "${context}". Please use Google Search to bring up-to-date, accurate, and exciting facts on this topic!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      // Extract URLs and sources from groundingMetadata
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks
        .map((chunk: any) => {
          if (chunk.web) {
            return {
              title: chunk.web.title || "Source",
              uri: chunk.web.uri,
            };
          }
          return null;
        })
        .filter(Boolean);

      res.json({
        text: response.text || "No response generated.",
        sources,
      });
    } catch (error: any) {
      console.error("Explain API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // API Route: High-Quality Image Generation (gemini-3-pro-image-preview)
  app.post("/api/gemini/generate-image", async (req, res) => {
    try {
      const { prompt, imageSize, aspectRatio } = req.body;
      const ai = getAIClient();

      // Use specified model or fallback
      const modelName = "gemini-3.1-flash-image"; // Safe high-quality default that supports size config

      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio || "1:1",
            imageSize: imageSize || "1K", // '512px', '1K', '2K', '4K'
          },
        },
      });

      let base64Data = "";
      const candidates = response.candidates;
      if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            base64Data = part.inlineData.data;
            break;
          }
        }
      }

      if (!base64Data) {
        throw new Error("No image was returned from the image model.");
      }

      res.json({ imageUrl: `data:image/png;base64,${base64Data}` });
    } catch (error: any) {
      console.error("Image Generation API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // API Route: Background Music Generation (lyria-3-clip-preview / lyria-3-pro-preview)
  app.post("/api/gemini/generate-music", async (req, res) => {
    try {
      const { prompt, trackType } = req.body; // trackType: "short" or "long"
      const ai = getAIClient();

      const modelName = trackType === "long" ? "lyria-3-pro-preview" : "lyria-3-clip-preview";

      // Streaming API is required for Lyria
      const responseStream = await ai.models.generateContentStream({
        model: modelName,
        contents: prompt || "Upbeat children game toy synthesizer background music track, 30 seconds",
      });

      let audioBase64 = "";
      let lyrics = "";
      let mimeType = "audio/wav";

      for await (const chunk of responseStream) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      if (!audioBase64) {
        throw new Error("No audio was returned from the music generation model.");
      }

      res.json({
        audioBase64,
        mimeType,
        lyrics,
      });
    } catch (error: any) {
      console.error("Music Generation API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // API Route: Verify Camera Quest Capture using Gemini Vision
  app.post("/api/gemini/verify-capture", async (req, res) => {
    try {
      const { image, questText, language, gender } = req.body;
      if (!image) {
        throw new Error("No image was provided.");
      }
      
      const ai = getAIClient();

      // Extract raw base64 data and mimeType
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let mimeType = "image/jpeg";
      let base64Data = image;
      
      if (matches && matches.length === 3) {
        mimeType = matches[1];
        base64Data = matches[2];
      }

      const isHe = language === "he";
      const isFemale = gender === "female";

      // Precise instructions for Gemini
      const systemInstruction = isHe
        ? `אתה מורה דרך חברותי ומעודד לילדים במשחק מציאות רבודה. תפקידך לבחון את התמונה שצולמה על ידי הילד ולקבוע האם היא עונה על המשימה הבאה בהצלחה: "${questText}".
הילד שמשחק הוא במין: ${isFemale ? "נקבה" : "זכר"}.
עליך להחזיר תשובה במבנה JSON בלבד עם השדות הבאים:
- "isCorrect": ערך בוליאני (true או false) המציין האם המשימה בוצעה בהצלחה בתמונה (למשל, האם אכן רואים את החפץ בצבע המבוקש, או את הפרצוף המתאים, או את המספר/אות).
- "explanation": הסבר קצר (1-2 משפטים), ידידותי ומעודד בעברית המיועד ישירות לילד.
חשוב מאוד: שים לב להגהה נכונה בעברית של המילים ולשייכות (זכר או נקבה)!
מכיוון שהשחקן הוא ${isFemale ? "בת (נקבה)" : "בן (זכר)"}, עליך לפנות אליה/אליו בהתאם:
- לנקבה (בת): השתמש בפעלים ובכינויים בלשון נקבה, כגון "צדקת!", "הצלחת!", "אלופה!", "מצאת!", "איזו חכמה את!".
- לזכר (בן): השתמש בפעלים ובכינויים בלשון זכר, כגון "צדקת!", "הצלחת!", "אלוף!", "מצאת!", "איזה חכם אתה!".
אל תפנה בשפה מעורבת, והקפד על פנייה נכונה ומכבדת.`
        : `You are a friendly, encouraging guide for kids in a real-world camera game. Your job is to examine the photo taken by the kid and determine if they successfully completed the following quest: "${questText}".
The kid's gender is ${isFemale ? "female" : "male"}.
You must return a JSON response only, with these fields:
- "isCorrect": boolean indicating if they successfully completed the quest (e.g. they captured the correct color, expression, or object).
- "explanation": a short (1-2 sentences), encouraging, and kid-friendly explanation in English addressed directly to the child (e.g. "Awesome! You found a red apple!").`;

      const prompt = `Quest: "${questText}"
Please analyze the attached image and check if it successfully shows what is requested.
Return a JSON object conforming to the instruction.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash", // Excellent for vision and fast responses
        contents: [
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              isCorrect: { type: "BOOLEAN" },
              explanation: { type: "STRING" }
            },
            required: ["isCorrect", "explanation"]
          }
        }
      });

      const responseText = response.text || "{}";
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parsing error on Gemini response:", responseText);
        // Fallback parsing if JSON schema failed for some reason
        const isCorrectMatch = responseText.match(/"isCorrect"\s*:\s*(true|false)/i);
        const isCorrect = isCorrectMatch ? isCorrectMatch[1].toLowerCase() === "true" : false;
        const explanationMatch = responseText.match(/"explanation"\s*:\s*"([^"]+)"/);
        const explanation = explanationMatch ? explanationMatch[1] : (isHe ? "ניסיון יפה! נסה שוב!" : "Nice try! Let's try again!");
        result = { isCorrect, explanation };
      }

      res.json(result);
    } catch (error: any) {
      console.error("Verify Capture API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // Vite development middleware vs Static Production server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
