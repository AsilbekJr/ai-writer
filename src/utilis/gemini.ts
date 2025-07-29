// utils/gemini.ts
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_AI_KEY,
});

export const generateArticle = async (
  title: string,
  desc: string
): Promise<string> => {
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Sarlavha: ${title}\nTavsif: ${desc}\n\nShu ma'lumotlarga asoslanib, o‘zbek tilida kirish, asosiy qism va xulosa qismlariga ega bo‘lgan mukammal maqola yozing.`,
            },
          ],
        },
      ],
    });

    // ✅ Yangi strukturada javob:
    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Javob topilmadi.';

    return text;
  } catch (error) {
    console.error('Maqola yozishda xatolik:', error);
    return 'Xatolik yuz berdi.';
  }
};
