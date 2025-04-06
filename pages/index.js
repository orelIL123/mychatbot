import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Initialize chat widget when component mounts
    if (typeof window !== 'undefined' && window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: '/api/chat',
        clientId: 'default',
        primaryColor: '#0078ff',
        welcomeMessage: 'שלום! ברוכים הבאים למערכת GPT-Chat. במה אוכל לעזור לך?'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>מערכת GPT-Chat לאתרי עסקים</title>
        <meta name="description" content="מערכת צ'אט חכם מבוססת GPT להטמעה באתרי אינטרנט של עסקים" />
      </Head>

      <header className="bg-primary text-white py-6">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">GPT-Chat</h1>
            <nav>
              <ul className="flex space-x-6 space-x-reverse">
                <li><Link href="/" className="hover:underline">דף הבית</Link></li>
                <li><Link href="/demo" className="hover:underline">הדגמה</Link></li>
                <li><Link href="/docs" className="hover:underline">תיעוד</Link></li>
                <li><Link href="/manage" className="hover:underline">ניהול</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="py-16 bg-gradient-to-b from-primary/10 to-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">מערכת צ'אט חכם לאתרי עסקים</h2>
              <p className="text-xl mb-8">הוסף צ'אט מבוסס GPT לאתר שלך עם "מוח" מותאם אישית לעסק שלך</p>
              <div className="flex justify-center gap-4">
                <Link href="/demo" className="btn-primary">נסה עכשיו</Link>
                <Link href="/docs" className="btn-secondary">למד עוד</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">יתרונות המערכת</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">מוחות מותאמים אישית</h3>
                <p>התאם את הצ'אט לאופי העסק שלך עם "מוח" ייחודי שמנחה את ה-GPT כיצד לדבר עם הלקוחות שלך.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">התקנה פשוטה</h3>
                <p>הוסף את הצ'אט לאתר שלך בקלות עם קוד JavaScript פשוט, ללא צורך בשינויים מורכבים.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">תמיכה בעברית</h3>
                <p>המערכת מותאמת במיוחד לשפה העברית, כולל תמיכה מלאה ב-RTL ופונטים מותאמים.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">דוגמאות לשימוש</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">מסעדות</h3>
                <p>עזרה בהזמנת מקומות, מידע על התפריט, שעות פעילות ומבצעים מיוחדים.</p>
                <button className="mt-4 text-primary hover:underline" onClick={() => window.GPTChatWidget && window.GPTChatWidget.init({ clientId: 'restaurant' })}>
                  נסה את הצ'אט למסעדות
                </button>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">משרדי עורכי דין</h3>
                <p>מידע על תחומי התמחות, תיאום פגישות ראשוניות ומענה לשאלות משפטיות כלליות.</p>
                <button className="mt-4 text-primary hover:underline" onClick={() => window.GPTChatWidget && window.GPTChatWidget.init({ clientId: 'law_office' })}>
                  נסה את הצ'אט למשרדי עו"ד
                </button>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">חנויות בגדים</h3>
                <p>מידע על מידות, סגנונות, מחירים, מבצעים ומדיניות החזרות והחלפות.</p>
                <button className="mt-4 text-primary hover:underline" onClick={() => window.GPTChatWidget && window.GPTChatWidget.init({ clientId: 'clothing_store' })}>
                  נסה את הצ'אט לחנויות בגדים
                </button>
              </div>
            </div>
          </div>
        </section>
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
