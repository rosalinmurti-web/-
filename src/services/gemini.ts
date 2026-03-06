import { GoogleGenAI, Type } from "@google/genai";
import { ChildProfile, Recommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getPersonalizedRecommendations(child: ChildProfile): Promise<Recommendation[]> {
  const ageInMonths = Math.floor((new Date().getTime() - new Date(child.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  
  const prompt = `作为一名儿科专家，请为一名 ${ageInMonths} 个月大的 ${child.gender === 'boy' ? '男孩' : '女孩'}（名字叫 ${child.name}）提供 3 条个性化建议。
  重点关注发育里程碑、营养和适合该年龄段的活动。请使用中文回答。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              category: { 
                type: Type.STRING,
                enum: ['health', 'education', 'activity', 'milestone']
              }
            },
            required: ["title", "content", "category"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [
      {
        title: "每日阅读",
        content: "花 15 分钟阅读色彩鲜艳的图画书，以刺激语言能力的发展。",
        category: "education"
      },
      {
        title: "趴着玩耍",
        content: "确保定期在监督下进行趴着玩耍，以加强颈部和肩部肌肉。",
        category: "activity"
      }
    ];
  }
}
