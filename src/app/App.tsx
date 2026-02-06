import React, { useState, useEffect } from "react";
import { Sidebar, KDSMode } from "./components/kds/Sidebar";
import {
  GridMode,
  SortMethod,
} from "./components/kds/GridMode";
import { FocusMode } from "./components/kds/FocusMode";
import { SummaryMode } from "./components/kds/SummaryMode";
import { HistoryMode } from "./components/kds/HistoryMode";
import { StockMode } from "./components/kds/StockMode";
import { DemoMode } from "./components/kds/DemoMode";
import { LandingPage } from "./components/kds/LandingPage";
import { ModeSelectionPage } from "./components/kds/ModeSelectionPage";
import {
  mockOrders,
  mockHistory,
  mockMenu,
  Order,
  MenuItem,
} from "./data/mock";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import {
  SettingsProvider,
  useSettings,
} from "./contexts/SettingsContext";

function KDSApp() {
  const [setupStep, setSetupStep] = useState<
    "mode" | "language" | "complete"
  >("mode");
  const [kdsType, setKdsType] = useState<
    "kitchen" | "expediter"
  >("kitchen");

  const [mode, setMode] = useState<KDSMode>("grid");
  // const [language, setLanguage] = useState<'en' | 'zh' | 'bi'>('bi');
  const { language, updateSettings } = useSettings();
  const setLanguage = (lang: "en" | "zh" | "bi") =>
    updateSettings({ language: lang });

  const [viewMode, setViewMode] = useState<"order" | "item">(
    "order",
  );
  const [sortMethod, setSortMethod] =
    useState<SortMethod>("fifo");
  const [maximizedOrderId, setMaximizedOrderId] = useState<
    string | null
  >(null);

  const [orders, setOrders] = useState<Order[]>(
    mockOrders.filter(
      (o) =>
        o.status !== "cancelled" && o.status !== "completed",
    ),
  );
  const [history, setHistory] = useState<Order[]>(mockHistory);
  const [menu, setMenu] = useState<MenuItem[]>(mockMenu);
  const [historySelectedIds, setHistorySelectedIds] = useState<
    Set<string>
  >(new Set());

  // Item View Selection State
  const [selectedItemMap, setSelectedItemMap] = useState<
    Map<string, string>
  >(new Map()); // itemId -> orderId

  // Clear selection when changing modes
  useEffect(() => {
    setHistorySelectedIds(new Set());
    setSelectedItemMap(new Map());
  }, [mode]);

  // Ensure viewMode is reset if switching to expediter mode where 'item' view is not allowed
  useEffect(() => {
    if (kdsType === "expediter" && viewMode === "item") {
      setViewMode("order");
    }
  }, [kdsType, viewMode]);

  // Reset to default view and sort when entering kitchen mode
  useEffect(() => {
    if (setupStep === "complete" && kdsType === "kitchen") {
      setViewMode("order");
      setSortMethod("fifo");
      setMode("grid");
    }
  }, [setupStep, kdsType]);

  const handleSelectItem = (
    orderId: string,
    itemId: string,
  ) => {
    setSelectedItemMap((prev) => {
      const next = new Map(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.set(itemId, orderId);
      }
      return next;
    });
  };

  const handleBatchCompleteItems = () => {
    let count = 0;
    selectedItemMap.forEach((orderId, itemId) => {
      count++;
    });

    if (count === 0) return;

    setOrders((prev) =>
      prev.map((order) => {
        const itemsToToggle = new Set<string>();
        order.items.forEach((i) => {
          if (selectedItemMap.has(i.id))
            itemsToToggle.add(i.id);
        });

        if (itemsToToggle.size === 0) return order;

        const newItems = order.items.map(
          (item) =>
            itemsToToggle.has(item.id)
              ? { ...item, completed: true }
              : item, // Force complete
        );

        return { ...order, items: newItems };
      }),
    );

    setSelectedItemMap(new Map());
    // toast.success(`${count} Items Completed`); // Removed toast notification
  };

  const handleCompleteOrder = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    // Remove from active
    setOrders((prev) => prev.filter((o) => o.id !== id));

    // Add to history
    const completedOrder: Order = {
      ...order,
      status: "completed",
      completedAt: new Date(),
      waitDuration: Math.floor(
        (new Date().getTime() - order.createdAt.getTime()) /
          1000,
      ),
    };

    setHistory((prev) => [completedOrder, ...prev]);
    // toast.success(`Order #${order.displayId} Completed`); // Removed toast notification
  };

  const handleRecallOrder = (id: string) => {
    const order = history.find((o) => o.id === id);
    if (!order) return;

    setHistory((prev) => prev.filter((o) => o.id !== id));

    const recalledOrder: Order = {
      ...order,
      status: "warning",
      completedAt: undefined,
    };

    setOrders((prev) =>
      [...prev, recalledOrder].sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      ),
    );
    // toast.info(`Order #${order.displayId} Recalled`); // Removed toast notification
  };

  const handleItemToggle = (
    orderId: string,
    itemId: string,
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const newItems = order.items.map((item) =>
          item.id === itemId
            ? { ...item, completed: !item.completed }
            : item,
        );

        return {
          ...order,
          items: newItems,
        };
      }),
    );
  };

  // Auto-complete orders when all items are done
  useEffect(() => {
    // Prevent auto-completion during setup or if in Expediter Mode
    if (setupStep !== "complete" || kdsType === "expediter")
      return;

    const completedOrders = orders.filter(
      (o) =>
        o.items.length > 0 && o.items.every((i) => i.completed),
    );

    if (completedOrders.length > 0) {
      completedOrders.forEach((order) => {
        const completedOrder: Order = {
          ...order,
          status: "completed",
          completedAt: new Date(),
          waitDuration: Math.floor(
            (new Date().getTime() - order.createdAt.getTime()) /
              1000,
          ),
        };
        setHistory((prev) => [completedOrder, ...prev]);
        // toast.success(`Order #${order.displayId} Completed`); // Removed toast notification
      });

      const completedIds = new Set(
        completedOrders.map((o) => o.id),
      );
      setOrders((prev) =>
        prev.filter((o) => !completedIds.has(o.id)),
      );
    }
  }, [orders, kdsType, setupStep]);

  const handleToggleStock = (id: string, inStock: boolean) => {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock } : item,
      ),
    );
  };

  const handleRushToggle = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, isRush: !order.isRush }
          : order,
      ),
    );
  };

  if (setupStep === "mode") {
    return (
      <div className="flex h-screen w-full bg-background font-sans mobile-full-height safe-all">
        <ModeSelectionPage
          onSelect={(type) => {
            setKdsType(type);
            setSetupStep("language");
          }}
        />
        <Toaster />
      </div>
    );
  }

  if (setupStep === "language") {
    return (
      <div className="flex h-screen w-full bg-background font-sans mobile-full-height safe-all">
        <LandingPage
          onStart={(lang) => {
            setSetupStep("complete");
            setLanguage(lang as "en" | "zh" | "bi");
            let msg = "System Ready";
            if (lang === "zh") msg = "系統就緒";
            if (lang === "bi") msg = "System Ready / 系統就緒";
            toast.success(msg);
          }}
          onBack={() => setSetupStep("mode")}
        />
        <Toaster />
      </div>
    );
  }

  const isKitchenMode = kdsType === "kitchen";

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <main className="flex-1 overflow-hidden relative">
        {mode === "grid" && (
          <GridMode
            orders={orders}
            onCompleteOrder={handleCompleteOrder}
            history={history}
            onRecallOrder={handleRecallOrder}
            onItemToggle={handleItemToggle}
            onRushToggle={handleRushToggle}
            onMaximizeOrder={setMaximizedOrderId}
            viewMode={viewMode}
            language={language}
            isSelectionMode={selectedItemMap.size > 0}
            selectedItems={selectedItemMap}
            onToggleSelection={handleSelectItem}
            isExpediterMode={kdsType === "expediter"}
            sortMethod={sortMethod}
            onSortChange={setSortMethod}
          />
        )}
        {mode === "focus" && (
          <FocusMode
            orders={orders}
            onCompleteOrder={handleCompleteOrder}
            onItemToggle={handleItemToggle}
            onRushToggle={handleRushToggle}
            language={language}
          />
        )}
        {mode === "summary" && (
          <SummaryMode
            orders={orders}
            language={language}
            onItemToggle={handleItemToggle}
          />
        )}
        {mode === "history" && (
          <HistoryMode
            history={history}
            onRecallOrder={handleRecallOrder}
            language={language}
            selectedIds={historySelectedIds}
            onSelectionChange={setHistorySelectedIds}
          />
        )}
        {mode === "stock" && (
          <StockMode
            menu={menu}
            onToggleStock={handleToggleStock}
          />
        )}
        {mode === "demo" && <DemoMode />}
      </main>

      <Sidebar
        currentMode={mode}
        onModeChange={setMode}
        onRevoke={() => {
          if (historySelectedIds.size > 0) {
            historySelectedIds.forEach((id) =>
              handleRecallOrder(id),
            );
            setHistorySelectedIds(new Set());
          } else if (history.length > 0) {
            handleRecallOrder(history[0].id);
          }
        }}
        canRevoke={history.length > 0}
        viewMode={viewMode}
        onToggleView={() =>
          setViewMode((v) => (v === "order" ? "item" : "order"))
        }
        language={language}
        isSelectionMode={selectedItemMap.size > 0}
        selectedCount={selectedItemMap.size}
        onBatchComplete={handleBatchCompleteItems}
        onCancelSelection={() => setSelectedItemMap(new Map())}
        onLogout={() => {
          if (
            window.confirm(
              language === "zh"
                ? "確定要登出嗎？"
                : "Are you sure you want to logout?",
            )
          ) {
            setSetupStep("mode");
            setKdsType("kitchen");
          }
        }}
        showItemView={isKitchenMode}
        showSummary={isKitchenMode}
      />

      {maximizedOrderId && (
        <div className="absolute inset-0 z-[100] bg-slate-100 flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="relative flex-1 min-h-0 w-full h-full">
            <FocusMode
              orders={orders.filter(
                (o) => o.id === maximizedOrderId,
              )}
              onCompleteOrder={(id) => {
                handleCompleteOrder(id);
                setMaximizedOrderId(null);
              }}
              onItemToggle={handleItemToggle}
              onRushToggle={handleRushToggle}
              language={language}
            />
            <Button
              className="absolute top-6 right-6 h-12 px-6 text-lg font-bold shadow-lg bg-black text-white hover:bg-slate-800 border-2 border-white/20 z-50 rounded-none"
              onClick={() => setMaximizedOrderId(null)}
            >
              Close View
            </Button>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <KDSApp />
    </SettingsProvider>
  );
}