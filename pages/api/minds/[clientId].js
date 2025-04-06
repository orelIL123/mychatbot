import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { clientId } = req.query;
  
  if (!clientId) {
    return res.status(400).json({ error: 'Client ID is required' });
  }
  
  const mindsDir = path.join(process.cwd(), 'data', 'minds');
  
  // Create minds directory if it doesn't exist
  if (!fs.existsSync(mindsDir)) {
    fs.mkdirSync(mindsDir, { recursive: true });
  }
  
  const mindFilePath = path.join(mindsDir, `${clientId}.json`);
  
  // PUT - Update an existing mind
  if (req.method === 'PUT') {
    try {
      const { name, description, systemPrompt } = req.body;
      
      // Check if mind exists
      let existingData = {};
      if (fs.existsSync(mindFilePath)) {
        existingData = JSON.parse(fs.readFileSync(mindFilePath, 'utf8'));
      } else {
        // For sample minds that might not have a file yet
        const sampleMinds = {
          'restaurant': {
            name: 'מסעדה איטלקית',
            description: 'מוח מותאם למסעדה איטלקית',
            systemPrompt: "אתה עוזר וירטואלי של מסעדה איטלקית בשם 'לה טרטוריה'. דבר בעברית בטון חם, ידידותי ומזמין. עזור ללקוחות בשאלות לגבי התפריט, מרכיבי המנות, אלרגנים, שעות פעילות, הזמנת מקומות, ומבצעים מיוחדים. המסעדה פתוחה בימים א'-ה' בין 12:00-23:00, ובימי שישי-שבת בין 12:00-00:00. המסעדה מציעה מבצע עסקית בצהריים (12:00-17:00) הכולל מנה ראשונה, עיקרית ושתייה ב-79 ש\"ח. תמיד הצע ללקוחות להזמין מקום או לשמוע על המנות המומלצות של השף.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          'law_office': {
            name: 'משרד עורכי דין',
            description: 'מוח מותאם למשרד עורכי דין',
            systemPrompt: "אתה עוזר וירטואלי של משרד עורכי דין 'כהן ושות''. דבר בעברית בטון מקצועי, אמין ומכובד. עזור ללקוחות בשאלות לגבי תחומי ההתמחות של המשרד (דיני משפחה, נדל\"ן, דיני עבודה), תהליכי עבודה, מחירים, ותיאום פגישות ראשוניות. שעות הפעילות הן א'-ה' 9:00-19:00. המשרד מציע פגישת ייעוץ ראשונית בעלות של 250 ש\"ח. הדגש תמיד שהמידע שאתה מספק הוא כללי בלבד ואינו מהווה ייעוץ משפטי מחייב, והצע ללקוחות לתאם פגישת ייעוץ עם עורך דין מהמשרד לקבלת מענה מקיף ומותאם אישית.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          'clothing_store': {
            name: 'חנות בגדים',
            description: 'מוח מותאם לחנות בגדים',
            systemPrompt: "אתה עוזר וירטואלי של חנות הבגדים 'סטייל פלוס'. דבר בעברית בטון אופנתי, צעיר ונלהב. עזור ללקוחות בשאלות לגבי מידות, סגנונות, מחירים, מבצעים, מדיניות החזרות והחלפות. שעות הפעילות הן א'-ה' 10:00-21:00, יום ו' 9:00-15:00, מוצ\"ש מצאת השבת עד 22:00. החנות מציעה כעת מבצע '1+1' על כל פריטי הקולקציה החדשה. הצע ללקוחות להירשם למועדון הלקוחות שמעניק 10% הנחה קבועה והטבות נוספות. תמיד הזכר ללקוחות שניתן להזמין פריטים גם באתר האינטרנט עם משלוח חינם בקנייה מעל 200 ש\"ח.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
        
        if (clientId in sampleMinds) {
          existingData = sampleMinds[clientId];
        } else {
          return res.status(404).json({ error: 'Mind not found' });
        }
      }
      
      const updatedData = {
        ...existingData,
        name: name || existingData.name,
        description: description || existingData.description,
        systemPrompt: systemPrompt || existingData.systemPrompt,
        updatedAt: new Date().toISOString()
      };
      
      fs.writeFileSync(mindFilePath, JSON.stringify(updatedData, null, 2));
      
      res.status(200).json({ success: true, clientId });
    } catch (error) {
      console.error('Error updating mind:', error);
      res.status(500).json({ error: 'Failed to update mind' });
    }
  }
  
  // DELETE - Delete a mind
  else if (req.method === 'DELETE') {
    try {
      if (!fs.existsSync(mindFilePath)) {
        return res.status(404).json({ error: 'Mind not found' });
      }
      
      fs.unlinkSync(mindFilePath);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting mind:', error);
      res.status(500).json({ error: 'Failed to delete mind' });
    }
  }
  
  // GET - Get a specific mind
  else if (req.method === 'GET') {
    try {
      let mindData;
      
      if (fs.existsSync(mindFilePath)) {
        mindData = JSON.parse(fs.readFileSync(mindFilePath, 'utf8'));
      } else {
        // For sample minds that might not have a file yet
        const sampleMinds = {
          'restaurant': {
            name: 'מסעדה איטלקית',
            description: 'מוח מותאם למסעדה איטלקית',
            systemPrompt: "אתה עוזר וירטואלי של מסעדה איטלקית בשם 'לה טרטוריה'. דבר בעברית בטון חם, ידידותי ומזמין. עזור ללקוחות בשאלות לגבי התפריט, מרכיבי המנות, אלרגנים, שעות פעילות, הזמנת מקומות, ומבצעים מיוחדים. המסעדה פתוחה בימים א'-ה' בין 12:00-23:00, ובימי שישי-שבת בין 12:00-00:00. המסעדה מציעה מבצע עסקית בצהריים (12:00-17:00) הכולל מנה ראשונה, עיקרית ושתייה ב-79 ש\"ח. תמיד הצע ללקוחות להזמין מקום או לשמוע על המנות המומלצות של השף.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          'law_office': {
            name: 'משרד עורכי דין',
            description: 'מוח מותאם למשרד עורכי דין',
            systemPrompt: "אתה עוזר וירטואלי של משרד עורכי דין 'כהן ושות''. דבר בעברית בטון מקצועי, אמין ומכובד. עזור ללקוחות בשאלות לגבי תחומי ההתמחות של המשרד (דיני משפחה, נדל\"ן, דיני עבודה), תהליכי עבודה, מחירים, ותיאום פגישות ראשוניות. שעות הפעילות הן א'-ה' 9:00-19:00. המשרד מציע פגישת ייעוץ ראשונית בעלות של 250 ש\"ח. הדגש תמיד שהמידע שאתה מספק הוא כללי בלבד ואינו מהווה ייעוץ משפטי מחייב, והצע ללקוחות לתאם פגישת ייעוץ עם עורך דין מהמשרד לקבלת מענה מקיף ומותאם אישית.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          'clothing_store': {
            name: 'חנות בגדים',
            description: 'מוח מותאם לחנות בגדים',
            systemPrompt: "אתה עוזר וירטואלי של חנות הבגדים 'סטייל פלוס'. דבר בעברית בטון אופנתי, צעיר ונלהב. עזור ללקוחות בשאלות לגבי מידות, סגנונות, מחירים, מבצעים, מדיניות החזרות והחלפות. שעות הפעילות הן א'-ה' 10:00-21:00, יום ו' 9:00-15:00, מוצ\"ש מצאת השבת עד 22:00. החנות מציעה כעת מבצע '1+1' על כל פריטי הקולקציה החדשה. הצע ללקוחות להירשם למועדון הלקוחות שמעניק 10% הנחה קבועה והטבות נוספות. תמיד הזכר ללקוחות שניתן להזמין פריטים גם באתר האינטרנט עם משלוח חינם בקנייה מעל 200 ש\"ח.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
        
        if (clientId in sampleMinds) {
          mindData = sampleMinds[clientId];
        } else {
          return res.status(404).json({ error: 'Mind not found' });
        }
      }
      
      res.status(200).json({ ...mindData, clientId });
    } catch (error) {
      console.error('Error getting mind:', error);
      res.status(500).json({ error: 'Failed to get mind' });
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
