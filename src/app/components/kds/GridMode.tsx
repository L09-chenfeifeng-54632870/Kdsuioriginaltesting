import * as React from "react";
import { Order } from "@/app/data/mock";
import { OrderCard } from "./OrderCard";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Hash, ListChecks, Clock, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortMethod = 'fifo' | 'lifo' | 'table-asc' | 'table-desc' | 'id-asc' | 'id-desc';

interface GridModeProps {
  orders: Order[];
  onCompleteOrder: (id: string) => void;
  history?: Order[];
  onRecallOrder?: (id: string) => void;
  onItemToggle?: (orderId: string, itemId: string) => void;
  onRushToggle?: (orderId: string) => void;
  onMaximizeOrder?: (id: string) => void;
  viewMode: 'order' | 'item';
  language?: 'en' | 'zh' | 'bi';
  
  // Selection Props (From App)
  isSelectionMode?: boolean;
  selectedItems?: Map<string, string>;
  onToggleSelection?: (orderId: string, itemId: string) => void;
  isExpediterMode?: boolean;
  
  // Sorting Props
  sortMethod?: SortMethod;
  onSortChange?: (method: SortMethod) => void;
}

import { getTranslation } from '@/app/i18n/translations';

export function GridMode({ 
    orders, 
    onCompleteOrder, 
    history = [], 
    onRecallOrder, 
    onItemToggle, 
    onRushToggle, 
    onMaximizeOrder, 
    viewMode, 
    language,
    isSelectionMode,
    selectedItems,
    onToggleSelection,
    isExpediterMode,
    sortMethod = 'fifo',
    onSortChange
}: GridModeProps) {
  const t = getTranslation(language || 'en');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [columns, setColumns] = React.useState(4);
  const [windowHeight, setWindowHeight] = React.useState(900);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  
  // Responsive Grid Logic
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowHeight(height);
      
      // Mobile-first responsive breakpoints
      if (width < 640) {
        setColumns(1); // Mobile: 1 column
      } else if (width < 768) {
        setColumns(2); // Small tablets: 2 columns
      } else if (width < 1024) {
        setColumns(2); // Tablets: 2 columns
      } else if (width < 1280) {
        setColumns(3); // Small desktop: 3 columns
      } else {
        setColumns(3); // Large desktop: 3 columns
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Quick Complete All Items (For Order Mode Shortcut)
  const handleQuickCompleteOrder = (orderId: string) => {
      const order = orders.find(o => o.id === orderId);
      if (!order || !onItemToggle) return;
      order.items.forEach(item => {
          if (!item.completed) onItemToggle(orderId, item.id);
      });
  };

  // Sort Orders: Rush > Overdue (Red) > Redo (Purple) > FIFO/LIFO/Table
  const processedOrders = React.useMemo(() => {
    // First, filter by search query if in expediter mode
    let filteredOrders = orders;
    if (isExpediterMode && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredOrders = orders.filter(order => {
        // Search by order ID (displayId)
        if (order.displayId.toLowerCase().includes(query)) return true;
        // Search by table number
        if (order.tableNo.toLowerCase().includes(query)) return true;
        // Search by just the number part (e.g., "5" matches "T5")
        const tableNum = order.tableNo.replace(/[^0-9]/g, '');
        if (tableNum && tableNum.includes(query.replace(/[^0-9]/g, ''))) return true;
        return false;
      });
    }

    return [...filteredOrders].sort((a, b) => {
      // 1. Rush always on top
      if (a.isRush && !b.isRush) return -1;
      if (!a.isRush && b.isRush) return 1;

      // 2. Overdue always on top
      const aIsRedOverdue = a.status === 'overdue' && !a.isRedo;
      const bIsRedOverdue = b.status === 'overdue' && !b.isRedo;
      if (aIsRedOverdue && !bIsRedOverdue) return -1;
      if (!aIsRedOverdue && bIsRedOverdue) return 1;

      // 3. Redo always on top
      if (a.isRedo && !b.isRedo) return -1;
      if (!a.isRedo && b.isRedo) return 1;

      // 4. Warning status priority
      if (a.status === 'warning' && b.status !== 'warning') return -1;
      if (a.status !== 'warning' && b.status === 'warning') return 1;

      // 5. User selected sort method
      if (sortMethod === 'table-asc') {
        return a.tableNo.localeCompare(b.tableNo, undefined, { numeric: true, sensitivity: 'base' });
      }

      if (sortMethod === 'table-desc') {
        return b.tableNo.localeCompare(a.tableNo, undefined, { numeric: true, sensitivity: 'base' });
      }

      if (sortMethod === 'id-asc') {
        return a.displayId.localeCompare(b.displayId, undefined, { numeric: true, sensitivity: 'base' });
      }

      if (sortMethod === 'id-desc') {
        return b.displayId.localeCompare(a.displayId, undefined, { numeric: true, sensitivity: 'base' });
      }

      const timeA = a.createdAt.getTime();
      const timeB = b.createdAt.getTime();

      if (sortMethod === 'lifo') {
        return timeB - timeA;
      }
      return timeA - timeB; // Default FIFO
    });
  }, [orders, sortMethod, isExpediterMode, searchQuery]);

  // Flatten orders into individual items for Item view
  const itemOrders = React.useMemo(() => {
    // 1. Collect all items (excluding completed items in Kitchen Mode)
    const items: { syntheticOrder: Order; originalOrderId: string; itemId: string }[] = [];
    
    // Use original orders to ensure we have the full dataset before sorting
    orders.forEach(order => {
      order.items.forEach(item => {
        // In Kitchen Mode, filter out completed items
        // In Expediter Mode, show all items (OrderCard handles local dismissal)
        if (!isExpediterMode && item.completed) return;
        
        const syntheticOrder: Order = {
          ...order,
          items: [item]
        };
        items.push({
          syntheticOrder,
          originalOrderId: order.id,
          itemId: item.id
        });
      });
    });

    // 2. Sort Items with SAME priority logic as Order View
    return items.sort((a, b) => {
        const orderA = a.syntheticOrder;
        const orderB = b.syntheticOrder;

        // Priority 1: Rush always on top
        if (orderA.isRush && !orderB.isRush) return -1;
        if (!orderA.isRush && orderB.isRush) return 1;

        // Priority 2: Overdue (non-Redo) always on top
        const aIsRedOverdue = orderA.status === 'overdue' && !orderA.isRedo;
        const bIsRedOverdue = orderB.status === 'overdue' && !orderB.isRedo;
        if (aIsRedOverdue && !bIsRedOverdue) return -1;
        if (!aIsRedOverdue && bIsRedOverdue) return 1;

        // Priority 3: Redo always on top
        if (orderA.isRedo && !orderB.isRedo) return -1;
        if (!orderA.isRedo && orderB.isRedo) return 1;

        // Priority 4: Warning status priority
        if (orderA.status === 'warning' && orderB.status !== 'warning') return -1;
        if (orderA.status !== 'warning' && orderB.status === 'warning') return 1;

        // Priority 5: User selected sort method
        if (sortMethod === 'table-asc') {
            return orderA.tableNo.localeCompare(orderB.tableNo, undefined, { numeric: true, sensitivity: 'base' });
        }

        if (sortMethod === 'table-desc') {
            return orderB.tableNo.localeCompare(orderA.tableNo, undefined, { numeric: true, sensitivity: 'base' });
        }

        if (sortMethod === 'id-asc') {
            return orderA.displayId.localeCompare(orderB.displayId, undefined, { numeric: true, sensitivity: 'base' });
        }

        if (sortMethod === 'id-desc') {
            return orderB.displayId.localeCompare(orderA.displayId, undefined, { numeric: true, sensitivity: 'base' });
        }

        // Time Logic (FIFO/LIFO)
        const timeA = orderA.createdAt.getTime();
        const timeB = orderB.createdAt.getTime();

        if (sortMethod === 'lifo') {
            return timeB - timeA; // Newest First
        }
        
        return timeA - timeB; // FIFO (Default)
    });
  }, [orders, sortMethod, isExpediterMode]);

  const currentList = viewMode === 'item' ? itemOrders : processedOrders;
  
  // Dynamic Grid Rows for Item View
  const MAX_SLOTS = viewMode === 'item' 
      ? columns * 3 // 3 Rows in Item View
      : columns * 2; // 2 Rows in Order View

  const getOrderLayout = (order: Order | any): { slots: number, variant: 'standard' | 'tall' | 'wide' | 'full-row' | 'focus' | 'wide-tall' } => {
    if (viewMode === 'item') return { slots: 1, variant: 'standard' };
    if (order.tableNo === 'T99') return { slots: 4, variant: 'wide-tall' };

    let totalPx = 72 + 16; // Header + Padding
    if (order.note) totalPx += 50;
    
    const itemGap = 8; 
    order.items.forEach((item: any) => {
        const verticalOverhead = 24;
        const minHeightByButton = 56 + verticalOverhead;
        let textHeight = 0;
        const parts = item.name.split(' / ');
        const eng = parts[0];
        const chi = parts[1] || '';
        const engLines = Math.max(1, Math.ceil(eng.length / 22)); 
        textHeight += engLines * 28; 
        if (chi) {
             const chiLines = Math.max(1, Math.ceil(chi.length / 14));
             textHeight += chiLines * 24 + 2;
        }
        const notes = item.notes || []; 
        if (notes.length > 0) {
            textHeight += 6;
            const noteLines = Math.ceil(notes.length / 2.5);
            textHeight += noteLines * 32; 
        }
        if (item.specialRequest) textHeight += 30;
        const totalTextHeight = textHeight + verticalOverhead;
        const finalItemHeight = Math.max(minHeightByButton, totalTextHeight);
        totalPx += (finalItemHeight * 1.3) + itemGap;
    });

    const gridGap = 8;
    const paddingY = 16;
    const paginationHeight = 80; 
    const availableTotalHeight = windowHeight - paddingY - paginationHeight;
    const rowHeight = (availableTotalHeight - gridGap) / 2;
    const standardThreshold = rowHeight - 20; 
    const tallThreshold = availableTotalHeight - 20; 
    const wideTallThreshold = tallThreshold * 1.5; 

    if (totalPx <= standardThreshold) return { slots: 1, variant: 'standard' };
    if (totalPx <= tallThreshold) return { slots: 2, variant: 'tall' };
    if (totalPx <= wideTallThreshold) return { slots: 4, variant: 'wide-tall' }; 
    return { slots: MAX_SLOTS, variant: 'focus' }; 
  };

  const pages = React.useMemo(() => {
    const _pages: any[][] = [];
    let _currentPage: any[] = [];
    let _currentSlots = 0;

    currentList.forEach(item => {
      const orderData = viewMode === 'item' ? (item as any).syntheticOrder : (item as Order);
      const layout = getOrderLayout(orderData);
      const slots = layout.slots;
      
      if (_currentSlots + slots > MAX_SLOTS && _currentPage.length > 0) {
        _pages.push(_currentPage);
        _currentPage = [];
        _currentSlots = 0;
      }
      const itemWithContext = { ...item, _layout: layout };
      _currentPage.push(itemWithContext);
      _currentSlots += slots;
    });
    
    if (_currentPage.length > 0) _pages.push(_currentPage);
    return _pages;
  }, [currentList, viewMode, MAX_SLOTS, windowHeight]);

  const totalPages = pages.length;
  const currentItems = pages[currentPage] || [];
  
  React.useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) setCurrentPage(Math.max(0, totalPages - 1));
    else if (totalPages === 0) setCurrentPage(0);
  }, [totalPages, currentPage]);

  const handleNextPage = () => { if (currentPage < totalPages - 1) setCurrentPage(p => p + 1); };
  const handlePrevPage = () => { if (currentPage > 0) setCurrentPage(p => p - 1); };

  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Compact Sorting Control Bar with Search - Minimal Space Usage */}
      {onSortChange && (
        <div className="shrink-0 flex items-center justify-center gap-2 px-2 py-2 safe-top">
          {/* Left Spacer for Balance */}
          <div className="flex-1">
            {/* Empty space to balance the search box on the right */}
          </div>

          {/* Sorting Buttons - Centered */}
          <div className="inline-flex items-center gap-0.5 sm:gap-1 bg-slate-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1.5 border border-slate-700/40 overflow-x-auto">
            <button
              onClick={() => onSortChange(sortMethod === 'fifo' ? 'lifo' : 'fifo')}
              className={cn(
                "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-150 touch-manipulation whitespace-nowrap",
                (sortMethod === 'fifo' || sortMethod === 'lifo')
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300 active:bg-slate-800"
              )}
            >
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{t.time}</span>
              {(sortMethod === 'fifo' || sortMethod === 'lifo') && (
                sortMethod === 'fifo' ? <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <ArrowDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              )}
            </button>

            <button
              onClick={() => onSortChange(sortMethod === 'table-asc' ? 'table-desc' : 'table-asc')}
              className={cn(
                "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-150 touch-manipulation whitespace-nowrap",
                (sortMethod === 'table-asc' || sortMethod === 'table-desc')
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300 active:bg-slate-800"
              )}
            >
              <Hash className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{t.table}</span>
              {(sortMethod === 'table-asc' || sortMethod === 'table-desc') && (
                sortMethod === 'table-asc' ? <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <ArrowDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              )}
            </button>

            <button
              onClick={() => onSortChange(sortMethod === 'id-asc' ? 'id-desc' : 'id-asc')}
              className={cn(
                "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md transition-all duration-150 touch-manipulation whitespace-nowrap",
                (sortMethod === 'id-asc' || sortMethod === 'id-desc')
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300 active:bg-slate-800"
              )}
            >
              <ListChecks className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{t.orderNo}</span>
              {(sortMethod === 'id-asc' || sortMethod === 'id-desc') && (
                sortMethod === 'id-asc' ? <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <ArrowDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              )}
            </button>
          </div>

          {/* Right Side - Search Bar or Spacer */}
          <div className="flex-1 flex justify-end">
            {isExpediterMode && viewMode === 'order' && (
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={t.searchPlaceholder}
                  className={cn(
                    "w-full h-10 pl-10 pr-10 rounded-md bg-slate-900/90 backdrop-blur-sm",
                    "border border-slate-700/40 text-white placeholder-slate-500 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "transition-all duration-150",
                    isSearchFocused && "ring-2 ring-blue-500 border-transparent"
                  )}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 px-2 pb-2">
        {currentList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-900 p-8 rounded-2xl mb-6 border border-slate-800">
               <span className="text-6xl">{searchQuery ? '🔍' : '🎉'}</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {searchQuery ? t.noResults : t.allCaughtUp}
            </h2>
            <p className="text-lg mt-2">
              {searchQuery 
                ? `${t.noMatches} "${searchQuery}"` 
                : (viewMode === 'item' ? t.noActiveItems : t.noActiveOrders)
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {t.clearSearch}
              </button>
            )}
          </div>
        ) : (
          <div 
            className={cn(
                "grid h-full gap-2 auto-rows-fr", 
                viewMode === 'item' ? "grid-rows-3" : "grid-rows-2"
            )}
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            <AnimatePresence mode="popLayout">
              {currentItems.map((item, idx) => {
                 const key = viewMode === 'item' 
                   ? `${(item as any).originalOrderId}-${(item as any).itemId}`
                   : (item as Order).id;
                 const orderData = viewMode === 'item' 
                   ? (item as any).syntheticOrder 
                   : (item as Order);
                 const layout = (item as any)._layout || { slots: 1, variant: 'standard' };
                 const { slots, variant } = layout;

                 return (
                   <motion.div
                     key={key}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ duration: 0.2 }}
                     className={cn(
                       "min-h-0 h-full",
                       variant === 'focus' ? `col-span-${columns} row-span-2` :
                       variant === 'wide-tall' ? "col-span-2 row-span-full" :
                       variant === 'full-row' ? "col-span-3 row-span-1" :
                       variant === 'tall' ? "col-span-1 row-span-full" :
                       variant === 'wide' ? "col-span-2 row-span-1" :
                       "col-span-1 row-span-1"
                     )}
                   >
                     <OrderCard 
                       order={orderData} 
                       onComplete={onCompleteOrder}
                       onItemToggle={onItemToggle}
                       onRushToggle={onRushToggle}
                       onMaximize={onMaximizeOrder ? () => onMaximizeOrder(orderData.id) : undefined}
                       variant={variant}
                       language={language}
                       isSelectionMode={isSelectionMode}
                       selectedItemIds={selectedItems}
                       onToggleSelection={onToggleSelection}
                       onQuickCompleteOrder={handleQuickCompleteOrder}
                       isExpediterMode={isExpediterMode}
                     />
                   </motion.div>
                 );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="h-20 sm:h-24 shrink-0 flex items-center gap-3 sm:gap-6 px-4 pb-4 safe-bottom">
           <Button 
             variant="outline" 
             size="lg"
             onClick={handlePrevPage}
             disabled={currentPage === 0}
             className={cn(
               "flex-1 h-full text-lg sm:text-2xl font-black shadow-sm touch-manipulation rounded-2xl border-2 transition-all",
               "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600",
               "disabled:opacity-30 disabled:hover:bg-slate-800 disabled:hover:border-slate-700"
             )}
           >
             <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 mr-1 sm:mr-2" />
             <span className="hidden sm:inline">{t.previous}</span>
             <span className="sm:hidden">{t.prev}</span>
           </Button>

           <div className="h-full min-w-[160px] flex flex-col items-center justify-center shrink-0 bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-md px-6 shadow-inner">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">{t.page}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter shadow-black drop-shadow-lg">
                    {currentPage + 1}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-600">/</span>
                <span className="text-xl sm:text-2xl font-bold text-slate-500">
                    {totalPages}
                </span>
              </div>
           </div>

           <Button 
             variant="default" 
             size="lg"
             onClick={handleNextPage}
             disabled={currentPage >= totalPages - 1}
             className={cn(
               "flex-1 h-full text-lg sm:text-2xl font-black shadow-xl touch-manipulation rounded-2xl border-t border-white/20 transition-all",
               "bg-emerald-600 hover:bg-emerald-500 text-white active:scale-[0.98]",
               "disabled:bg-slate-800 disabled:text-slate-500 disabled:border-transparent disabled:shadow-none"
             )}
           >
             <span className="hidden sm:inline">{t.nextPage}</span>
             <span className="sm:hidden">{t.next}</span>
             <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 ml-1 sm:ml-2" />
           </Button>
        </div>
      )}
    </div>
  );
}
