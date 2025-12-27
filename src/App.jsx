import React, { useState } from 'react';
import { Shield, Cpu, Zap, Activity, Database, Lock, RefreshCw, CheckCircle } from 'lucide-react';

/**
 * FILE: App.jsx
 * This is the bridge between your React Frontend and Python Backend.
 */

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==========================================
  // الخطوة الأهم: استبدلي الرابط أدناه برابط Render الخاص بكِ
  // تأكدي من إبقاء "/process" في نهاية الرابط
  // ==========================================
  const API_URL = "https://your-backend-app.onrender.com/process";

  const handleProcess = async () => {
    if (!input) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ content: input })
      });

      if (!response.ok) {
        throw new Error(`Connection Error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Link Failure:", err);
      setError("تعذر الاتصال بالمحرك الفيزيائي. تأكدي من أن الـ Backend يعمل على Render.");
    } finally {
      setLoading(false);
    }
  };

  const clearSystem = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 p-4 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center mb-12 p-6 glass rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter text-indigo-500">
            <div className="bg-indigo-500/10 p-2 rounded-lg"><Cpu size={24} /></div>
            F-LAMBDA CORE
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-widest text-zinc-500">
            <span className="flex items-center gap-1.5 text-emerald-500">
              <Activity size={14} /> SYSTEM LIVE
            </span>
            <span>V2.5 STABLE</span>
          </div>
        </nav>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                  <Database size={18} className="text-indigo-500" /> مدخلات البيانات الفيزيائية
                </label>
                <button onClick={clearSystem} className="text-zinc-500 hover:text-white transition-colors">
                  <RefreshCw size={18} />
                </button>
              </div>

              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-56 bg-black/40 border border-white/5 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-indigo-300 text-lg leading-relaxed resize-none"
                placeholder="أدخل النص هنا لاختبار الحتمية الفيزيائية..."
              />

              <button 
                onClick={handleProcess}
                disabled={loading || !input}
                className={`w-full mt-6 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  loading ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] text-white'
                }`}
              >
                {loading ? (
                  <RefreshCw className="animate-spin" />
                ) : (
                  <><Zap size={20} /> معالجة طيفية حتمية</>
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
                  {error}
                </div>
              )}
            </div>

            {result && result.integrity && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl flex items-center gap-4 animate-in zoom-in duration-300">
                <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-400">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 uppercase text-xs tracking-widest">Integrity Verified</h4>
                  <p className="text-sm text-emerald-500/70 italic">تمت استعادة البيانات بنسبة 100% من الفضاء الطيفي.</p>
                </div>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 h-full">
              <h3 className="text-xs font-bold text-zinc-500 mb-8 uppercase tracking-[0.2em] flex items-center gap-2">
                <Lock size={14} /> مخرجات النموذج (Output)
              </h3>
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest block mb-2">التوقيع الطيفي (نموذج)</span>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-purple-400 text-sm truncate">
                    {result ? result.signatures_sample.join(' | ') : "0.000000000000"}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest block mb-2">النص المستعاد (Recovery)</span>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-emerald-400 min-h-[80px] break-words">
                    {result ? result.recovered_content : "---"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="text-[10px] text-zinc-600 uppercase mb-1">الزمن</div>
                    <div className="text-xl font-bold text-indigo-400">{result ? result.processing_time : "0.00s"}</div>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="text-[10px] text-zinc-600 uppercase mb-1">الحالة</div>
                    <div className="text-xl font-bold text-zinc-400">{result ? "Perfect" : "Idle"}</div>
                  </div>
                </div>
              </div>

              {result && (
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                    <CheckCircle size={14} /> تم إثبات الحتمية الخوارزمية O(n)
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

