import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Manage() {
  const [minds, setMinds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMind, setCurrentMind] = useState(null);
  const [formData, setFormData] = useState({
    clientId: '',
    name: '',
    description: '',
    systemPrompt: ''
  });
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'

  useEffect(() => {
    // Initialize chat widget when component mounts
    if (typeof window !== 'undefined' && window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: '/api/chat',
        clientId: 'default',
        primaryColor: '#0078ff',
        welcomeMessage: 'שלום! אשמח לעזור לך בניהול המוחות של המערכת.'
      });
    }
    
    // Fetch minds data
    fetchMinds();
  }, []);

  const fetchMinds = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/minds');
      if (!response.ok) {
        throw new Error('Failed to fetch minds');
      }
      const data = await response.json();
      setMinds(data.minds || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = formMode === 'create' 
        ? '/api/minds' 
        : `/api/minds/${formData.clientId}`;
      
      const method = formMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${formMode === 'create' ? 'create' : 'update'} mind`);
      }
      
      // Reset form and refresh minds list
      setFormData({
        clientId: '',
        name: '',
        description: '',
        systemPrompt: ''
      });
      setFormMode('create');
      setCurrentMind(null);
      fetchMinds();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (mind) => {
    setFormData({
      clientId: mind.clientId,
      name: mind.name,
      description: mind.description,
      systemPrompt: mind.systemPrompt || ''
    });
    setFormMode('edit');
    setCurrentMind(mind);
  };

  const handleDelete = async (clientId) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק מוח זה?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/minds/${clientId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete mind');
      }
      
      fetchMinds();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      clientId: '',
      name: '',
      description: '',
      systemPrompt: ''
    });
    setFormMode('create');
    setCurrentMind(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>ניהול מוחות | מערכת GPT-Chat לאתרי עסקים</title>
        <meta name="description" content="ממשק ניהול מוחות למערכת צ'אט חכם מבוססת GPT" />
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
                <li><Link href="/manage" className="hover:underline font-bold">ניהול</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">ניהול "מוחות"</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>{error}</p>
                <button 
                  className="underline text-sm"
                  onClick={() => setError(null)}
                >
                  סגור
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="card">
                  <h3 className="text-xl font-bold mb-6">
                    {formMode === 'create' ? 'יצירת "מוח" חדש' : 'עריכת "מוח"'}
                  </h3>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="clientId">
                        מזהה לקוח
                      </label>
                      <input
                        type="text"
                        id="clientId"
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleInputChange}
                        disabled={formMode === 'edit'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        מזהה ייחודי ללקוח, ללא רווחים או תווים מיוחדים
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="name">
                        שם העסק
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="description">
                        תיאור
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2" htmlFor="systemPrompt">
                        הנחיות מערכת (System Prompt)
                      </label>
                      <textarea
                        id="systemPrompt"
                        name="systemPrompt"
                        value={formData.systemPrompt}
                        onChange={handleInputChange}
                        rows="8"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      ></textarea>
                      <p className="text-sm text-gray-500 mt-1">
                        הנחיות המערכת ל-GPT, המגדירות את אופי התשובות והתנהגות הצ'אט
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        {formMode === 'create' ? 'צור "מוח"' : 'עדכן "מוח"'}
                      </button>
                      
                      {formMode === 'edit' && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="btn-secondary"
                        >
                          בטל
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="card">
                  <h3 className="text-xl font-bold mb-6">"מוחות" קיימים</h3>
                  
                  {loading ? (
                    <p>טוען...</p>
                  ) : minds.length === 0 ? (
                    <p>אין "מוחות" קיימים. צור "מוח" חדש כדי להתחיל.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              מזהה לקוח
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              שם
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              תיאור
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              פעולות
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {minds.map((mind) => (
                            <tr key={mind.clientId}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{mind.clientId}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{mind.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{mind.description}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleEdit(mind)}
                                  className="text-primary hover:text-blue-800 ml-4"
                                >
                                  ערוך
                                </button>
                                <button
                                  onClick={() => handleDelete(mind.clientId)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  מחק
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                
                <div className="card mt-8">
                  <h3 className="text-xl font-bold mb-4">טיפים ליצירת "מוח" אפקטיבי</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>התחל עם הגדרה ברורה של תפקיד העוזר הווירטואלי ושם העסק.</li>
                    <li>הגדר את הטון והסגנון הרצויים (מקצועי, ידידותי, רשמי, וכו').</li>
                    <li>כלול מידע ספציפי על העסק כמו שעות פעילות, מבצעים, ומדיניות.</li>
                    <li>הגדר את תחומי הידע העיקריים שהעוזר צריך להתמקד בהם.</li>
                    <li>הוסף הנחיות לגבי אופן המענה לשאלות נפוצות.</li>
                    <li>הגדר כיצד העוזר צריך להפנות לקוחות לשירותים או מוצרים של העסק.</li>
                  </ul>
                </div>
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
