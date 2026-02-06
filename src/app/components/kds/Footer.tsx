import React, { useState } from 'react';
// @ts-ignore
import svgPaths from '../../../imports/svg-ssspvjrr1y';
// @ts-ignore
import imgLogo1 from "figma:asset/b8f6e95143c0e9b4b54a068565ae8f43e31e8ea3.png";
import { SettingsModal } from './SettingsModal';

export function Footer() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="w-full h-full bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 text-white text-sm border-t border-white/10">
        {/* Left: Logo */}
        <div className="h-full py-2 shrink-0"> 
            <img src={imgLogo1} className="h-full w-auto object-contain object-left" alt="POS KING" />
        </div>

        {/* Center: Info */}
        <div className="flex-1 flex items-center justify-center gap-8 lg:gap-16 overflow-hidden px-4">
            {/* Support */}
            <div className="flex items-center gap-3 text-white/90 shrink-0">
               <svg className="w-5 h-5 opacity-80" viewBox="0 0 16 16" fill="currentColor"><path d={svgPaths.p2cb99140} /></svg>
               <span className="whitespace-nowrap font-medium tracking-wide text-xs lg:text-sm">support@posking.ca   |   604-808-6721 (Vancouver)   |   647-519-8366 (Toronto)</span>
            </div>
            
            {/* Sales - Hidden on smaller screens if needed, or allow wrap? KDS usually wide. */}
            <div className="flex items-center gap-3 text-white/90 shrink-0 hidden 2xl:flex">
               <svg className="w-5 h-5 opacity-80" viewBox="0 0 16 16" fill="currentColor"><path d={svgPaths.p7566b00} /></svg>
               <span className="whitespace-nowrap font-medium tracking-wide text-xs lg:text-sm">sales@posking.ca   |   604-270-9898 (Vancouver)   |   647-891-3999 (Toronto)</span>
            </div>
        </div>

        {/* Right: Version & Settings */}
        <div className="flex items-center gap-6 shrink-0">
            <span className="text-white/80 font-mono text-xs">v3.0</span>
            <button 
              onClick={() => setShowSettings(true)}
              className="bg-white rounded-lg p-2 text-slate-900 shadow-lg hover:bg-emerald-50 transition-all active:scale-95"
            >
               <svg className="w-4 h-4" viewBox="0 0 14 14" fill="currentColor"><path d={svgPaths.p11355600} /></svg>
            </button>
        </div>
      </div>
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </>
  );
}
