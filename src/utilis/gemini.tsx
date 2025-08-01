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
          `  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum optio maiores ducimus dolore, nisi reprehenderit. Libero, cupiditate dolorem quas esse officia aliquid corporis mollitia et provident facilis nulla repellendus asperiores laudantium veniam magnam exercitationem eaque culpa reprehenderit a animi? Rem perferendis doloremque voluptate porro vitae dolor totam explicabo voluptatem! A, id laudantium reiciendis sequi corporis impedit officia tempore quidem deleniti ullam, expedita asperiores explicabo quisquam odit quaerat est laboriosam facere cupiditate! Autem, consequuntur iste. Magni reprehenderit ipsa voluptatem dicta libero fuga, quos cum, optio consectetur rem ipsam illum magnam nostrum ipsum sequi quas qui explicabo dolorem! Earum iusto impedit quo corporis adipisci perferendis autem nihil ex aut, distinctio qui culpa, cumque architecto molestias fugiat, nobis rem alias minima mollitia soluta sint veniam. Praesentium officia aliquid architecto quod ex quidem veritatis quam suscipit inventore, maiores iste rerum. Soluta quis corporis, iste atque aut minima quas optio tenetur nam rerum delectus aperiam libero beatae animi eveniet obcaecati. Placeat sapiente labore soluta. Illo doloribus magnam reiciendis totam molestiae repellat maiores nemo, enim aperiam velit deserunt in ducimus fuga ex officiis. Architecto dolorum, eos recusandae cumque fugiat voluptate totam vero aspernatur expedita non beatae, nesciunt ea libero, corporis nisi deleniti officia! Aspernatur velit, id nesciunt facilis magni ex necessitatibus omnis expedita repellat eaque quam tempore amet saepe molestiae minima optio voluptas, mollitia reprehenderit ea nulla. Consectetur voluptas id explicabo tenetur nostrum maiores eveniet quas. Officiis quaerat veritatis, maxime minus temporibus culpa error voluptate blanditiis tempore provident assumenda voluptates modi! Vero nisi in est quas pariatur voluptates labore quam esse impedit nemo tempore iusto eligendi consequuntur incidunt quo saepe fuga corrupti, necessitatibus optio eos blanditiis ratione adipisci suscipit. Impedit quis temporibus harum dolor accusamus nostrum deserunt debitis repellat voluptate vitae, nulla quas non recusandae quos aut minus quidem unde est corrupti obcaecati amet perspiciatis ea?`
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
  } finally {
    setGeneratingContent(false);
  }
};
