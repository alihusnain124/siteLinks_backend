import config from '../config/config.js';
import { GoogleGenAI } from '@google/genai';
import { errorHandler } from '../utils/responseHandler.js';

class AIService {
  constructor() {
    if (config.gemini.apiKey) {
      this.genAI = new GoogleGenAI({ apiKey: config.gemini.apiKey });
    } else {
      console.warn('Warning: Gemini API key not configured. AI features will be disabled.');
    }
  }

  async generateDescription(title, category, url = null) {
    const prompt = this.createDescriptionPrompt(title, category, url);
    const result = await this.genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const description = result.text;
    const cleanedDescription = description.trim();
    return cleanedDescription;
  }

  createDescriptionPrompt(title, category, url) {
    let prompt = `Generate a compelling and informative description for a website with the following details:\n\n`;
    prompt += `Title: ${title}\n`;
    prompt += `Category: ${category}\n`;

    if (url) {
      prompt += `URL: ${url}\n`;
    }

    prompt += `\nPlease provide a description that:\n`;
    prompt += `1. Is between 50-100 words\n`;
    prompt += `2. Is engaging and informative\n`;
    prompt += `3. Highlights the key features or purpose of the website\n`;
    prompt += `4. Is suitable for a smart link directory\n`;
    prompt += `5. Uses professional language\n`;
    prompt += `6. Does not include any markdown formatting\n`;
    prompt += `\nDescription:`;

    return prompt;
  }
}

export default new AIService();
