# הוראות פריסה לאתר GPT-Chat ב-Vercel

כדי לפרוס את האתר ב-Vercel, עליך לבצע את השלבים הבאים:

## 1. הכנת הקוד לפריסה

1. ודא שכל הקבצים הנדרשים קיימים:
   - `vercel.json` - הגדרות פריסה
   - `next.config.js` - הגדרות Next.js
   - `postcss.config.js` - הגדרות PostCSS
   - `.env.local` - משתני סביבה מקומיים (לא יועלה ל-Vercel)

2. הוסף את מפתח ה-API של OpenAI ל-`.env.local` לבדיקות מקומיות:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```

## 2. העלאת הקוד ל-GitHub

1. צור מאגר חדש ב-GitHub
2. העלה את הקוד למאגר:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/orelil123/gpt-chat-website.git
   git push -u origin main
   ```

## 3. פריסה ב-Vercel

1. התחבר ל-Vercel עם חשבון ה-GitHub שלך (orelil123)
2. לחץ על "New Project"
3. בחר את המאגר `gpt-chat-website`
4. הגדר את משתני הסביבה:
   - `OPENAI_API_KEY`: המפתח שלך ל-OpenAI API
5. לחץ על "Deploy"

## 4. בדיקת האתר המפורס

1. לאחר סיום הפריסה, תקבל כתובת URL לאתר (לדוגמה: `https://gpt-chat-website.vercel.app`)
2. בדוק את הדפים השונים:
   - דף הבית
   - דף הדגמה
   - דף תיעוד
   - דף ניהול
3. בדוק את פונקציונליות הצ'אט עם מוחות שונים

## 5. הגדרת דומיין מותאם אישית (אופציונלי)

1. ב-Vercel, עבור לפרויקט ולחץ על "Settings" > "Domains"
2. הוסף את הדומיין שלך ועקוב אחר ההוראות להגדרת רשומות DNS

## 6. עדכון האתר

1. בצע שינויים מקומיים
2. העלה את השינויים ל-GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Vercel יפרוס אוטומטית את הגרסה החדשה

## הערות חשובות

- ודא שמפתח ה-API של OpenAI מוגדר כראוי ב-Vercel
- אל תעלה את קובץ `.env.local` ל-GitHub (הוא כבר מוגדר ב-.gitignore)
- בדוק את האתר בגרסה המפורסת לפני שיתוף הקישור עם משתמשים
