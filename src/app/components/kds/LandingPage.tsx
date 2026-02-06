import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Footer } from './Footer';
import { ChevronLeft } from 'lucide-react';

interface LandingPageProps {
  onStart: (lang: 'en' | 'zh' | 'bi') => void;
  onBack?: () => void;
}

export function LandingPage({ onStart, onBack }: LandingPageProps) {
  return (
    <div className="h-screen w-full bg-slate-50 relative flex flex-col items-center justify-center overflow-hidden">
       {/* Background decoration */}
       <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[150px]" />
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-blue-500 rounded-full blur-[150px]" />
       </div>

       {/* Back Button */}
       {onBack && (
          <Button
            variant="ghost" 
            className="absolute top-8 left-8 z-50 h-16 w-16 rounded-xl bg-white/80 hover:bg-white text-slate-700 shadow-md border-2 border-slate-100"
            onClick={onBack}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
       )}

       {/* Main Content */}
       <div className="flex flex-col gap-12 z-10 -mt-20 items-center animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center gap-2 mb-8">
             <h1 className="text-6xl font-black text-slate-900 tracking-tight">Welcome</h1>
             <p className="text-2xl font-medium text-slate-500">Please select your language / 請選擇語言</p>
          </div>
          
          <div className="flex gap-6">
             <Button 
                className="h-40 w-64 flex flex-col items-center justify-center gap-2 bg-white text-slate-900 border-4 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 shadow-xl transition-all active:scale-95 group rounded-2xl"
                onClick={() => onStart('en')}
             >
                <span className="text-4xl font-black">English</span>
             </Button>

             <Button 
                className="h-40 w-64 flex flex-col items-center justify-center gap-2 bg-white text-slate-900 border-4 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 shadow-xl transition-all active:scale-95 group rounded-2xl"
                onClick={() => onStart('bi')}
             >
                <div className="flex flex-col items-center leading-none gap-1">
                   <span className="text-3xl font-black">Bilingual</span>
                   <span className="text-3xl font-black">雙語</span>
                </div>
             </Button>
             
             <Button 
                className="h-40 w-64 flex flex-col items-center justify-center gap-2 bg-white text-slate-900 border-4 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 shadow-xl transition-all active:scale-95 group rounded-2xl"
                onClick={() => onStart('zh')}
             >
                <span className="text-4xl font-black">中文</span>
             </Button>
          </div>
       </div>

       {/* Footer */}
       <div className="absolute bottom-0 w-full h-[64px] z-50 shadow-2xl">
          <Footer />
       </div>
    </div>
  );
}
