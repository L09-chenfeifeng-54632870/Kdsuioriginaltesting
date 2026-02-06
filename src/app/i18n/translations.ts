export const translations = {
  en: {
    // Pagination
    previous: "PREVIOUS",
    prev: "PREV",
    nextPage: "NEXT PAGE",
    next: "NEXT",
    page: "PAGE",
    
    // Sorting
    time: "Time",
    table: "Table",
    orderNo: "Order #",
    
    // Search & Empty States
    searchPlaceholder: "Search Order # / Table #",
    noResults: "No Results Found",
    allCaughtUp: "All caught up!",
    noMatches: 'No orders match',
    noActiveOrders: "No active orders at the moment.",
    noActiveItems: "No active items at the moment.",
    clearSearch: "Clear Search",
    
    // Order Card
    note: "Note",
    cooking: "COOKING",
    done: "DONE",
    
    // Sidebar
    orders: "Orders",
    itemView: "Item View",
    summary: "Summary",
    history: "History",
    completeSelected: "Complete Selected",
    cancelSelection: "Cancel Selection",
    redoLast: "Redo Last Order",
    logout: "Logout / Return to Home",
    confirmLogout: "Are you sure you want to logout?"
  },
  zh: {
    // Pagination
    previous: "上一頁",
    prev: "上一頁",
    nextPage: "下一頁",
    next: "下一頁",
    page: "頁碼",
    
    // Sorting
    time: "時間",
    table: "桌號",
    orderNo: "單號",
    
    // Search & Empty States
    searchPlaceholder: "搜尋 單號 / 桌號",
    noResults: "未找到結果",
    allCaughtUp: "目前無訂單",
    noMatches: '沒有訂單符合',
    noActiveOrders: "目前沒有進行中的訂單。",
    noActiveItems: "目前沒有進行中的品項。",
    clearSearch: "清除搜尋",
    
    // Order Card
    note: "備註",
    cooking: "製作中",
    done: "完成",

    // Sidebar
    orders: "訂單",
    itemView: "品項",
    summary: "總覽",
    history: "歷史",
    completeSelected: "完成選取",
    cancelSelection: "取消選取",
    redoLast: "重做上一筆",
    logout: "登出 / 返回首頁",
    confirmLogout: "確定要登出嗎？"
  }
};

export type Language = 'en' | 'zh' | 'bi';

export function getTranslation(lang: Language) {
  // For Bilingual (bi), we currently default UI labels to English
  // You can customize this to return a specific 'bi' set if needed
  return lang === 'zh' ? translations.zh : translations.en;
}
