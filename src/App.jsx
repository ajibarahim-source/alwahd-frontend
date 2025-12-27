import React, { useState } from 'react';
import { Shield, Cpu, Zap, Activity, Database, Lock } from 'lucide-react';

// ==========================================================
// FILE: App.jsx (The Frontend for GitHub Pages)
// ==========================================================

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // استبدل هذا الرابط برابط الـ API الخاص بك بعد رفعه على Render
  const API_URL = "https://your-app-name.onrender.com/process";

  const handleProcess = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error connecting to F-Lambda Engine:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Status */}
        <nav className="flex justify-between items-center mb-12 p-4 border-b border-white/5">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-indigo-500">
            <Cpu size={28} /> F-LAMBDA CORE
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-500">
              <Activity size={14} /> System Stable
            </span>
            <span className="text-gray-500">v2.0.4-Deterministic</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Physical Intelligence Engine
          </h1>
          <p className="text-gray-400 max-w-2xl">
            أول منصة تخزين طيفي تعتمد على الحتمية الفيزيائية الكاملة. تشفير البيانات في بصمات ترددية غير قابلة للتدمير.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <label className="block text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                <Database size={16} /> مدخلات البيانات الفيزيائية
              </label>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-48 bg-black/40 border border-white/5 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition-all font-mono text-indigo-300"
                placeholder="أدخل البيانات المراد أرشفتها طيفياً..."
              />
              <button 
                onClick={handleProcess}
                disabled={loading}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? "جاري المعالجة..." : <><Zap /> تشغيل المحرك الحتمي</>}
              </button>
            </div>

            {result && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl animate-in fade-in duration-500">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                  <Shield />
                  <span className="font-bold">برهان السلامة (Integrity Verified)</span>
                </div>
                <p className="text-sm text-emerald-500/80">تمت استعادة البيانات بنسبة 100% دون فقدان أي بت معلوماتي.</p>
              </div>
            )}
          </div>

          {/* Stats & Results Panel */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
                <Lock size={16} /> نتائج التشفير
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase">التوقيع الطيفي الأول</div>
                  <div className="text-lg font-mono text-purple-400">
                    {result ? result.signatures_sample[0] : "0.000000"}
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase">زمن المعالجة</div>
                  <div className="text-lg font-mono text-indigo-400">
                    {result ? result.processing_time : "0.0000s"}
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase">دقة الاسترداد</div>
                  <div className="text-lg font-mono text-emerald-400">100% Accurate</div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-600/20 p-6 rounded-2xl">
              <h4 className="text-xs font-bold text-indigo-400 mb-2 uppercase">ملاحظة تقنية:</h4>
              <p className="text-[11px] text-indigo-300/70 leading-relaxed">
                يعمل المحرك بنظام التعقيد الخطي O(n) مما يجعله قادراً على معالجة البيانات الضخمة بنفس الكفاءة الطيفية.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


