import { GoogleGenAI } from "@google/genai";

// [CONFIG] Hardcoded API Key for Browser Support
//const API_KEY = 'AIzaSyBOS9Ziqt5SbmoiPAeVv9UsU2jQvgDFucY'; 
const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface ImagePart {
    inlineData: {
        data: string;
        mimeType: string;
    }
}

// Helper to downscale image if it's too large
const compressImage = async (base64Str: string, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64Str}`;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Get new base64, remove prefix
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(dataUrl.split(',')[1]);
    };
    img.onerror = () => resolve(base64Str); // Fail safe
  });
};

export const analyzeTicketAttachment = async (
  images: ImagePart[],
  context: string,
  isCreationMode: boolean = false
): Promise<string> => {
  if (!API_KEY) {
    return "AI Analysis Unavailable: API Key missing.";
  }

  try {
    // 1. Optimizing Images
    const optimizedImages = await Promise.all(images.map(async (img) => {
        const compressedData = await compressImage(img.inlineData.data);
        return {
            inlineData: {
                data: compressedData,
                mimeType: 'image/jpeg' // Standardize to jpeg
            }
        };
    }));

    const modelId = 'gemini-2.5-flash'; 
    let promptText = `You are a Senior 1C:Enterprise ERP Expert. Analyze the provided screenshot(s). Context: "${context}".`;

    if (isCreationMode) {
        promptText += `
        User is creating a ticket. Response Format:
        **Suggested Title:** [Subject]
        **Steps to Reproduce:** [Concise Steps]
        **Analysis:** [Friendly advice]`;
    } else {
        promptText += `
        Deep technical analysis for ERP support. Format with Markdown headers.`;
    }

    const contents = {
        parts: [
            ...optimizedImages, 
            { text: promptText }
        ]
    };

    const response = await ai.models.generateContent({ model: modelId, contents });
    return response.text || "No analysis generated.";
  } catch (error: any) {
    console.error("Gemini Analysis Error Details:", error);
    // Return the actual error message for debugging
    return `Failed to analyze. Error: ${error.message || error.toString()}`;
  }
};
