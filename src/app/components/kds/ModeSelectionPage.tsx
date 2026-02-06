import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Footer } from './Footer';
import { Utensils, BellRing } from 'lucide-react';

interface ModeSelectionPageProps {
  onSelect: (mode: 'kitchen' | 'expediter') => void;
}

export function ModeSelectionPage({ onSelect }: ModeSelectionPageProps) {
  return (
    <div className="h-screen w-full bg-slate-50 relative flex flex-col items-center justify-center overflow-hidden font-sans">
       {/* Background decoration */}
       <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[150px]" />
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[60%] bg-blue-500 rounded-full blur-[150px]" />
       </div>

       {/* Main Content */}
       <div className="flex flex-col gap-12 z-10 -mt-20 items-center animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center gap-2 mb-8">
             <h1 className="text-6xl font-black text-slate-900 tracking-tight">System Mode</h1>
             <p className="text-2xl font-medium text-slate-500">Select KDS Operation Mode / 選擇系統模式</p>
          </div>
          
          <div className="flex gap-8">
             <Button 
                className="h-64 w-80 flex flex-col items-center justify-center gap-6 bg-white text-slate-900 border-4 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 shadow-xl transition-all active:scale-95 group rounded-2xl"
                onClick={() => onSelect('kitchen')}
             >
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <Utensils className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black">Kitchen</span>
                    <span className="text-xl font-medium text-slate-400 group-hover:text-emerald-600/70">廚房顯示</span>
                </div>
             </Button>

             <Button 
                className="h-64 w-80 flex flex-col items-center justify-center gap-6 bg-white text-slate-900 border-4 border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 shadow-xl transition-all active:scale-95 group rounded-2xl"
                onClick={() => onSelect('expediter')}
             >
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <BellRing className="w-12 h-12 text-blue-600" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black">Expediter</span>
                    <span className="text-xl font-medium text-slate-400 group-hover:text-blue-600/70">備餐/出餐</span>
                </div>
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
