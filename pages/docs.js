import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Docs() {
  useEffect(() => {
    // Initialize chat widget when component mounts
    if (typeof window !== 'undefined' && window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: '/api/chat',
        clientId: 'default',
        primaryColor: '#0078ff',
        welcomeMessage: 'שלום! אשמח לעזור לך בשאלות לגבי המערכת.'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>תיעוד | מערכת GPT-Chat לאתרי עסקים</title>
        <meta name="description" content="תיעוד מפורט למערכת צ'אט חכם מבוססת GPT להטמעה באתרי אינטרנט של עסקים" />
      </Head>

      <header className="bg-primary text-white py-6">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">GPT-Chat</h1>
            <nav>
              <ul className="flex space-x-6 space-x-reverse">
                <li><Link href="/" className="hover:underline">דף הבית</Link></li>
                <li><Link href="/demo" className="hover:underline">הדגמה</Link></li>
                <li><Link href="/docs" className="hover:underline font-bold">תיעוד</Link></li>
                <li><Link href="/manage" className="hover:underline">ניהול</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">תיעוד מערכת GPT-Chat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-8">
                  <nav className="card">
                    <h3 className="text-lg font-bold mb-4">תוכן עניינים</h3>
                    <ul className="space-y-2">
                      <li><a href="#overview" className="text-primary hover:underline">סקירה כללית</a></li>
                      <li><a href="#installation" className="text-primary hover:underline">התקנה והטמעה</a></li>
                      <li><a href="#configuration" className="text-primary hover:underline">הגדרות והתאמה אישית</a></li>
                      <li><a href="#minds" className="text-primary hover:underline">ניהול "מוחות"</a></li>
                      <li><a href="#api" className="text-primary hover:underline">תיעוד API</a></li>
                      <li><a href="#faq" className="text-primary hover:underline">שאלות נפוצות</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              
              <div className="md:col-span-3 space-y-8">
                <section id="overview" className="card">
                  <h3 className="text-2xl font-bold mb-4">סקירה כללית</h3>
                  <p className="mb-4">
                    מערכת GPT-Chat מאפשרת לעסקים להטמיע צ'אט חכם באתר האינטרנט שלהם, המותאם אישית לאופי העסק ולצרכיו. 
                    המערכת מורכבת משני חלקים עיקריים:
                  </p>
                  <ol className="list-decimal list-inside mr-6 mb-4">
                    <li className="mb-2"><strong>Backend API</strong> - שרת המתקשר עם OpenAI ומנהל את ה"מוחות" המותאמים אישית לכל עסק.</li>
                    <li><strong>Frontend Widget</strong> - רכיב JavaScript להטמעה באתר, המספק ממשק משתמש לצ'אט.</li>
                  </ol>
                  <p>
                    כל עסק מקבל "מוח" ייחודי משלו (System Prompt מותאם אישית) המנחה את ה-GPT כיצד לדבר עם המשתמשים של אותו עסק.
                  </p>
                </section>

                <section id="installation" className="card">
                  <h3 className="text-2xl font-bold mb-4">התקנה והטמעה</h3>
                  <p className="mb-4">להטמעת הצ'אט באתר שלך, הוסף את הקוד הבא לפני תג הסגירה של <code>&lt;/body&gt;</code>:</p>
                  <div className="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto text-left" dir="ltr">
                    <pre>{`<!-- שילוב ה-Widget -->
<script src="https://gpt-chat-website.vercel.app/widget.js"></script>
<script>
  // אתחול ה-Widget עם הגדרות מותאמות אישית
  document.addEventListener('DOMContentLoaded', function() {
    GPTChatWidget.init({
      apiUrl: 'https://gpt-chat-website.vercel.app/api/chat',
      clientId: 'your_client_id', // מזהה הלקוח שלך
      primaryColor: '#0078ff', // צבע ראשי לפי העיצוב של האתר
      welcomeMessage: 'שלום! במה אוכל לעזור לך היום?'
    });
  });
</script>`}</pre>
                  </div>
                  <p>
                    החלף את <code>your_client_id</code> במזהה הלקוח שלך. אם לא הוגדר מזהה, המערכת תשתמש ב"מוח" ברירת המחדל.
                  </p>
                </section>

                <section id="configuration" className="card">
                  <h3 className="text-2xl font-bold mb-4">הגדרות והתאמה אישית</h3>
                  <p className="mb-4">ניתן להתאים את ה-Widget באמצעות הפרמטרים הבאים:</p>
                  <div className="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto text-left" dir="ltr">
                    <pre>{`GPTChatWidget.init({
  apiUrl: 'https://gpt-chat-website.vercel.app/api/chat', // כתובת ה-API
  clientId: 'your_client_id', // מזהה הלקוח
  position: 'bottom-right', // מיקום הצ'אט: 'bottom-right' או 'bottom-left'
  primaryColor: '#0078ff', // צבע ראשי
  secondaryColor: '#f0f4f8', // צבע משני
  headerText: 'שאל/י אותנו', // טקסט בכותרת הצ'אט
  placeholderText: 'הקלד/י הודעה...', // טקסט בשדה הקלט
  welcomeMessage: 'שלום! במה אוכל לעזור לך היום?', // הודעת פתיחה
  logoUrl: 'https://your-domain.com/logo.png', // לוגו מותאם אישית (אופציונלי)
  autoOpen: false // האם לפתוח את הצ'אט אוטומטית בטעינת העמוד
});`}</pre>
                  </div>
                </section>

                <section id="minds" className="card">
                  <h3 className="text-2xl font-bold mb-4">ניהול "מוחות"</h3>
                  <p className="mb-4">
                    כל "מוח" מוגדר כקובץ JSON עם המבנה הבא:
                  </p>
                  <div className="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto text-left" dir="ltr">
                    <pre>{`{
  "name": "שם העסק",
  "description": "תיאור קצר של העסק",
  "systemPrompt": "אתה עוזר וירטואלי של [שם העסק]. דבר בעברית בטון [סגנון מתאים]. עזור ללקוחות בשאלות לגבי [תחומי העסק]. [מידע נוסף על העסק, שעות פעילות, מבצעים, וכו'].",
  "createdAt": "תאריך היצירה",
  "updatedAt": "תאריך העדכון האחרון"
}`}</pre>
                  </div>
                  <p className="mb-4">
                    ניתן לנהל את ה"מוחות" באמצעות ממשק הניהול או באמצעות ה-API.
                  </p>
                  <p>
                    <Link href="/manage" className="btn-primary inline-block">עבור לממשק הניהול</Link>
                  </p>
                </section>

                <section id="api" className="card">
                  <h3 className="text-2xl font-bold mb-4">תיעוד API</h3>
                  <h4 className="text-xl font-bold mb-2">צ'אט</h4>
                  <div className="mb-4">
                    <p className="font-bold">POST /api/chat</p>
                    <p className="mb-2">שליחת הודעה לצ'אט וקבלת תשובה</p>
                    <p className="mb-2">גוף הבקשה:</p>
                    <div className="bg-gray-800 text-white p-4 rounded-md mb-2 overflow-x-auto text-left" dir="ltr">
                      <pre>{`{
  "message": "שאלה או הודעה מהמשתמש",
  "clientId": "מזהה הלקוח (אופציונלי)"
}`}</pre>
                    </div>
                    <p className="mb-2">תשובה:</p>
                    <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-left" dir="ltr">
                      <pre>{`{
  "reply": "תשובה מה-GPT"
}`}</pre>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold mb-2">ניהול "מוחות"</h4>
                  <div className="mb-4">
                    <p className="font-bold">GET /api/minds</p>
                    <p>קבלת רשימת כל ה"מוחות" הקיימים</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">POST /api/minds</p>
                    <p>יצירת "מוח" חדש</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">PUT /api/minds/:clientId</p>
                    <p>עדכון "מוח" קיים</p>
                  </div>
                  <div>
                    <p className="font-bold">DELETE /api/minds/:clientId</p>
                    <p>מחיקת "מוח"</p>
                  </div>
                </section>

                <section id="faq" className="card">
                  <h3 className="text-2xl font-bold mb-4">שאלות נפוצות</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold">כיצד אני מוסיף לקוח חדש?</h4>
                      <p>השתמש בממשק הניהול או ב-API כדי ליצור "מוח" חדש עם מזהה לקוח ייחודי.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">האם ניתן להתאים את העיצוב של הצ'אט?</h4>
                      <p>כן, ניתן להתאים את הצבעים, הטקסטים והלוגו באמצעות הפרמטרים בעת האתחול.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">האם המערכת תומכת בשפות נוספות?</h4>
                      <p>המערכת מותאמת במיוחד לעברית, אך ניתן להתאים את ה"מוחות" לכל שפה.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">האם יש הגבלה על מספר ההודעות?</h4>
                      <p>ההגבלה היחידה היא מצד OpenAI. המערכת עצמה אינה מגבילה את מספר ההודעות.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 מערכת GPT-Chat. כל הזכויות שמורות.</p>
            </div>
            <div>
              <ul className="flex space-x-6 space-x-reverse">
                <li><Link href="/docs" className="hover:underline">תיעוד</Link></li>
                <li><Link href="/privacy" className="hover:underline">מדיניות פרטיות</Link></li>
                <li><Link href="/contact" className="hover:underline">צור קשר</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Widget script will be loaded here */}
      <script src="/widget.js" />
    </div>
  );
}
