import * as React from "react";
import { LayoutGrid, List, FileClock, Utensils, RotateCcw, MonitorPlay, CheckCheck, X, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { getTranslation } from "@/app/i18n/translations";

export type KDSMode = 'grid' | 'summary' | 'history' | 'stock' | 'demo';

interface SidebarProps {
  currentMode: KDSMode;
  onModeChange: (mode: KDSMode) => void;
  onRevoke?: () => void;
  canRevoke?: boolean;
  viewMode?: 'order' | 'item';
  onToggleView?: () => void;
  language?: 'en' | 'zh' | 'bi';
  
  // Visibility Flags
  showItemView?: boolean;
  showSummary?: boolean;

  // Selection Props
  isSelectionMode?: boolean; 
  onToggleSelectionMode?: () => void;
  selectedCount?: number;
  onBatchComplete?: () => void;
  onCancelSelection?: () => void;
  
  // Logout
  onLogout?: () => void;
}

export function Sidebar({ 
    currentMode, 
    onModeChange, 
    onRevoke, 
    canRevoke, 
    viewMode, 
    onToggleView, 
    language, 
    showItemView = true,
    showSummary = true,
    isSelectionMode,
    onToggleSelectionMode,
    selectedCount,
    onBatchComplete,
    onCancelSelection,
    onLogout
}: SidebarProps) {
  const t = getTranslation(language || 'en');

  const handleItemClick = (targetView: 'order' | 'item', mode: KDSMode) => {
    if (currentMode !== mode) {
      onModeChange(mode);
    }
    
    if (mode === 'grid' && onToggleView && viewMode) {
      if (targetView === 'order' && viewMode === 'item') {
        onToggleView();
      } else if (targetView === 'item' && viewMode !== 'item') {
        onToggleView();
      }
    }
  };

  const getButtonClass = (isActive: boolean) => cn(
    "h-16 w-full rounded-2xl transition-all duration-300",
    isActive 
      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-100" 
      : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
  );

  return (
    <div className="flex h-screen w-24 flex-col items-center border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 z-50 overflow-y-auto no-scrollbar">
      
      <div className="flex flex-col gap-6 w-full px-3">
        {/* Orders (Grid / Table View) */}
        <div className="flex flex-col items-center w-full">
          <Button
            variant={currentMode === 'grid' && viewMode !== 'item' ? "default" : "ghost"}
            size="icon"
            className={getButtonClass(currentMode === 'grid' && viewMode !== 'item')}
            onClick={() => handleItemClick('order', 'grid')}
            title={t.orders}
          >
            <LayoutGrid className="h-8 w-8" />
          </Button>
        </div>

        {/* Item View */}
        {showItemView && onToggleView && (
          <div className="flex flex-col items-center w-full">
            <Button
              variant={currentMode === 'grid' && viewMode === 'item' ? "default" : "ghost"}
              size="icon"
              className={getButtonClass(currentMode === 'grid' && viewMode === 'item')}
              onClick={() => handleItemClick('item', 'grid')}
              title={t.itemView}
            >
              <Utensils className="h-8 w-8" />
            </Button>
          </div>
        )}
        
        {/* Summary */}
        {showSummary && (
          <div className="flex flex-col items-center w-full"> 
            <Button
              variant={currentMode === 'summary' ? "default" : "ghost"}
              size="icon"
              className={getButtonClass(currentMode === 'summary')}
              onClick={() => onModeChange('summary')}
              title={t.summary}
            >
              <List className="h-8 w-8" />
            </Button>
          </div>
        )}

        {/* History */}
        <div className="flex flex-col items-center w-full">
          <Button
            variant={currentMode === 'history' ? "default" : "ghost"}
            size="icon"
            className={getButtonClass(currentMode === 'history')}
            onClick={() => onModeChange('history')}
            title={t.history}
          >
            <FileClock className="h-8 w-8" />
          </Button>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="mt-auto flex flex-col gap-4 w-full px-3 items-center pt-6">
         
         {/* Batch Actions: Done & Cancel OR Revoke */}
         {selectedCount && selectedCount > 0 ? (
             <div className="flex flex-col gap-4 w-full items-center animate-in slide-in-from-right-4 duration-300">
               {/* Done */}
               <div className="flex flex-col items-center w-full">
                   <Button 
                      variant="outline"
                      size="icon"
                      className="h-16 w-full rounded-2xl border-2 border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                      onClick={onBatchComplete}
                      title={t.completeSelected}
                   >
                       <CheckCheck className="h-8 w-8" />
                   </Button>
               </div>
               
               {/* Cancel */}
               {onCancelSelection && (
                   <div className="flex flex-col items-center w-full">
                       <Button
                         variant="outline"
                         size="icon"
                         className="h-16 w-full rounded-2xl border-2 border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-300"
                         onClick={onCancelSelection}
                         title={t.cancelSelection}
                       >
                         <X className="h-8 w-8" />
                       </Button>
                   </div>
               )}
             </div>
         ) : (
             onRevoke && (
                 <div className="flex flex-col items-center w-full">
                   <Button
                     variant="outline"
                     size="icon"
                     disabled={!canRevoke}
                     className="h-16 w-full rounded-2xl border-2 border-red-200 text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-300"
                     onClick={onRevoke}
                     title={t.redoLast}
                   >
                     <RotateCcw className="h-8 w-8" />
                   </Button>
                 </div>
             )
         )}

         {/* Logout Button (Separated) */}
         {onLogout && (
             <>
                <div className="h-4" /> {/* Spacer for separation */}
                <div className="flex flex-col items-center w-full pb-2">
                   <Button
                     variant="ghost"
                     size="icon"
                     className="h-16 w-full rounded-2xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                     onClick={onLogout}
                     title={t.logout}
                   >
                     <Power className="h-8 w-8" />
                   </Button>
                </div>
             </>
         )}
      </div>
    </div>
  );
}
