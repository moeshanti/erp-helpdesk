import { GoogleGenAI } from "@google/genai";

// [NETLIFY FIX] Hardcoded API Key for client-side execution
// In a strict production app, you would proxy this, but for this demo, this enables the AI features.
const API_KEY = 'AIzaSyCqd83Twt8_qo2i5mykb-K-WlSr5cQihxk'; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface ImagePart {
    inlineData: {
        data: string;
        mimeType: string;
    }
}

export const analyzeTicketAttachment = async (
  images: ImagePart[],
  context: string,
  isCreationMode: boolean = false
): Promise<string> => {
  if (!API_KEY) {
    return "Error: Gemini API Key is missing in configuration.";
  }

  try {
    const modelId = 'gemini-2.5-flash'; 
    let promptText = `You are a Senior 1C:Enterprise ERP Expert and Developer. 
    Analyze the provided screenshot(s) which are attachments in a 1C ERP Helpdesk Ticket.
    Context provided by user: "${context}".`;

    if (isCreationMode) {
        promptText += `
        The user is currently attempting to create a ticket.
        
        Please provide your response in the following strict format:
        
        **Suggested Title:** 
        [Write a short, professional ticket subject line here based on the images]

        **Steps to Reproduce:**
        [Deduce probable steps to reproduce this error based on the screen context (e.g. 1. Open 'Sales Order'. 2. Click 'Post'.). Keep it concise.]
        
        **Analysis:**
        [Provide a friendly, concise analysis of the error for the user here. If it's a common error like 'Period Closed', suggest a fix.]
        `;
    } else {
        promptText += `
        These screenshots were added to an existing ticket comment. Provide a deep technical analysis for the ERP support team.
        
        1. **Error Extraction**: Perform OCR to extract exact 1C error codes, message text, and object names (e.g., "Document.Invoice", "Catalog.Partners").
        2. **1C Context**: Identify if this is a platform error (1cv8.exe crash), a configuration error (Managed Forms issue), or a data error (Duplicate Key, Posting Lock).
        3. **Troubleshooting**: Suggest where to check in the 1C Designer or Enterprise mode (e.g., "Check the Event Log (Zhurnal Registratsii)", "Debug the 'Posting' event module", "Check Functional Options").
        4. **Solution**: If possible, suggest a code fix or a data correction step.
        
        Format the output using Markdown with bold headers like "**1C Error Analysis**" and "**Suggested Solution**".`;
    }

    const contents = {
        parts: [
            ...images.map(img => ({ inlineData: img.inlineData })),
            { text: promptText }
        ]
    };

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
    });

    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Failed to analyze the image(s). Please try again later.";
  }
};
