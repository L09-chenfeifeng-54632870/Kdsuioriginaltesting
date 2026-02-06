import * as React from "react";
import { Order, Station, OrderItem } from "@/app/data/mock";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRight, UtensilsCrossed, Flame, Snowflake, Waves, Check, Clock, CookingPot, Soup, Utensils } from "lucide-react";
import { motion } from "motion/react";

interface SummaryModeProps {
  orders: Order[];
  language?: 'en' | 'zh' | 'bi';
  onItemToggle?: (orderId: string, itemId: string) => void;
}

interface AggregatedItem {
  id: string; // item id
  name: string;
  total: number;
  station: Station;
  details: { 
    orderId: string;
    displayId: string;
    tableNo: string; 
    quantity: number; 
    notes?: string[];
    waitFormatted: string;
    elapsedSeconds: number;
    items: OrderItem[];
  }[];
}

const STATION_ICONS: Record<Station, React.ElementType> = {
  wok: Flame,
  steamer: CookingPot,
  roast: Utensils,
  cold: Snowflake,
  noodle: Soup
};

const STATION_COLORS: Record<Station, string> = {
  wok: "text-red-600 bg-red-100",
  steamer: "text-slate-600 bg-slate-200",
  roast: "text-amber-700 bg-amber-100",
  cold: "text-blue-500 bg-blue-100",
  noodle: "text-yellow-600 bg-yellow-100"
};

import { OrderCard } from "./OrderCard";

export function SummaryMode({ orders, language, onItemToggle }: SummaryModeProps) {
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null);

  // Aggregate Items
  const aggregatedItems = React.useMemo(() => {
    const map = new Map<string, AggregatedItem>();

    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.completed) return;

        // Group by Name + Notes (Product Variation)
        // This ensures identical dishes across tables are aggregated
        const notesKey = item.notes ? [...item.notes].sort().join('|') : '';
        const key = `${item.name}::${notesKey}`;
        
        if (!map.has(key)) {
          map.set(key, {
            id: key, // Use composite key as ID
            name: item.name,
            total: 0,
            station: item.station,
            details: []
          });
        }
        
        const entry = map.get(key)!;
        entry.total += item.quantity;
        
        // Check if we already have this table for this item (to merge lines if split in data)
        const existingDetail = entry.details.find(d => d.orderId === order.id);
        if (existingDetail) {
          existingDetail.quantity += item.quantity;
          existingDetail.items.push(item);
          if (item.notes) existingDetail.notes = [...(existingDetail.notes || []), ...item.notes];
        } else {
            // Calc wait time roughly
            const diffMs = new Date().getTime() - order.createdAt.getTime();
            const mins = Math.floor(diffMs / 60000);
            const seconds = diffMs / 1000;

            entry.details.push({
                orderId: order.id,
                displayId: order.displayId,
                tableNo: order.tableNo,
                quantity: item.quantity,
                notes: item.notes,
                waitFormatted: `${mins}m`,
                elapsedSeconds: seconds,
                items: [item]
            });
        }
      });
    });

    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [orders]);

  // Auto select first if none selected or if selected item no longer exists
  React.useEffect(() => {
    if (aggregatedItems.length > 0) {
      const selectedStillExists = aggregatedItems.find(i => i.id === selectedItemId);
      if (!selectedItemId || !selectedStillExists) {
        setSelectedItemId(aggregatedItems[0].id);
      }
    } else {
      setSelectedItemId(null);
    }
  }, [aggregatedItems, selectedItemId]);

  const selectedItem = aggregatedItems.find(i => i.id === selectedItemId);

  if (orders.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
         <p>No active orders to summarize.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-muted/20">
      {/* Left Column: Aggregated List */}
      <div className="w-1/3 min-w-[300px] border-r bg-background flex flex-col">
        <div className="p-4 border-b bg-muted/10">
           <h2 className="font-bold text-lg">Production List</h2>
           <p className="text-xs text-muted-foreground">Total {aggregatedItems.length} unique items</p>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
             {aggregatedItems.map((item) => {
               const Icon = STATION_ICONS[item.station] || UtensilsCrossed;
               return (
                 <button
                   key={item.id}
                   onClick={() => setSelectedItemId(item.id)}
                   className={cn(
                     "flex items-center justify-between p-6 border-b text-left hover:bg-muted/50 transition-colors focus:outline-none min-h-[80px]",
                     selectedItemId === item.id && "bg-primary/5 border-l-8 border-l-primary"
                   )}
                 >
                   <div className="flex items-center gap-4">
                      <div className="flex items-center justify-end min-w-[2.5rem]">
                        <span className="text-3xl font-extrabold font-mono">{item.total}</span>
                      </div>

                      <div>
                        <span className="font-bold text-lg block">{item.name}</span>
                        <span className="text-sm text-muted-foreground capitalize">{item.station} Station</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <ChevronRight className="h-6 w-6 text-muted-foreground" />
                   </div>
                 </button>
               );
             })}
          </div>
        </ScrollArea>
      </div>

      {/* Right Column: Details */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {selectedItem ? (
           <>
             <div className="p-4 border-b bg-white shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{selectedItem.name}</h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                             Preparing <strong className="text-slate-900">{selectedItem.total}</strong> portions across {selectedItem.details.length} tables
                        </p>
                    </div>

                </div>
             </div>

             <ScrollArea className="flex-1 p-2">
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                     {selectedItem.details.map((detail, idx) => {
                         // Create synthetic order to reuse OrderCard component
                         // This ensures perfect visual consistency with the main GridMode
                         const syntheticOrder: Order = {
                             id: detail.orderId,
                             displayId: detail.displayId,
                             tableNo: detail.tableNo,
                             createdAt: new Date(Date.now() - detail.elapsedSeconds * 1000),
                             status: detail.elapsedSeconds > 20 * 60 ? 'alert' : detail.elapsedSeconds > 10 * 60 ? 'warning' : 'pending',
                             type: 'dine-in',
                             items: detail.items
                         };

                         return (
                             <motion.div 
                               key={`${detail.orderId}-${idx}`}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: idx * 0.05 }}
                             >
                                <OrderCard 
                                    order={syntheticOrder}
                                    onComplete={() => {}} 
                                    onItemToggle={onItemToggle}
                                    variant="summary"
                                    language={language}
                                />
                             </motion.div>
                         );
                     })}
                 </div>
             </ScrollArea>
           </>
        ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select an item to view details
            </div>
        )}
      </div>
    </div>
  );
}
