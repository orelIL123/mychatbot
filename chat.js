import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
});

// Default mind
const DEFAULT_MIND = "אתה עוזר אישי כללי, דבר בעברית בטון נעים, שירותי ומקצועי.";

// Get mind for client
function getMindForClient(clientId) {
  try {
    const mindsDir = path.join(process.cwd(), 'data', 'minds');
    
    // Create minds directory if it doesn't exist
    if (!fs.existsSync(mindsDir)) {
      fs.mkdirSync(mindsDir, { recursive: true });
    }
    
    const mindFilePath = path.join(mindsDir, `${clientId}.json`);
    if (fs.existsSync(mindFilePath)) {
      const mindData = JSON.parse(fs.readFileSync(mindFilePath, 'utf8'));
      return mindData.systemPrompt;
    }
    
    // Check for sample minds
    const sampleMinds = {
      'restaurant': "אתה עוזר וירטואלי של מסעדה איטלקית בשם 'לה טרטוריה'. דבר בעברית בטון חם, ידידותי ומזמין. עזור ללקוחות בשאלות לגבי התפריט, מרכיבי המנות, אלרגנים, שעות פעילות, הזמנת מקומות, ומבצעים מיוחדים. המסעדה פתוחה בימים א'-ה' בין 12:00-23:00, ובימי שישי-שבת בין 12:00-00:00. המסעדה מציעה מבצע עסקית בצהריים (12:00-17:00) הכולל מנה ראשונה, עיקרית ושתייה ב-79 ש\"ח. תמיד הצע ללקוחות להזמין מקום או לשמוע על המנות המומלצות של השף.",
      'law_office': "אתה עוזר וירטואלי של משרד עורכי דין 'כהן ושות''. דבר בעברית בטון מקצועי, אמין ומכובד. עזור ללקוחות בשאלות לגבי תחומי ההתמחות של המשרד (דיני משפחה, נדל\"ן, דיני עבודה), תהליכי עבודה, מחירים, ותיאום פגישות ראשוניות. שעות הפעילות הן א'-ה' 9:00-19:00. המשרד מציע פגישת ייעוץ ראשונית בעלות של 250 ש\"ח. הדגש תמיד שהמידע שאתה מספק הוא כללי בלבד ואינו מהווה ייעוץ משפטי מחייב, והצע ללקוחות לתאם פגישת ייעוץ עם עורך דין מהמשרד לקבלת מענה מקיף ומותאם אישית.",
      'clothing_store': "אתה עוזר וירטואלי של חנות הבגדים 'סטייל פלוס'. דבר בעברית בטון אופנתי, צעיר ונלהב. עזור ללקוחות בשאלות לגבי מידות, סגנונות, מחירים, מבצעים, מדיניות החזרות והחלפות. שעות הפעילות הן א'-ה' 10:00-21:00, יום ו' 9:00-15:00, מוצ\"ש מצאת השבת עד 22:00. החנות מציעה כעת מבצע '1+1' על כל פריטי הקולקציה החדשה. הצע ללקוחות להירשם למועדון הלקוחות שמעניק 10% הנחה קבועה והטבות נוספות. תמיד הזכר ללקוחות שניתן להזמין פריטים גם באתר האינטרנט עם משלוח חינם בקנייה מעל 200 ש\"ח."
    };
    
    if (clientId in sampleMinds) {
      return sampleMinds[clientId];
    }
    
    return DEFAULT_MIND;
  } catch (error) {
    console.error(`Error loading mind for client ${clientId}:`, error);
    return DEFAULT_MIND;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, clientId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = getMindForClient(clientId || 'default');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
}
