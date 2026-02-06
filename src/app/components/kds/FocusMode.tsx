import * as React from "react";
import { Order } from "@/app/data/mock";
import { OrderCard } from "./OrderCard";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FocusModeProps {
  orders: Order[];
  onCompleteOrder: (id: string) => void;
  onItemToggle: (orderId: string, itemId: string) => void;
  onRushToggle: (orderId: string) => void;
  language?: 'en' | 'zh' | 'bi';
}

export function FocusMode({ orders, onCompleteOrder, onItemToggle, onRushToggle, language }: FocusModeProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Ensure index is valid when orders change
  React.useEffect(() => {
    if (orders.length === 0) {
        setCurrentIndex(0);
    } else if (currentIndex >= orders.length) {
      setCurrentIndex(orders.length - 1);
    }
  }, [orders.length]);

  const currentOrder = orders[currentIndex];

  if (!currentOrder) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
        <div className="text-4xl font-black opacity-20">NO ACTIVE ORDERS</div>
        <div className="text-xl font-medium opacity-50">Great job clearing the queue!</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Main Card Area */}
      <div className="flex-1 p-4 min-h-0 container mx-auto max-w-7xl">
        <OrderCard 
          key={currentOrder.id} // Re-mount on change to reset internal pagination
          order={currentOrder}
          onComplete={onCompleteOrder}
          onItemToggle={onItemToggle}
          onRushToggle={onRushToggle}
          variant="focus"
          language={language}
        />
      </div>

      {/* Bottom Navigation Bar */}
      <div className="h-24 bg-black border-t border-slate-800 flex items-center justify-between px-8 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <Button 
          variant="outline"
          className="h-16 w-48 text-xl font-bold border-2 border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 rounded-xl shadow-sm"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
        >
          <ChevronLeft className="h-8 w-8 mr-2" /> PREV
        </Button>

        <div className="flex flex-col items-center gap-1">
            <div className="text-2xl font-black text-white tracking-tight">
                PAGE {currentIndex + 1} / {orders.length}
            </div>
            <div className="text-base font-semibold text-slate-400">
                {orders.length} Active Orders
            </div>
        </div>

        <Button 
          variant="default"
          className="h-16 w-48 text-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg rounded-xl border border-blue-400"
          disabled={currentIndex === orders.length - 1}
          onClick={() => setCurrentIndex(prev => Math.min(orders.length - 1, prev + 1))}
        >
          NEXT <ChevronRight className="h-8 w-8 ml-2" />
        </Button>
      </div>
    </div>
  );
}
