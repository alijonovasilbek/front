
import { GoogleGenAI } from "@google/genai";
import type { Student, Group } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePerformanceSummary = async (student: Student, group: Group): Promise<string> => {
  const prompt = `
    Generate a brief, encouraging performance summary for a youth football player named ${student.name}.
    This summary is for their parents.

    Player Details:
    - Name: ${student.name}
    - Age Group: ${group.name}
    - Coach: ${group.coach}
    - Joined Academy: ${student.joinedDate}
    - Status: ${student.status}

    Performance Statistics (This Season):
    - Goals Scored: ${student.performance.goals}
    - Assists: ${student.performance.assists}
    - Attendance: ${student.performance.attendance}%

    Instructions:
    - Keep the tone positive, professional, and encouraging.
    - Start by highlighting their strengths based on the stats (e.g., goal-scoring prowess, teamwork via assists, dedication via attendance).
    - Mention their potential and the importance of continued practice.
    - Keep it concise, around 3-4 sentences.
    - Do not make up any negative information.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating performance summary:", error);
    return "There was an error generating the performance summary. Please try again later.";
  }
};
