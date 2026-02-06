import * as React from "react";
import { Order } from "@/app/data/mock";
import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/app/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Search, Calendar, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/hooks";

import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";

interface HistoryModeProps {
  history: Order[];
  onRecallOrder: (id: string) => void;
  language?: 'en' | 'zh' | 'bi';
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}

type SortField = 'time' | 'id' | 'table';
type SortDirection = 'asc' | 'desc';

export function HistoryMode({ history, onRecallOrder, language = 'bi', selectedIds, onSelectionChange }: HistoryModeProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortField, setSortField] = React.useState<SortField>('time');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  
  // State for dynamic items per page calculation
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const calculateItemsPerPage = () => {
        if (!containerRef.current) return;
        
        // Available height in the container
        const containerHeight = containerRef.current.clientHeight;
        const headerHeight = 64; // h-16 = 64px
        const rowHeight = 96;    // h-24 = 96px
        
        // Calculate available space for rows
        const availableHeight = containerHeight - headerHeight;
        
        // Calculate number of rows that can fit
        // Ensure at least 1 row
        const count = Math.max(1, Math.floor(availableHeight / rowHeight));
        
        setItemsPerPage(count);
    };

    // Calculate on mount
    calculateItemsPerPage();

    // Calculate on resize
    const observer = new ResizeObserver(calculateItemsPerPage);
    if (containerRef.current) {
        observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const t = (en: string, zh: string) => {
      if (language === 'en') return en;
      if (language === 'zh') return zh;
      return `${en} / ${zh}`;
  };

  const handleSort = (field: SortField) => {
      if (sortField === field) {
          setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
      } else {
          setSortField(field);
          setSortDirection('asc');
      }
  };

  const sortedAndFilteredHistory = React.useMemo(() => {
    let data = [...history];
    
    // 1. Filter
    if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        data = data.filter(o => 
           o.tableNo.toLowerCase().includes(lower) || 
           o.displayId.toLowerCase().includes(lower) ||
           (o.customerName && o.customerName.toLowerCase().includes(lower))
        );
    }

    // 2. Sort
    data.sort((a, b) => {
        let res = 0;
        switch (sortField) {
            case 'time':
                const tA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
                const tB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
                res = tA - tB;
                break;
            case 'id':
                res = a.displayId.localeCompare(b.displayId);
                break;
            case 'table':
                res = a.tableNo.localeCompare(b.tableNo, undefined, { numeric: true, sensitivity: 'base' });
                break;
        }
        return sortDirection === 'asc' ? res : -res;
    });

    return data;
  }, [history, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedAndFilteredHistory.length / itemsPerPage);
  
  const currentItems = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredHistory.slice(start, start + itemsPerPage);
  }, [sortedAndFilteredHistory, currentPage, itemsPerPage]);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleSelection = (id: string) => {
      const next = new Set(selectedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onSelectionChange(next);
  };

  const toggleAll = () => {
      if (selectedIds.size === currentItems.length && currentItems.length > 0) {
          onSelectionChange(new Set());
      } else {
          const newSet = new Set(selectedIds);
          currentItems.forEach(item => newSet.add(item.id));
          onSelectionChange(newSet);
      }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
      if (sortField !== field) return <ArrowUpDown className="ml-2 h-5 w-5 opacity-30" />;
      return sortDirection === 'asc' 
          ? <ArrowUp className="ml-2 h-5 w-5 text-emerald-600" />
          : <ArrowDown className="ml-2 h-5 w-5 text-emerald-600" />;
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 space-y-4 bg-black">
       {/* Header Section */}
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-50 shrink-0">
           <div className="flex items-center gap-6">
               <div>
                   <h1 className="text-3xl font-bold tracking-tight">{language === 'zh' ? '歷史訂單' : 'Order History'}</h1>
                   <p className="text-slate-400 text-lg">{language === 'zh' ? '查看與管理歷史紀錄' : 'View and manage past orders'}</p>
               </div>

               {selectedIds.size > 0 && (
                   /* Button removed as requested */
                   null
               )}
           </div>
           <div className="relative w-full md:w-80 text-slate-900">
               <Search className="absolute left-3 top-3.5 h-6 w-6 text-slate-500" />
               <Input 
                 placeholder={language === 'zh' ? "搜尋桌號或姓名..." : "Search table or name..."}
                 className="pl-12 h-14 text-lg bg-white border-slate-200 focus-visible:ring-slate-400 shadow-sm rounded-lg"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
           </div>
       </div>

       {/* Table Section */}
       <div 
            ref={containerRef}
            className="border border-slate-800 bg-white flex-1 overflow-hidden shadow-sm rounded-xl"
       >
           <Table>
               <TableHeader>
                   <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200 h-16">
                       <TableHead className="w-[80px] pl-6">
                           <Checkbox 
                               className="h-6 w-6 border-2 border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                               checked={currentItems.length > 0 && currentItems.every(i => selectedIds.has(i.id))}
                               onCheckedChange={toggleAll}
                           />
                       </TableHead>
                       
                       {/* Sortable Headers with large touch targets */}
                       <TableHead 
                            className="text-slate-700 font-bold text-lg cursor-pointer hover:bg-slate-100 transition-colors select-none py-4"
                            onClick={() => handleSort('time')}
                       >
                           <div className="flex items-center h-full">
                               {t('Time', '時間')}
                               <SortIcon field="time" />
                           </div>
                       </TableHead>
                       
                       <TableHead className="text-slate-700 font-bold text-lg py-4">{t('Duration', '耗時')}</TableHead>
                       
                       <TableHead 
                            className="text-slate-700 font-bold text-lg cursor-pointer hover:bg-slate-100 transition-colors select-none py-4"
                            onClick={() => handleSort('id')}
                       >
                            <div className="flex items-center h-full">
                               {t('ID', '單號')}
                               <SortIcon field="id" />
                            </div>
                       </TableHead>
                       
                       <TableHead 
                            className="text-slate-700 font-bold text-lg cursor-pointer hover:bg-slate-100 transition-colors select-none py-4"
                            onClick={() => handleSort('table')}
                       >
                            <div className="flex items-center h-full">
                                {t('Table', '桌號')}
                                <SortIcon field="table" />
                            </div>
                       </TableHead>

                       <TableHead className="text-slate-700 font-bold text-lg w-[35%] py-4">{t('Items', '品項')}</TableHead>
                       <TableHead className="text-slate-700 font-bold text-lg py-4">{t('Status', '狀態')}</TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {currentItems.length === 0 ? (
                       <TableRow>
                           <TableCell colSpan={7} className="h-32 text-center text-xl text-slate-500">
                               {t('No history found.', '無歷史紀錄')}
                           </TableCell>
                       </TableRow>
                   ) : (
                       currentItems.map((order, index) => (
                           <TableRow 
                                key={order.id} 
                                className={cn(
                                    "cursor-pointer transition-colors h-24 box-border border-b border-slate-100 last:border-0", 
                                    selectedIds.has(order.id) ? "bg-blue-50 hover:bg-blue-100" : (index % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50/50 hover:bg-slate-100")
                                )}
                                onClick={() => toggleSelection(order.id)}
                           >
                               <TableCell className="pl-6" onClick={(e) => e.stopPropagation()}>
                                   <Checkbox 
                                     className="h-6 w-6 border-2 border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                     checked={selectedIds.has(order.id)}
                                     onCheckedChange={() => toggleSelection(order.id)}
                                   />
                               </TableCell>
                               <TableCell className="font-mono text-slate-500 text-lg">
                                   <div className="flex items-center gap-3">
                                       <Calendar className="h-5 w-5 opacity-70" />
                                       {order.completedAt ? format(order.completedAt, "HH:mm:ss") : "-"}
                                   </div>
                               </TableCell>
                               <TableCell className="font-mono text-slate-700 text-lg">
                                   {order.waitDuration ? formatDuration(order.waitDuration) : "-"}
                               </TableCell>
                               <TableCell className="font-mono font-medium text-slate-900 text-xl">
                                   #{order.displayId.padStart(4, '0')}
                               </TableCell>
                               <TableCell className="font-black text-slate-900 text-2xl">
                                   {order.tableNo}
                               </TableCell>
                               <TableCell className="text-slate-700">
                                   <div className="flex flex-col gap-1.5 py-1">
                                       {order.items.slice(0, 2).map((item, i) => {
                                           const [en, zh] = item.name.split(' / ');
                                           let displayName = en;
                                           if (language === 'zh') displayName = zh || en;
                                           else if (language === 'bi') displayName = item.name;
                                           
                                           return (
                                               <span key={i} className="text-base truncate max-w-[280px] font-medium leading-tight">
                                                   <span className="font-bold mr-1.5 text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded-md">{item.quantity}x</span> 
                                                   {displayName}
                                               </span>
                                           );
                                       })}
                                       {order.items.length > 2 && (
                                           <span className="text-sm text-slate-500 font-bold px-2">
                                               +{order.items.length - 2} {t('more...', '更多...')}
                                           </span>
                                       )}
                                   </div>
                               </TableCell>
                               <TableCell>
                                   <Badge 
                                    variant={order.status === 'cancelled' ? "destructive" : "secondary"} 
                                    className={cn(
                                        "h-8 px-3 text-base font-bold",
                                        order.status === 'completed' ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" : ""
                                    )}
                                   >
                                       {order.status === 'cancelled' ? t('Cancelled', '已取消') : t('Completed', '已完成')}
                                   </Badge>
                               </TableCell>
                           </TableRow>
                       ))
                   )}
               </TableBody>
           </Table>
       </div>
       
       {/* Pagination with large touch targets */}
       <div className="py-2 text-slate-50 shrink-0">
           <Pagination>
             <PaginationContent className="gap-2">
               <PaginationItem>
                 <PaginationPrevious 
                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                   className={cn(
                       "h-14 px-6 text-lg border-2 transition-all cursor-pointer rounded-lg",
                       "hover:bg-slate-800 hover:text-slate-50 hover:border-slate-700 bg-slate-900 text-slate-300 border-slate-800",
                       currentPage === 1 && "pointer-events-none opacity-50"
                   )}
                 />
               </PaginationItem>
               
               <div className="hidden md:flex gap-2">
                   {/* Logic to limit visible pages if totalPages is huge, but here we just show what fits or limit to 5 */}
                   {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 8).map(page => (
                     <PaginationItem key={page}>
                       <PaginationLink 
                         isActive={page === currentPage}
                         onClick={() => setCurrentPage(page)}
                         className={cn(
                             "h-14 w-14 text-lg font-bold border-2 transition-all cursor-pointer rounded-lg",
                             page === currentPage 
                                ? "bg-white text-slate-900 border-white hover:bg-slate-100" 
                                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700"
                         )}
                       >
                         {page}
                       </PaginationLink>
                     </PaginationItem>
                   ))}
                   {totalPages > 8 && (
                       <div className="flex items-end px-2 text-slate-500 font-bold">...</div>
                   )}
               </div>

               {/* Mobile simple page indicator */}
               <div className="md:hidden flex items-center px-4 text-lg font-bold">
                    {currentPage} / {totalPages || 1}
               </div>
               
               <PaginationItem>
                 <PaginationNext 
                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                   className={cn(
                       "h-14 px-6 text-lg border-2 transition-all cursor-pointer rounded-lg",
                       "hover:bg-slate-800 hover:text-slate-50 hover:border-slate-700 bg-slate-900 text-slate-300 border-slate-800",
                       currentPage === totalPages && "pointer-events-none opacity-50"
                   )}
                 />
               </PaginationItem>
             </PaginationContent>
           </Pagination>
       </div>
    </div>
  );
}
