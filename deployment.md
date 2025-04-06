# הוראות פריסה למערכת GPT-Chat

## התקנה על Vercel

### 1. הכנת הפרויקט לפריסה

1. ודא שיש לך חשבון ב-Vercel (https://vercel.com).
2. התקן את ה-CLI של Vercel:
   ```bash
   npm install -g vercel
   ```
3. התחבר ל-Vercel מה-CLI:
   ```bash
   vercel login
   ```

### 2. הגדרת משתני סביבה

1. צור קובץ `.env` בתיקיית ה-backend (העתק מ-`.env.example`):
   ```
   PORT=3000
   OPENAI_API_KEY=your-openai-api-key-here
   ```
2. בפורטל של Vercel, הגדר את משתני הסביבה הבאים:
   - `OPENAI_API_KEY`: מפתח ה-API של OpenAI שלך

### 3. פריסת ה-Backend API

1. עבור לתיקיית ה-backend:
   ```bash
   cd backend
   ```
2. צור קובץ `vercel.json` עם התוכן הבא:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "server.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "/server.js" }
     ]
   }
   ```
3. פרוס את ה-API:
   ```bash
   vercel --prod
   ```
4. שמור את כתובת ה-URL שתתקבל (לדוגמה: `https://gpt-chat-api.vercel.app`).

### 4. עדכון ה-Frontend Widget

1. עדכן את קובץ ה-widget.js עם כתובת ה-API החדשה:
   ```javascript
   const config = {
     apiUrl: 'https://gpt-chat-api.vercel.app/api/chat',
     // שאר ההגדרות...
   };
   ```
2. אם ברצונך לפרוס גם את דף הדוגמה, עדכן גם את ה-URL בקובץ example.html.

### 5. פריסת ה-Frontend (אופציונלי)

1. עבור לתיקיית ה-frontend:
   ```bash
   cd ../frontend
   ```
2. צור קובץ `vercel.json` עם התוכן הבא:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "*.html", "use": "@vercel/static" },
       { "src": "*.js", "use": "@vercel/static" }
     ]
   }
   ```
3. פרוס את ה-frontend:
   ```bash
   vercel --prod
   ```

## הוספת לקוח חדש

### 1. יצירת "מוח" חדש

1. צור קובץ JSON חדש בתיקיית `minds` עם שם הלקוח (לדוגמה: `new_client.json`):
   ```json
   {
     "name": "שם העסק",
     "description": "תיאור קצר של העסק",
     "systemPrompt": "אתה עוזר וירטואלי של [שם העסק]. דבר בעברית בטון [סגנון מתאים]. עזור ללקוחות בשאלות לגבי [תחומי העסק]. [מידע נוסף על העסק, שעות פעילות, מבצעים, וכו'].",
     "createdAt": "2025-04-06T19:00:00.000Z",
     "updatedAt": "2025-04-06T19:00:00.000Z"
   }
   ```
2. העלה את הקובץ לשרת ה-API (לתיקיית `minds`).

### 2. שימוש ב-API להוספת לקוח חדש

לחלופין, ניתן להשתמש ב-API להוספת לקוח חדש:

```bash
curl -X POST https://gpt-chat-api.vercel.app/api/minds \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "new_client",
    "name": "שם העסק",
    "description": "תיאור קצר של העסק",
    "systemPrompt": "אתה עוזר וירטואלי של [שם העסק]. דבר בעברית בטון [סגנון מתאים]. עזור ללקוחות בשאלות לגבי [תחומי העסק]. [מידע נוסף על העסק, שעות פעילות, מבצעים, וכו']."
  }'
```

## שינוי "מוח" ללקוח קיים

### 1. עדכון קובץ ה-JSON

1. ערוך את קובץ ה-JSON של הלקוח בתיקיית `minds`.
2. העלה את הקובץ המעודכן לשרת ה-API.

### 2. שימוש ב-API לעדכון לקוח קיים

לחלופין, ניתן להשתמש ב-API לעדכון לקוח קיים:

```bash
curl -X PUT https://gpt-chat-api.vercel.app/api/minds/client_id \
  -H "Content-Type: application/json" \
  -d '{
    "name": "שם העסק המעודכן",
    "description": "תיאור מעודכן של העסק",
    "systemPrompt": "מוח מעודכן עבור העסק..."
  }'
```

## הטמעת הצ'אט באתר

### 1. הוספת קובץ ה-Widget לאתר

1. העלה את קובץ `widget.js` לשרת האתר שלך או השתמש ב-CDN.

### 2. הוספת קוד ההטמעה לאתר

הוסף את הקוד הבא לפני תג הסגירה של `</body>` בכל עמוד בו תרצה להציג את הצ'אט:

```html
<!-- שילוב ה-Widget -->
<script src="https://your-domain.com/path/to/widget.js"></script>
<script>
  // אתחול ה-Widget עם הגדרות מותאמות אישית
  document.addEventListener('DOMContentLoaded', function() {
    GPTChatWidget.init({
      apiUrl: 'https://gpt-chat-api.vercel.app/api/chat',
      clientId: 'your_client_id', // מזהה הלקוח שלך
      primaryColor: '#0078ff', // צבע ראשי לפי העיצוב של האתר
      welcomeMessage: 'שלום! במה אוכל לעזור לך היום?'
    });
  });
</script>
```

### 3. התאמה אישית של ה-Widget

ניתן להתאים את ה-Widget באמצעות הפרמטרים הבאים:

```javascript
GPTChatWidget.init({
  apiUrl: 'https://gpt-chat-api.vercel.app/api/chat', // כתובת ה-API
  clientId: 'your_client_id', // מזהה הלקוח
  position: 'bottom-right', // מיקום הצ'אט: 'bottom-right' או 'bottom-left'
  primaryColor: '#0078ff', // צבע ראשי
  secondaryColor: '#f0f4f8', // צבע משני
  headerText: 'שאל/י אותנו', // טקסט בכותרת הצ'אט
  placeholderText: 'הקלד/י הודעה...', // טקסט בשדה הקלט
  welcomeMessage: 'שלום! במה אוכל לעזור לך היום?', // הודעת פתיחה
  logoUrl: 'https://your-domain.com/logo.png', // לוגו מותאם אישית (אופציונלי)
  autoOpen: false // האם לפתוח את הצ'אט אוטומטית בטעינת העמוד
});
```
