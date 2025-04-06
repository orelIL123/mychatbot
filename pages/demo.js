import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Demo() {
  const [activeClient, setActiveClient] = useState('restaurant');
  
  useEffect(() => {
    // Initialize chat widget when component mounts
    if (typeof window !== 'undefined' && window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: '/api/chat',
        clientId: activeClient,
        primaryColor: '#0078ff',
        welcomeMessage: 'שלום! זוהי הדגמה של הצ\'אט. במה אוכל לעזור לך?',
        autoOpen: true
      });
    }
  }, [activeClient]);

  const changeClient = (clientId) => {
    setActiveClient(clientId);
    if (window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: '/api/chat',
        clientId: clientId,
        primaryColor: '#0078ff',
        autoOpen: true
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>הדגמת GPT-Chat | מערכת צ'אט לאתרי עסקים</title>
        <meta name="description" content="הדגמה חיה של מערכת הצ'אט החכם לאתרי עסקים" />
      </Head>

      <header className="bg-primary text-white py-6">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">GPT-Chat</h1>
            <nav>
              <ul className="flex space-x-6 space-x-reverse">
                <li><Link href="/" className="hover:underline">דף הבית</Link></li>
                <li><Link href="/demo" className="hover:underline font-bold">הדגמה</Link></li>
                <li><Link href="/docs" className="hover:underline">תיעוד</Link></li>
                <li><Link href="/manage" className="hover:underline">ניהול</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">הדגמת מערכת הצ'אט</h2>
            
            <div className="card mb-8">
              <h3 className="text-xl font-bold mb-4">בחר סוג עסק להדגמה:</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  className={`px-4 py-2 rounded-md ${activeClient === 'restaurant' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                  onClick={() => changeClient('restaurant')}
                >
                  מסעדה
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${activeClient === 'law_office' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                  onClick={() => changeClient('law_office')}
                >
                  משרד עורכי דין
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${activeClient === 'clothing_store' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                  onClick={() => changeClient('clothing_store')}
                >
                  חנות בגדים
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">הסבר על ההדגמה</h3>
              <p className="mb-4">
                בדף זה תוכל להתנסות במערכת הצ'אט עם "מוחות" שונים המותאמים לסוגי עסקים שונים.
                לחץ על אחד מסוגי העסקים למעלה כדי לשנות את ה"מוח" של הצ'אט ולראות כיצד התשובות משתנות בהתאם.
              </p>
              <p className="mb-4">
                הצ'אט מופיע בפינה הימנית התחתונה של המסך. לחץ עליו כדי לפתוח את חלון השיחה ולהתחיל לדבר עם העוזר הווירטואלי.
              </p>
              <p>
                נסה לשאול שאלות הקשורות לסוג העסק הנבחר, כמו:
              </p>
              <ul className="list-disc list-inside mr-6 mt-2">
                <li>מה שעות הפעילות שלכם?</li>
                <li>האם יש לכם מבצעים מיוחדים?</li>
                <li>איך אפשר ליצור איתכם קשר?</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-auto">
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
