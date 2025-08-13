// utils/gemini.ts
import { GoogleGenAI } from '@google/genai';
import { toast } from 'react-hot-toast';

export const generateArticle = async (
  title: string,
  desc: string,
  setGeneratingContent: (value: boolean) => void
): Promise<string> => {
  if (!import.meta.env.VITE_GEMINI_AI_KEY) {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(
          `  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum optio maiores ducimus dolore, nisi reprehenderit. Libero, cupiditate dolorem quas esse officia aliquid corporis mollitia et provident facilis nulla repellendus asperiores laudantium veniam magnam exercitationem eaque culpa reprehenderit a animi? Rem perferendis doloremque voluptate porro vitae dolor totam explicabo voluptatem! A, id laudantium reiciendis sequi corporis impedit  `
        );
      }, 2000);
    });
  }
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_AI_KEY,
  });
  try {
    setGeneratingContent(true);
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
    //  'Xatolik yuz berdi.';
    toast.error('Maqola yozishda xatolik!');
    return 'Maqola yozishda xatolik yuz berdi.';
  } finally {
    setGeneratingContent(false);
  }
};
