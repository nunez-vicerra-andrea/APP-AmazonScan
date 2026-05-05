import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

export interface AnimalInfo {
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  diet: string;
  conservationStatus: string;
  curiosities: string[];
}

export async function identifyAnimalFromImage(base64Image: string): Promise<AnimalInfo | null> {
  try {
    // Remove data URL prefix if present
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `
      Eres un experto biólogo de la Amazonia. Analiza esta imagen y identifica el animal que aparece.
      Si el animal es de la Amazonia, proporciona la información detallada siguiendo el esquema JSON.
      Si no puedes identificar un animal o el animal NO es de la Amazonia, responde indicando que no es un animal amazónico.
      
      IMPORTANTE: El animal DEBE ser nativo de la cuenca del Amazonas.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: cleanBase64,
                mimeType: "image/jpeg",
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            description: { type: Type.STRING },
            habitat: { type: Type.STRING },
            diet: { type: Type.STRING },
            conservationStatus: { type: Type.STRING },
            curiosities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["name", "scientificName", "description", "habitat", "diet", "conservationStatus", "curiosities"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error identifying animal:", error);
    return null;
  }
}
