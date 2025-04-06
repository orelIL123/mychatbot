# מערכת GPT-Chat לאתרי עסקים

מערכת צ'אט מבוססת GPT להטמעה באתרי אינטרנט של עסקים, עם תמיכה ב"מוחות" מותאמים אישית לכל עסק.

## תוכן העניינים

- [סקירה כללית](#סקירה-כללית)
- [מבנה הפרויקט](#מבנה-הפרויקט)
- [התקנה והפעלה](#התקנה-והפעלה)
- [שימוש במערכת](#שימוש-במערכת)
- [הטמעה באתר](#הטמעה-באתר)
- [ניהול "מוחות"](#ניהול-מוחות)
- [פריסה לייצור](#פריסה-לייצור)
- [תמיכה ושאלות נפוצות](#תמיכה-ושאלות-נפוצות)

## סקירה כללית

מערכת GPT-Chat מאפשרת לעסקים להטמיע צ'אט חכם באתר האינטרנט שלהם, המותאם אישית לאופי העסק ולצרכיו. המערכת מורכבת משני חלקים עיקריים:

1. **Backend API** - שרת Node.js המתקשר עם OpenAI ומנהל את ה"מוחות" המותאמים אישית לכל עסק.
2. **Frontend Widget** - רכיב JavaScript להטמעה באתר, המספק ממשק משתמש לצ'אט.

כל עסק מקבל "מוח" ייחודי משלו (System Prompt מותאם אישית) המנחה את ה-GPT כיצד לדבר עם המשתמשים של אותו עסק.

## מבנה הפרויקט

```
gpt-chat-system/
├── backend/
│   ├── minds/                  # תיקיית "מוחות" לעסקים שונים
│   │   ├── restaurant.json     # מוח למסעדה
│   │   ├── law_office.json     # מוח למשרד עורכי דין
│   │   └── clothing_store.json # מוח לחנות בגדים
│   ├── server.js               # שרת ה-API
│   ├── package.json            # הגדרות הפרויקט
│   └── .env.example            # תבנית למשתני סביבה
├── frontend/
│   ├── widget.js               # קוד ה-Widget להטמעה באתרים
│   └── example.html            # דף דוגמה להמחשת השימוש ב-Widget
├── deployment.md               # הוראות פריסה מפורטות
├── todo.md                     # רשימת משימות הפיתוח
└── README.md                   # קובץ זה
```

## התקנה והפעלה

### דרישות מקדימות

- Node.js (גרסה 14 ומעלה)
- מפתח API של OpenAI

### התקנת ה-Backend

1. עבור לתיקיית ה-backend:
   ```bash
   cd backend
   ```

2. התקן את החבילות הנדרשות:
   ```bash
   npm install
   ```

3. צור קובץ `.env` על בסיס `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. ערוך את קובץ `.env` והוסף את מפתח ה-API של OpenAI:
   ```
   PORT=3000
   OPENAI_API_KEY=your-openai-api-key-here
   ```

5. הפעל את השרת:
   ```bash
   npm start
   ```

השרת יפעל בכתובת `http://localhost:3000`.

### בדיקת ה-Frontend

1. עבור לתיקיית ה-frontend:
   ```bash
   cd ../frontend
   ```

2. פתח את קובץ `example.html` בדפדפן או הפעל שרת מקומי:
   ```bash
   npx http-server
   ```

3. גש לכתובת `http://localhost:8080/example.html` בדפדפן.

## שימוש במערכת

### API Endpoints

#### צ'אט

- **POST /api/chat**
  - תיאור: שליחת הודעה לצ'אט וקבלת תשובה
  - גוף הבקשה:
    ```json
    {
      "message": "שאלה או הודעה מהמשתמש",
      "clientId": "מזהה הלקוח (אופציונלי)"
    }
    ```
  - תשובה:
    ```json
    {
      "reply": "תשובה מה-GPT"
    }
    ```

#### ניהול "מוחות"

- **GET /api/minds**
  - תיאור: קבלת רשימת כל ה"מוחות" הקיימים
  - תשובה:
    ```json
    {
      "minds": [
        {
          "clientId": "restaurant",
          "name": "מסעדה איטלקית",
          "description": "מוח מותאם למסעדה איטלקית"
        },
        // ...
      ]
    }
    ```

- **POST /api/minds**
  - תיאור: יצירת "מוח" חדש
  - גוף הבקשה:
    ```json
    {
      "clientId": "מזהה הלקוח",
      "name": "שם העסק",
      "description": "תיאור קצר",
      "systemPrompt": "הנחיות המערכת ל-GPT"
    }
    ```
  - תשובה:
    ```json
    {
      "success": true,
      "clientId": "מזהה הלקוח"
    }
    ```

- **PUT /api/minds/:clientId**
  - תיאור: עדכון "מוח" קיים
  - גוף הבקשה:
    ```json
    {
      "name": "שם העסק המעודכן (אופציונלי)",
      "description": "תיאור מעודכן (אופציונלי)",
      "systemPrompt": "הנחיות מערכת מעודכנות (אופציונלי)"
    }
    ```
  - תשובה:
    ```json
    {
      "success": true,
      "clientId": "מזהה הלקוח"
    }
    ```

- **DELETE /api/minds/:clientId**
  - תיאור: מחיקת "מוח"
  - תשובה:
    ```json
    {
      "success": true
    }
    ```

## הטמעה באתר

להטמעת הצ'אט באתר שלך, הוסף את הקוד הבא לפני תג הסגירה של `</body>`:

```html
<!-- שילוב ה-Widget -->
<script src="path/to/widget.js"></script>
<script>
  // אתחול ה-Widget עם הגדרות מותאמות אישית
  document.addEventListener('DOMContentLoaded', function() {
    GPTChatWidget.init({
      apiUrl: 'https://your-api-url.com/api/chat',
      clientId: 'your_client_id', // מזהה הלקוח שלך
      primaryColor: '#0078ff', // צבע ראשי לפי העיצוב של האתר
      welcomeMessage: 'שלום! במה אוכל לעזור לך היום?'
    });
  });
</script>
```

### אפשרויות התאמה אישית

ניתן להתאים את ה-Widget באמצעות הפרמטרים הבאים:

```javascript
GPTChatWidget.init({
  apiUrl: 'https://your-api-url.com/api/chat', // כתובת ה-API
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

## ניהול "מוחות"

### מבנה "מוח"

כל "מוח" מוגדר כקובץ JSON בתיקיית `minds` עם המבנה הבא:

```json
{
  "name": "שם העסק",
  "description": "תיאור קצר של העסק",
  "systemPrompt": "הנחיות המערכת ל-GPT",
  "createdAt": "תאריך היצירה",
  "updatedAt": "תאריך העדכון האחרון"
}
```

### יצירת "מוח" חדש

1. צור קובץ JSON חדש בתיקיית `minds` עם שם הלקוח (לדוגמה: `new_client.json`).
2. הוסף את התוכן הבא:
   ```json
   {
     "name": "שם העסק",
     "description": "תיאור קצר של העסק",
     "systemPrompt": "אתה עוזר וירטואלי של [שם העסק]. דבר בעברית בטון [סגנון מתאים]. עזור ללקוחות בשאלות לגבי [תחומי העסק]. [מידע נוסף על העסק, שעות פעילות, מבצעים, וכו'].",
     "createdAt": "2025-04-06T19:00:00.000Z",
     "updatedAt": "2025-04-06T19:00:00.000Z"
   }
   ```
3. התאם את התוכן לצרכי העסק.

## פריסה לייצור

ראה את קובץ [deployment.md](deployment.md) להוראות מפורטות על פריסת המערכת לסביבת ייצור באמצעות Vercel.

## תמיכה ושאלות נפוצות

### כיצד אני מוסיף לקוח חדש?

ראה את הסעיף [הוספת לקוח חדש](deployment.md#הוספת-לקוח-חדש) בקובץ deployment.md.

### כיצד אני משנה את ה"מוח" של לקוח קיים?

ראה את הסעיף [שינוי "מוח" ללקוח קיים](deployment.md#שינוי-מוח-ללקוח-קיים) בקובץ deployment.md.

### האם ניתן להתאים את העיצוב של הצ'אט?

כן, ראה את הסעיף [אפשרויות התאמה אישית](#אפשרויות-התאמה-אישית) לעיל.
