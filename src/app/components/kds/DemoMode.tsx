import * as React from "react";
import { Order, OrderItem } from "@/app/data/mock";
import { OrderCard } from "./OrderCard";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Helper to create mock orders for demo
const createDemoOrder = (id: string, status: Order['status'], items: Partial<OrderItem>[], overrides: Partial<Order> = {}): Order => {
  return {
    id: `demo-${id}`,
    displayId: parseInt(id),
    tableNo: `T${id}`,
    status,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 30), // Random time in last 30 mins
    items: items.map((item, idx) => ({
      id: `item-${id}-${idx}`,
      name: item.name || "Demo Item",
      quantity: item.quantity || 1,
      completed: item.completed || false,
      notes: item.notes || [],
      specialRequest: item.specialRequest || undefined
    })),
    isRush: false,
    isRedo: false,
    ...overrides
  };
};

export function DemoMode() {
  const [columns, setColumns] = React.useState(4);
  const [isExpediterMode, setIsExpediterMode] = React.useState(true);

  // Responsive Grid Logic
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) setColumns(2);
      else setColumns(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const demoOrders: Order[] = React.useMemo(() => [
    // 1. Standard Simple Order - Mixed Status for Expediter Demo
    createDemoOrder("101", "pending", [
        { name: "Beef Noodle Soup / 牛肉麵", quantity: 1, completed: true }, // Kitchen DONE
        { name: "Coke / 可樂", quantity: 1, completed: false }               // Kitchen COOKING
    ]),

    // 2. Order with Modifiers - Mixed Status
    createDemoOrder("102", "pending", [
        { name: "Burger / 漢堡", quantity: 1, notes: ["No Onion", "Extra Cheese", "Well Done"], completed: true },
        { name: "Fries / 薯條", quantity: 1, notes: ["No Salt"], completed: false }
    ]),

    // 3. Rush Order - Mixed Status
    createDemoOrder("103", "pending", [
        { name: "Express Meal A", quantity: 1, completed: true },
        { name: "Ice Cream", quantity: 2, completed: false }
    ], { isRush: true }),

    // 4. Single Item Order - DONE (Will disappear when served in Expediter Mode)
    createDemoOrder("104", "pending", [
        { name: "Coffee / 咖啡", quantity: 1, completed: true }
    ], { tableNo: "T5" }),

    // 5. Single Item Order - COOKING (Will disappear when served in Expediter Mode)
    createDemoOrder("105", "pending", [
        { name: "Green Tea / 綠茶", quantity: 1, completed: false }
    ], { tableNo: "T6" }),

    // 6. Long Order (Multi-page Pagination) - Mixed Status
    createDemoOrder("106", "pending", [
        { name: "Spicy Tofu / 麻婆豆腐", quantity: 1, completed: true },
        { name: "Kung Pao Chicken / 宮保雞丁", quantity: 1, completed: true },
        { name: "Fried Rice / 炒飯", quantity: 2, completed: true },
        { name: "Wonton Soup / 餛飩湯", quantity: 1, completed: false },
        { name: "Spring Rolls / 春捲", quantity: 3, completed: false },
        { name: "Dumplings / 水餃", quantity: 10, completed: false },
        { name: "Green Tea / 綠茶", quantity: 4, completed: true },
        { name: "Mango Pudding / 芒果布丁", quantity: 4, completed: false },
        { name: "Extra Sauce / 醬料", quantity: 1, completed: true }
    ], { note: "Big Party, serve together" }),

    // 7. Completed Order (Blue)
    createDemoOrder("107", "completed", [
        { name: "Lunch Set B", quantity: 1, completed: true }
    ], { completedAt: new Date() }),

    // 8. Cancelled Order (Gray)
    createDemoOrder("108", "cancelled", [
        { name: "Mistake Order", quantity: 1 }
    ]),

    // 9. Order with Note - Mixed Status
    createDemoOrder("109", "pending", [
        { name: "Salad / 沙拉", quantity: 1, completed: true },
        { name: "Soup / 湯", quantity: 1, completed: false }
    ], { note: "Guest has severe peanut allergy! Use clean board." }),

    // 10. All Items DONE
    createDemoOrder("110", "pending", [
        { name: "Appetizer / 前菜", quantity: 1, completed: true },
        { name: "Main Course / 主菜", quantity: 1, completed: true }
    ]),

    // 11. All Items COOKING
    createDemoOrder("111", "pending", [
        { name: "Steak / 牛排", quantity: 1, completed: false },
        { name: "Wine / 紅酒", quantity: 1, completed: false }
    ]),

    // 12. Redo Order - Mixed Status (Purple)
    createDemoOrder("112", "pending", [
        { name: "Pizza / 披薩", quantity: 1, notes: ["REDO"], completed: true },
        { name: "Garlic Bread / 蒜蓉麵包", quantity: 2, completed: false }
    ], { isRedo: true, tableNo: "T8" })

  ], []);

  // Simplified Slot Logic for Demo
  const getOrderSlots = (order: Order) => {
    let weight = order.items.length;
    if (order.note) weight += 2;
    order.items.forEach(item => {
        if (item.notes && item.notes.length > 0) weight += (item.notes.length * 0.8);
    });
    if (weight > 10) return 2; // Large
    return 1; // Standard
  };

  return (
    <div className="h-full flex flex-col bg-black p-4 gap-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Design Showcase (Demo Mode)</h2>
            <div className="flex items-center gap-4">
                <Button 
                    variant={isExpediterMode ? "default" : "outline"}
                    onClick={() => setIsExpediterMode(!isExpediterMode)}
                >
                    {isExpediterMode ? "Expediter Mode" : "Kitchen Mode"}
                </Button>
                <div className="text-muted-foreground">Showing {demoOrders.length} variations</div>
            </div>
        </div>

        <div 
        className="grid gap-4 auto-rows-fr"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
        {demoOrders.map((order) => {
            const slots = getOrderSlots(order);
            return (
            <div
                key={order.id}
                className={cn(
                "min-h-0",
                slots === 2 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"
                )}
            >
                <OrderCard 
                order={order} 
                onComplete={() => {}} 
                variant={slots === 2 ? 'wide' : 'standard'}
                isExpediterMode={isExpediterMode}
                // Mock toggle function for visual feedback
                onItemToggle={(oid, iid) => {
                    console.log(`Toggle ${oid} ${iid}`);
                }}
                />
            </div>
            );
        })}
        </div>
    </div>
  );
}