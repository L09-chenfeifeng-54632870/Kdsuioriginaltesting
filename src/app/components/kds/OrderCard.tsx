import * as React from "react";
import { Check, Clock, Flame, ChevronLeft, ChevronRight, RotateCcw, CheckCheck, Square, CheckSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Order, OrderItem } from "@/app/data/mock";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useElapsed, formatDuration } from "@/lib/hooks";

interface OrderCardProps {
  order: Order;
  onComplete: (id: string) => void;
  onItemToggle?: (orderId: string, itemId: string) => void;
  onRushToggle?: (orderId: string) => void;
  onMaximize?: () => void;
  variant?: 'standard' | 'wide' | 'full-row' | 'focus' | 'tall' | 'wide-tall' | 'summary';
  
  // Selection Props
  isSelectionMode?: boolean; // Kept for interface compatibility but logic uses selectedItemIds
  selectedItemIds?: Map<string, string>;
  onToggleSelection?: (orderId: string, itemId: string) => void;
  onSelectAllOrder?: (orderId: string) => void;
  onQuickCompleteOrder?: (orderId: string) => void;
  language?: 'en' | 'zh' | 'bi';
  isExpediterMode?: boolean;
}

import { getTranslation } from '@/app/i18n/translations';

export function OrderCard({ 
    order, 
    onComplete, 
    onItemToggle, 
    onRushToggle, 
    onMaximize, 
    variant = 'standard',
    isSelectionMode = false,
    selectedItemIds,
    onToggleSelection,
    onSelectAllOrder,
    onQuickCompleteOrder,
    language = 'bi',
    isExpediterMode = false
}: OrderCardProps) {
  const t = getTranslation(language);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [localDismissedItems, setLocalDismissedItems] = React.useState<Set<string>>(new Set());
  const [expediterCheckedIds, setExpediterCheckedIds] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    setLocalDismissedItems(new Set());
    setExpediterCheckedIds(new Set());
  }, [order.id, isExpediterMode]);

  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  React.useEffect(() => {
    const handleResize = () => setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { width: windowWidth, height: windowHeight } = dimensions;

  const elapsed = useElapsed(order.createdAt);
  
  // Left Status Bar Design - Traffic Light System
  const getStatusConfig = () => {
    if (order.status === 'cancelled') return {
      styles: {
        statusBar: "border-l-[8px] border-l-slate-500",
        cardBorder: "border-2 border-slate-400 shadow-xl",
        header: "bg-slate-700 text-white",
        headerRadius: "rounded-t-xl",
        badge: "bg-white text-slate-700 border-2 border-slate-300",
        timer: "text-slate-100",
        statusIcon: "🔘"
      }
    };
    if (order.status === 'completed') return {
      styles: {
        statusBar: "border-l-[8px] border-l-blue-500",
        cardBorder: "border-2 border-blue-400 shadow-xl",
        header: "bg-blue-600 text-white",
        headerRadius: "rounded-t-xl",
        badge: "bg-white text-blue-700 border-2 border-blue-300",
        timer: "text-blue-100",
        statusIcon: "✓"
      }
    };
    if (order.isRedo) return {
      styles: {
        statusBar: "border-l-[12px] border-l-purple-600",
        cardBorder: "border-4 border-purple-500 shadow-2xl",
        header: "bg-purple-700 text-white",
        headerRadius: "rounded-t-xl",
        badge: "bg-white text-purple-700 border-2 border-purple-300",
        timer: "text-purple-100",
        statusIcon: "🔄"
      }
    };
    if (order.status === 'warning') return {
      styles: {
        statusBar: "border-l-[12px] border-l-orange-500",
        cardBorder: "border-4 border-orange-400 shadow-2xl",
        header: "bg-orange-600 text-white",
        headerRadius: "rounded-t-xl",
        badge: "bg-white text-orange-700 border-2 border-orange-300",
        timer: "text-orange-100",
        statusIcon: "⚠"
      }
    };
    if (order.status === 'new') return {
      styles: {
        statusBar: "border-l-[8px] border-l-emerald-500",
        cardBorder: "border-2 border-emerald-400 shadow-xl",
        header: "bg-[#009966] text-white",
        headerRadius: "rounded-t-xl",
        badge: "bg-white text-[#006644] border-2 border-emerald-300",
        timer: "text-emerald-100",
        statusIcon: "🆕"
      }
    };
    
    // Critical/Overdue
    return {
      styles: {
        statusBar: "border-l-[12px] border-l-red-600",
        cardBorder: "border-4 border-red-500 shadow-2xl",
        header: "bg-[#e7000b] text-white",
        headerRadius: "rounded-t-xl",
        badge: "bg-white text-[#c10007] border-2 border-red-300",
        timer: "text-red-100",
        statusIcon: "🚨"
      }
    };
  };

  const { styles } = getStatusConfig();

  // Pre-process items
  const groupedItems = React.useMemo(() => {
    const groups: { 
      item: OrderItem; 
      ids: string[]; 
      totalQuantity: number;
    }[] = [];

    order.items.forEach(item => {
      // In Expediter Mode, skip items that have been locally dismissed
      if (isExpediterMode && localDismissedItems.has(item.id)) {
        return;
      }

      const existing = groups.find(g => 
        g.item.name === item.name &&
        JSON.stringify(g.item.notes) === JSON.stringify(item.notes) &&
        g.item.specialRequest === item.specialRequest &&
        g.item.completed === item.completed
      );

      if (existing) {
        existing.ids.push(item.id);
        existing.totalQuantity += item.quantity;
      } else {
        groups.push({
          item: { ...item },
          ids: [item.id],
          totalQuantity: item.quantity
        });
      }
    });

    return groups;
  }, [order.items, localDismissedItems, isExpediterMode]);

  // Pagination Logic
  const paginatedItems = React.useMemo(() => {
    if (variant !== 'focus') {
      // 非 Focus Mode：返回统一格式
      const itemCount = groupedItems.length;
      let cols = 1;
      if (variant === 'wide' || variant === 'wide-tall') {
        cols = 2;
      } else if (variant === 'full-row') {
        if (itemCount === 1) cols = 1;
        else if (itemCount === 2) cols = 2;
        else cols = 3;
      }
      return { pages: [groupedItems], optimalColumns: cols };
    }
    
    // 🎯 优化 1：精确计算已使用空间
    let usedHeight = 0;
    
    // Header 高度（实际测量）
    usedHeight += 48;  // py-1.5 * 2 + 内容约 36px + border
    
    // Order Note 高度（如果存在）
    if (order.note) {
      usedHeight += 40;  // 实际约 40px（px-2 py-1 + 文字）
    }
    
    // 底部分页按钮区域（仅当有多页时才预留）
    // 先粗略估算是否需要分页，稍后精确计算
    usedHeight += 90;  // 分页按钮 72px + padding-top 18px
    
    // Card 外部 padding 和边框
    usedHeight += 20;  // 上下边距和边框

    const availableHeight = Math.max(400, windowHeight - usedHeight);
    const colWidth = (windowWidth - 32) / 3;
    const textWidth = colWidth - 140; 
    const charsPerLine = Math.max(8, Math.floor(textWidth / 17));
    
    // 🎯 优化 2：精确的高度估算函数（考虑动态字体）
    const estimateItemHeight = (group: typeof groupedItems[0], availableWidth: number) => {
         const { item } = group;
         let h = 0;
         
         // Status bar (Expediter Mode)
         if (isExpediterMode) {
           h += 20;  // py-0.5 * 2 + text + border
         }
         
         // Padding: p-0.5 = 2px * 2 = 4px
         h += 4;
         
         const parts = item.name.split(' / ');
         const eng = parts[0];
         const chi = parts[1];
         const showEng = language === 'en' || language === 'bi' || (language === 'zh' && !chi);
         const showChi = (language === 'zh' || language === 'bi') && !!chi;
         
         // 根据可用宽度计算文本宽度
         const itemTextWidth = availableWidth - 140; // 减去数量和按钮
         const itemCharsPerLine = Math.max(8, Math.floor(itemTextWidth / 17));
         
         // 动态字体大小计算（与渲染逻辑一致）
         const getDynamicFontSize = (text: string, baseSize: number): number => {
           const length = text.length;
           if (length <= 25) return baseSize;
           if (length <= 40) return Math.max(16, baseSize - 2);
           if (length <= 60) return Math.max(16, baseSize - 4);
           if (length <= 80) return Math.max(16, baseSize - 6);
           return 16;
         };
         
         if (showEng) {
             const fontSize = getDynamicFontSize(eng, 22);
             const lineHeight = fontSize * 1.1;  // leading-[1.1]
             const engLines = Math.max(1, Math.ceil(eng.length / itemCharsPerLine));
             h += engLines * lineHeight;
         }
         
         if (showChi) {
             const baseSize = language === 'zh' ? 22 : 19;
             const fontSize = getDynamicFontSize(chi!, baseSize);
             const lineHeight = fontSize * 1.2;  // leading-tight
             const chiCharsPerLine = Math.max(6, Math.floor(itemTextWidth / 26));
             const chiLines = Math.max(1, Math.ceil(chi!.length / chiCharsPerLine));
             h += chiLines * lineHeight;
             if (showEng) h += 2;  // mt-0.5 = 2px
         }
         
         if (item.notes && item.notes.length > 0) {
             h += 4;  // mt-1 = 4px
             // Notes 通常是单行小标签，保守估算
             const noteRows = Math.ceil(item.notes.length / 3);  // 假设每行3个标签
             h += noteRows * 26;  // 每行约 26px（14px text + padding + gap）
         }
         
         // Border
         h += 4;  // border-2 * 2
         
         return Math.ceil(h);
    };

    // 🎯 新增：智能列数计算函数
    const calculateOptimalColumns = (items: typeof groupedItems): number => {
      const itemCount = items.length;
      
      // 特殊情况：1-2个items
      if (itemCount === 1) return 1;
      if (itemCount === 2) {
        // 2个items：根据高度决定
        const heights = items.map(item => estimateItemHeight(item, (windowWidth - 32) / 2));
        const avgHeight = heights.reduce((a, b) => a + b, 0) / heights.length;
        // 如果平均高度小于120px，用2列；否则1列
        return avgHeight < 120 ? 2 : 1;
      }
      
      // 3+个items：智能分析
      // 先用3列估算高度
      const threeColWidth = (windowWidth - 32) / 3;
      const heights = items.map(item => estimateItemHeight(item, threeColWidth));
      const avgHeight = heights.reduce((a, b) => a + b, 0) / heights.length;
      const maxHeight = Math.max(...heights);
      const minHeight = Math.min(...heights);
      const heightVariance = maxHeight - minHeight;
      
      // 决策逻辑
      if (itemCount <= 3) {
        // 3个items
        if (avgHeight < 90) return 3;  // 短内容：3列
        if (avgHeight < 150) return 2; // 中等：2列
        return 1; // 长内容：1列
      }
      
      if (itemCount <= 5) {
        // 4-5个items
        if (avgHeight < 80) return 3;  // 短内容：3列
        if (avgHeight < 130) return 2; // 中等：2列
        return 1; // 长内容：1列（垂直滚动）
      }
      
      if (itemCount <= 8) {
        // 6-8个items
        if (avgHeight < 70) return 4;  // 很短：4列
        if (avgHeight < 100) return 3; // 短：3列
        if (avgHeight < 150) return 2; // 中等：2列
        return 1; // 长：1列
      }
      
      // 9+个items
      if (avgHeight < 60) return 4;   // 很短：4列
      if (avgHeight < 90) return 3;   // 短：3列
      if (avgHeight < 140) return 2;  // 中等：2列
      return 1; // 长：1列
    };

    const pages: (typeof groupedItems)[] = [];
    let currentPage: (typeof groupedItems) = [];
    let currentHeight = 0;
    let currentRow: (typeof groupedItems) = [];
    
    // 🎯 智能列数：根据内容动态决定
    const optimalColumns = calculateOptimalColumns(groupedItems);
    
    for (let i = 0; i < groupedItems.length; i++) {
        currentRow.push(groupedItems[i]);
        if (currentRow.length === optimalColumns || i === groupedItems.length - 1) {
            const rowColWidth = (windowWidth - 32) / optimalColumns;
            const rowHeight = Math.max(...currentRow.map(item => estimateItemHeight(item, rowColWidth)));
            // 🎯 优化 3：减少行间距 8 -> 2 (gap-0.5)
            if (currentHeight + rowHeight > availableHeight && currentPage.length > 0) {
                pages.push(currentPage);
                currentPage = [];
                currentHeight = 0;
            }
            currentPage.push(...currentRow);
            currentHeight += rowHeight + 2;  // gap-0.5 = 2px
            currentRow = [];
        }
    }
    if (currentPage.length > 0) pages.push(currentPage);
    
    // 返回分页数据和最优列数
    return { pages, optimalColumns };
  }, [groupedItems, variant, windowHeight, windowWidth, order.note, isExpediterMode, language]);

  const totalPages = paginatedItems.pages.length;
  const optimalColumns = paginatedItems.optimalColumns;
  // If we dismissed items and the current page is now empty/invalid, adjust it.
  // Although simpler to just let it re-render. 
  // If current page > totalPages, go back.
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const currentItems = paginatedItems.pages[currentPage - 1] || [];

  React.useEffect(() => { setCurrentPage(1); }, [order.id, variant]);

  // Determine global selection for the card (if single item)
  const isCardSelected = order.items.length === 1 && selectedItemIds && selectedItemIds.has(order.items[0].id);

  // Expediter Check: All items completed?
  const allItemsCompleted = order.items.every(i => i.completed);

  // In Expediter Mode, if all items are dismissed, complete the order (triggers removal)
  React.useEffect(() => {
    if (isExpediterMode && groupedItems.length === 0 && order.items.length > 0) {
      // All items have been served, complete the order
      onComplete(order.id);
    }
  }, [isExpediterMode, groupedItems.length, order.id, order.items.length, onComplete]);

  return (
      <Card 
        className={cn(
          "relative flex flex-col transition-all bg-black overflow-hidden",
          variant === 'summary' ? "" : "h-full",
          styles.statusBar,
          styles.cardBorder,
          isCardSelected && "border-blue-500 shadow-2xl scale-[0.98] z-20"
        )}
      >
        {/* Optimized Compact Header */}
        <div 
            onClick={() => {
                if (order.items.length === 1 && onToggleSelection && !isExpediterMode) {
                    onToggleSelection(order.id, order.items[0].id);
                }
            }}
            className={cn(
            "px-3 py-1.5 flex items-center justify-between min-w-0 shrink-0 relative z-10 transition-colors duration-200 select-none", 
            styles.header,
            // styles.headerRadius removed to allow parent Card overflow-hidden to handle clipping for perfect fit
            isCardSelected && "bg-blue-600 text-white",
            (order.items.length === 1 && onToggleSelection && !isExpediterMode) && "cursor-pointer hover:brightness-110 active:brightness-90"
        )}>
          <div className="flex items-center gap-1.5 min-w-0">
            {/* ITEM VIEW SELECT CHECKBOX */}
            {order.items.length === 1 && onToggleSelection && !onSelectAllOrder && !isExpediterMode && (
                <Button
                   variant="ghost"
                   size="icon"
                   className={cn(
                       "w-8 h-8 transition-all pointer-events-none",
                       isCardSelected 
                         ? "bg-blue-500 text-white shadow-sm" 
                         : "bg-black/20 text-white"
                   )}
                >
                   {isCardSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                </Button>
            )}

            {/* Table Badge - Bigger */}
            <div className={cn(
              "h-10 min-w-[3.5rem] px-2 flex items-center justify-center text-2xl font-black tracking-tight whitespace-nowrap shadow-md",
              styles.badge
            )}>
              {order.tableNo}
            </div>
            {/* Order ID - Bigger */}
            <span className="text-3xl font-black tracking-tighter whitespace-nowrap leading-none text-white drop-shadow-sm">
              #{order.displayId.toString().padStart(4, '0')}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* Timer - Compact */}
            <div className={cn(
              "flex items-center gap-1 font-semibold text-base shrink-0",
              styles.timer
            )}>
              <Clock className="h-3.5 w-3.5 opacity-80" />
              <span>{formatDuration(elapsed)}</span>
            </div>

            {/* Quick Complete Order - Smaller */}
            {order.items.length > 1 && (
                <Button 
                   variant="ghost" 
                   size="icon" 
                   className="w-8 h-8 bg-black/20 hover:bg-white text-white hover:text-green-600 transition-colors"
                   onClick={(e) => {
                       e.stopPropagation();
                       
                       if (isExpediterMode) {
                           // In Expediter Mode: Dismiss all items (serve entire order)
                           const allItemIds = new Set(order.items.map(item => item.id));
                           setLocalDismissedItems(allItemIds);
                       } else {
                           // In Kitchen Mode: Quick complete all items
                           onQuickCompleteOrder?.(order.id);
                       }
                   }}
                >
                   <CheckCheck className="w-4 h-4" />
                </Button>
            )}
          </div>
          
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        </div>

        <CardContent className={cn(
          "bg-black flex flex-col relative p-0",
          variant === 'summary' ? "" : "flex-1 min-h-0 overflow-hidden"
        )}>
          {order.note && (
            <div className="bg-amber-950/40 px-2 py-1 text-amber-100 border-b border-amber-800 shrink-0 flex flex-col shadow-sm relative z-10">
               <div className="font-bold text-sm break-words leading-tight">{t.note}: {order.note}</div>
            </div>
          )}

          <div className={cn(
               "grid content-start gap-0.5",
               variant === 'summary' ? "" : "flex-1 min-h-0 overflow-y-auto",
               (() => {
                 if (variant === 'wide' || variant === 'wide-tall') {
                   return "grid-cols-2";
                 } else if (variant === 'full-row' || variant === 'focus') {
                   // 🎯 Focus Mode：使用智能计算的列数
                   if (variant === 'focus') {
                     switch (optimalColumns) {
                       case 1: return "grid-cols-1";
                       case 2: return "grid-cols-2";
                       case 3: return "grid-cols-3";
                       case 4: return "grid-cols-4";
                       default: return "grid-cols-3";
                     }
                   }
                   // Full-row Mode：简单逻辑
                   const itemCount = groupedItems.length;
                   if (itemCount === 1) return "grid-cols-1";
                   if (itemCount === 2) return "grid-cols-2";
                   return "grid-cols-3";
                 }
                 return "grid-cols-1";
               })(),
               // 🎯 优化 4：动态底部 padding - 只在多页时添加
               (variant === 'focus' && totalPages > 1) ? "pb-[78px]" : ""
             )}>
                {(variant === 'focus' ? currentItems : groupedItems).map((group, idx) => {
                  const { item, totalQuantity, ids } = group;
                  // Determine Selection State for styling
                  const isSelected = selectedItemIds ? ids.every(id => selectedItemIds.has(id)) : false;
                  
                  // Check if item is locally checked (Expediter) or globally completed (Kitchen)
                  const isLocalChecked = isExpediterMode && ids.every(id => expediterCheckedIds.has(id) || item.completed);
                  const isChecked = isExpediterMode ? isLocalChecked : item.completed;

                  return (
                  <div 
                    key={idx} 
                    className={cn(
                        "flex flex-col shadow-sm break-inside-avoid relative transition-all overflow-hidden border-2",
                        isSelected ? "bg-blue-50 border-blue-300" : "bg-white border-slate-200", 
                        !isSelected && isChecked ? "bg-slate-50 opacity-70 border-slate-300" : ""
                    )}
                    onClick={() => {
                        if (isExpediterMode) {
                            // Local toggle for Expediter Mode (does not affect Kitchen status)
                            const newSet = new Set(expediterCheckedIds);
                            ids.forEach(id => {
                                // If already checked (or completed), toggle off? 
                                // Actually, if completed globally, we probably shouldn't toggle it off locally?
                                // Assuming we just toggle the local ID presence.
                                if (newSet.has(id)) newSet.delete(id);
                                else newSet.add(id);
                            });
                            setExpediterCheckedIds(newSet);
                        } else if (onItemToggle) {
                            // Global toggle for Kitchen Mode
                            ids.forEach(id => onItemToggle(order.id, id));
                        }
                    }}
                  >
                    {/* EXPEDITER STATUS BAR - Compact */}
                    {isExpediterMode && (
                        <div 
                            className={cn(
                                "w-full px-2 py-0.5 text-[11px] font-black tracking-[0.15em] uppercase flex items-center justify-end border-b select-none pointer-events-none",
                                item.completed 
                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                                    : "bg-orange-100 text-orange-700 border-orange-200"
                            )}
                        >
                            {item.completed ? t.done : t.cooking}
                        </div>
                    )}

                    <div className="flex items-start p-0.5 gap-1.5 w-full">
                        <div className="flex-1 min-w-0 flex items-start pointer-events-none">
                            <span className={cn(
                              "font-black text-right shrink-0 leading-none mr-1.5 min-w-[2.2rem] mt-0.5",
                              "text-[30px]",
                              isChecked ? "text-slate-400" : "text-black"
                            )}>
                              {totalQuantity}x
                            </span>
                            
                            <div className="flex-1 min-w-0 flex flex-col">
                              {(() => {
                                  const [en, zh] = item.name.split(' / ');
                                  const showEn = language === 'en' || language === 'bi' || (language === 'zh' && !zh);
                                  const showZh = (language === 'zh' || language === 'bi') && !!zh;
                                  
                                  // 动态字体大小计算函数
                                  const getDynamicFontSize = (text: string, baseSize: number): number => {
                                    const length = text.length;
                                    if (length <= 25) return baseSize; // 短文本：保持原大小
                                    if (length <= 40) return Math.max(20, baseSize - 2); // 中等长度：-2px
                                    if (length <= 60) return Math.max(18, baseSize - 4); // 长文本：-4px
                                    if (length <= 80) return Math.max(18, baseSize - 6); // 很长：-6px
                                    return 18; // 超长：最小 18px
                                  };
                                  
                                  // 计算英文和中文的字体大小 - 增大基准字号
                                  const enFontSize = showEn ? getDynamicFontSize(en, 26) : 26;
                                  const zhFontSize = showZh ? getDynamicFontSize(zh!, language === 'zh' ? 26 : 23) : 23;
                                  
                                  return (
                                    <>
                                      {showEn && (
                                        <div 
                                            className={cn(
                                                "font-bold leading-[1.1] w-full tracking-[0.05px]",
                                                "[overflow-wrap:anywhere] hyphens-auto",
                                                isChecked ? "line-through text-slate-400" : "text-black"
                                            )}
                                            style={{ fontSize: `${enFontSize}px` }}
                                        >
                                            {en}
                                        </div>
                                      )}
                                      
                                      {showZh && (
                                        <div 
                                            className={cn(
                                                "font-bold leading-tight w-full tracking-[-0.4px]",
                                                "[overflow-wrap:anywhere] hyphens-auto",
                                                language === 'zh' ? "mt-0" : "mt-0.5",
                                                isChecked ? "text-slate-400" : "text-[#0f172b]"
                                            )}
                                            style={{ fontSize: `${zhFontSize}px` }}
                                        >
                                            {zh}
                                        </div>
                                      )}
                                    </>
                                  );
                              })()}
                              
                              {item.notes && item.notes.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5 w-full">
                                  {item.notes.map((note, nIdx) => {
                                      // Always show both English and Chinese
                                      const [nEn, nZh] = note.split(' / ');
                                      
                                      // Determine display text based on language setting
                                      let displayText = '';
                                      if (language === 'bi') {
                                        // Bilingual: show both English and Chinese
                                        displayText = note; // Keep original format
                                      } else if (language === 'en') {
                                        displayText = nEn;
                                      } else if (language === 'zh') {
                                        displayText = nZh || nEn;
                                      } else {
                                        // Default to bilingual
                                        displayText = note;
                                      }
                                      
                                      // Adaptive font size based on content length
                                      const isLong = displayText.length > 20;
                                      
                                      return (
                                        <span 
                                          key={nIdx} 
                                          className={cn(
                                            "font-black px-1.5 py-0.5 text-black border-2 border-black/10 uppercase tracking-tight",
                                            note.includes("No") || note.includes("不要") ? "bg-red-100 text-red-900 border-red-200" : "bg-yellow-100",
                                            isLong ? "text-xs" : "text-sm"
                                          )}
                                        >
                                          {displayText}
                                        </span>
                                      );
                                  })}
                                </div>
                              )}
                              
                              {item.specialRequest && (
                                <div className="mt-1.5 font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 text-sm border-2 border-purple-100 w-full break-words">
                                    <span className="mr-1">★</span>{item.specialRequest}
                                </div>
                              )}
                            </div>
                        </div>
                        
                        {/* Checkbox - Right Side */}
                        <div className="flex items-start pt-1 pl-1">
                             <div className={cn(
                                 "w-7 h-7 border-2 flex items-center justify-center transition-all shadow-sm",
                                 isChecked 
                                     ? "bg-green-500 border-green-600" 
                                     : "bg-white border-slate-300"
                             )}>
                                 {isChecked && <Check className="w-5 h-5 text-white stroke-[3]" />}
                             </div>
                        </div>
                    </div>
                  </div>
                  );
                })}
          </div>
        </CardContent>

        {/* BOTTOM PAGINATION CONTROLS (Only for Focus Mode if multiple pages) */}
        {variant === 'focus' && totalPages > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-[78px] bg-slate-900/95 border-t border-slate-700 flex items-center justify-between px-4 z-20 backdrop-blur-sm">
                 <Button 
                   variant="secondary"
                   size="lg"
                   onClick={(e) => {
                       e.stopPropagation();
                       if (currentPage > 1) setCurrentPage(c => c - 1);
                   }}
                   disabled={currentPage === 1}
                   className="h-14 px-6 text-xl font-bold bg-slate-800 text-white border-slate-700 hover:bg-slate-700 disabled:opacity-30"
                 >
                     <ChevronLeft className="w-8 h-8 mr-1" /> Prev
                 </Button>

                 <div className="flex flex-col items-center">
                     <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Page</span>
                     <span className="text-3xl font-black text-white leading-none">
                         {currentPage} <span className="text-slate-600">/</span> {totalPages}
                     </span>
                 </div>

                 <Button 
                   variant="secondary"
                   size="lg"
                   onClick={(e) => {
                       e.stopPropagation();
                       if (currentPage < totalPages) setCurrentPage(c => c + 1);
                   }}
                   disabled={currentPage === totalPages}
                   className="h-14 px-6 text-xl font-bold bg-white text-slate-900 hover:bg-slate-200 disabled:opacity-30"
                 >
                     Next <ChevronRight className="w-8 h-8 ml-1" />
                 </Button>
            </div>
        )}
      </Card>
  );
}
