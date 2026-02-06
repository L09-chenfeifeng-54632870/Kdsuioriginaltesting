export type OrderStatus = 'new' | 'warning' | 'overdue' | 'completed' | 'cancelled';
export type Station = 'wok' | 'steamer' | 'roast' | 'cold' | 'noodle';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string[];
  specialRequest?: string;
  station: Station;
  completed?: boolean;
}

export interface Order {
  id: string;
  displayId: string;
  tableNo: string;
  customerName?: string;
  items: OrderItem[];
  status: OrderStatus;
  note?: string;
  isRush?: boolean;
  isRedo?: boolean;
  createdAt: Date;
  completedAt?: Date;
  waitDuration?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  inStock: boolean;
  station: Station;
  popular: boolean;
}

// Time helper
const now = new Date();
const m = (minutes: number) => new Date(now.getTime() - minutes * 60000);

// Data Pools
const customerNames = ["Table 1", "VIP 1", "Guest", "Mr. Chen", "UberEats", "FoodPanda", "Table 8", "Table 12", "VIP 88"];
const menuItems = [
  { name: 'Kung Pao Chicken / 宮保雞丁', station: 'wok' },
  { name: 'Peking Duck / 北京烤鴨', station: 'roast' },
  { name: 'Steamed Fish / 清蒸石斑', station: 'steamer' },
  { name: 'Beef Noodle Soup / 牛肉麵', station: 'noodle' },
  { name: 'Cucumber Salad / 拍黃瓜', station: 'cold' },
  { name: 'Mapo Tofu / 麻婆豆腐', station: 'wok' },
  { name: 'Char Siu / 蜜汁叉燒', station: 'roast' },
  { name: 'Wonton Soup / 餛飩湯', station: 'noodle' },
  { name: 'Egg Fried Rice / 蛋炒飯', station: 'wok' },
  { name: 'Dim Sum / 點心拼盤', station: 'steamer' },
  { name: 'Spring Rolls / 春捲', station: 'wok' },
  { name: 'Hot Pot / 火鍋', station: 'wok' },
  { name: 'Bubble Tea / 珍珠奶茶', station: 'cold' },
];

const noteOptions = [
  'No Spicy / 不辣',
  'Less Oil / 少油',
  'Less Salt / 少鹽',
  'Extra Spicy / 大辣',
  'Mild Spicy / 微辣',
  'Serve Later / 後上',
  'Serve First / 先上',
  'Sauce on Side / 醬汁分開',
  'No Peanuts / 無花生',
  'No Cilantro / 不加香菜',
  'No MSG / 無味精',
  'No Garlic / 不加蒜',
  'No Onion / 不加蔥',
  'Extra Sauce / 加醬',
  'Well Done / 全熟',
  'Medium Rare / 五分熟',
  'Extra Crispy / 酥脆',
  'Soft / 軟一點',
  'Hot / 要熱的',
  'Cold / 要冰的',
  'No Ice / 去冰',
  'Less Sugar / 少糖',
  'Extra Vegetables / 加菜',
  'No Vegetables / 不要菜'
];
const specialRequests = ['No Salt', 'Allergy: Peanuts', 'Extra Crispy', 'Split Plate', 'Kid Friendly', 'No MSG', 'Gluten Free'];

let orderIdCounter = 1000;

// Builder for Items
const createItems = (count: number, withNotes = false): OrderItem[] => {
  return Array.from({ length: count }, (_, i) => {
    // 70% of items should have notes (increased from 50%)
    const shouldHaveNotes = withNotes && Math.random() > 0.3;
    
    // Some items have multiple notes (up to 3)
    let itemNotes: string[] = [];
    if (shouldHaveNotes) {
      const noteCount = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 3) : 1;
      const shuffled = [...noteOptions].sort(() => Math.random() - 0.5);
      itemNotes = shuffled.slice(0, noteCount);
    }
    
    return {
      id: `item-${Date.now()}-${Math.random()}`,
      name: menuItems[Math.floor(Math.random() * menuItems.length)].name,
      quantity: Math.random() > 0.85 ? Math.floor(Math.random() * 3) + 2 : 1,
      station: 'wok' as Station,
      notes: itemNotes,
      specialRequest: withNotes && Math.random() > 0.85 ? specialRequests[Math.floor(Math.random() * specialRequests.length)] : undefined
    };
  });
};

// Builder for Orders
const createOrder = (
  timeOffset: number,
  type: 'Standard' | 'Tall' | 'Large' | 'Massive',
  status: OrderStatus = 'new',
  special?: { notes?: boolean; heavyNotes?: boolean; longNames?: boolean; orderNote?: string; isRedo?: boolean; isRush?: boolean }
): Order => {
  orderIdCounter++;
  
  let items: OrderItem[] = [];
  
  if (type === 'Standard') {
    items = createItems(Math.floor(Math.random() * 2) + 1, special?.notes);
  } else if (type === 'Tall') {
    items = createItems(5, special?.notes);
  } else if (type === 'Large') {
    items = createItems(10, special?.notes);
  } else if (type === 'Massive') {
    items = Array.from({ length: 60 }, (_, i) => ({
        id: `item-${Date.now()}-${i}`,
        name: `Dish Type #${i + 1} / 菜色${i + 1}`,
        quantity: Math.floor(Math.random() * 5) + 1,
        station: 'wok' as Station,
        notes: special?.notes ? [noteOptions[Math.floor(Math.random() * noteOptions.length)]] : [],
        specialRequest: special?.notes && Math.random() > 0.6 ? specialRequests[Math.floor(Math.random() * specialRequests.length)] : undefined
    }));
  }

  // Heavy Notes Injection
  if (special?.heavyNotes) {
    items.forEach(item => {
      item.notes = ['Extra Spicy / 大辣', 'No MSG / 無味精', 'Take away / 外帶'];
      if (Math.random() > 0.5) item.specialRequest = 'URGENT';
    });
  }

  // Long Names Injection
  if (special?.longNames) {
    items.forEach(item => {
      item.name = 'Supreme Royal Abalone Truffle Fried Rice with Golden Flakes / 至尊皇家鮑魚松露金箔炒飯';
    });
  }

  return {
    id: `o-${orderIdCounter}`,
    displayId: orderIdCounter.toString(),
    tableNo: `T${orderIdCounter % 100}`,
    customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
    items,
    status,
    note: special?.orderNote,
    isRush: special?.isRush,
    isRedo: special?.isRedo,
    createdAt: m(timeOffset)
  };
};

const generateMockOrders = (): Order[] => {
  const orders: Order[] = [];
  
  const addPage = (batch: Order[]) => {
    orders.push(...batch);
  };

  // --- 1. Top Priority / Showcases ---
  
  // PURPLE (REDO) - Very Old
  addPage([
    createOrder(45, 'Standard', 'overdue', { isRedo: true, orderNote: 'Hair found / 重做' }),
  ]);

  // RED (Late) - Old
  addPage([
    createOrder(35, 'Tall', 'overdue'),
    createOrder(30, 'Standard', 'overdue', { notes: true }), 
  ]);

  // --- 2. Volume Generation (50+ Orders) ---
  // Create enough orders to fill 5+ pages (approx 8 per page = 40 orders needed)
  
  for (let i = 0; i < 50; i++) {
     // Random time between 2 mins and 60 mins ago
     const minsAgo = Math.floor(Math.random() * 58) + 2;
     
     // Determine Status based on time
     let status: OrderStatus = 'new';
     if (minsAgo > 25) status = 'overdue';
     else if (minsAgo > 15) status = 'warning';
     
     // Random Type
     const typeRoll = Math.random();
     const type = typeRoll > 0.8 ? 'Large' : (typeRoll > 0.5 ? 'Tall' : 'Standard');
     
     // Random Flags
     // Rush: Disabled
     const isRush = false;
     // Redo: 5% chance (if not rush)
     const isRedo = !isRush && Math.random() < 0.05;
     // Notes: 70% chance (increased from 30% to show more options)
     const hasNotes = Math.random() < 0.7;
     // Order Note: 10% chance
     const orderNote = Math.random() < 0.1 ? "Allergy / VIP / Special" : undefined;

     orders.push(createOrder(minsAgo, type, status, { 
       isRush, 
       isRedo, 
       notes: hasNotes, 
       orderNote 
     }));
  }

  // --- 3. Quantity Demo Showcase ---
  // Demonstrates aggregation of different quantities for the same item across tables
  const demoDishName = "Dish Type #10 / 菜色#10";
  const qtyOrders = [
      { t: 'T91', q: 1, s: 'new' as OrderStatus },
      { t: 'T92', q: 2, s: 'warning' as OrderStatus },
      { t: 'T93', q: 3, s: 'overdue' as OrderStatus },
  ];
  
  qtyOrders.forEach((cfg, idx) => {
      orderIdCounter++;
      orders.push({
          id: `qty-demo-${idx}`,
          displayId: orderIdCounter.toString(),
          tableNo: cfg.t,
          customerName: "Qty Test",
          items: [{
              id: `q-item-${idx}`,
              name: demoDishName,
              quantity: cfg.q,
              station: 'wok',
              notes: [],
          }],
          status: cfg.s,
          createdAt: m(10 + idx * 5), // Staggered time
      });
  });

  // --- 4. Identical Items Across Tables (Aggregation Demo) ---
  const sharedDishName = "Signature Pork Chop / 招牌排骨飯";
  const sharedDishTables = ['T81', 'T82', 'T83', 'T84', 'T85'];
  
  sharedDishTables.forEach((table, idx) => {
      orderIdCounter++;
      orders.push({
          id: `share-demo-${idx}`,
          displayId: orderIdCounter.toString(),
          tableNo: table,
          customerName: `Guest ${table}`,
          items: [
              {
                  id: `share-item-${idx}`,
                  name: sharedDishName,
                  quantity: 1,
                  station: 'wok',
                  notes: ['No Spicy / 不辣', 'Less Oil / 少油'], // Multiple notes example
              },
              // Add a random secondary item to some orders to show mixed content
              ...(Math.random() > 0.5 ? [{
                  id: `share-item-sec-${idx}`,
                  name: "Cola / 可樂",
                  quantity: 1,
                  station: 'cold' as Station,
                  notes: ['No Ice / 去冰', 'Less Sugar / 少糖'],
              }] : [])
          ],
          status: 'new',
          createdAt: m(5 + idx), // Very recent
      });
  });

  // --- 4.5. Options Showcase Orders ---
  // Demonstrate various option combinations
  orderIdCounter++;
  orders.push({
      id: 'options-demo-1',
      displayId: orderIdCounter.toString(),
      tableNo: 'T71',
      customerName: "Options Demo",
      items: [
          {
              id: 'opt-item-1',
              name: "Kung Pao Chicken / 宮保雞丁",
              quantity: 1,
              station: 'wok',
              notes: ['Extra Spicy / 大辣', 'No Peanuts / 無花生', 'Serve Later / 後上'],
          },
          {
              id: 'opt-item-2',
              name: "Steamed Fish / 清蒸石斑",
              quantity: 1,
              station: 'steamer',
              notes: ['Less Oil / 少油', 'Less Salt / 少鹽'],
          },
          {
              id: 'opt-item-3',
              name: "Beef Noodle Soup / 牛肉麵",
              quantity: 2,
              station: 'noodle',
              notes: ['Mild Spicy / 微辣', 'No Cilantro / 不加香菜', 'Hot / 要熱的'],
          }
      ],
      status: 'new',
      createdAt: m(3),
  });

  orderIdCounter++;
  orders.push({
      id: 'options-demo-2',
      displayId: orderIdCounter.toString(),
      tableNo: 'T72',
      customerName: "VIP Guest",
      items: [
          {
              id: 'opt-item-4',
              name: "Peking Duck / 北京烤鴨",
              quantity: 1,
              station: 'roast',
              notes: ['Extra Crispy / 酥脆', 'Sauce on Side / 醬汁分開'],
          },
          {
              id: 'opt-item-5',
              name: "Egg Fried Rice / 蛋炒飯",
              quantity: 1,
              station: 'wok',
              notes: ['No MSG / 無味精', 'No Garlic / 不加蒜', 'Extra Vegetables / 加菜'],
          }
      ],
      status: 'warning',
      createdAt: m(16),
  });

  // --- 5. Expediter Mode Demo (DONE / COOKING States) ---
  
  // A. Fully Completed Order (Ready for Expediter)
  orderIdCounter++;
  orders.push({
      id: 'expediter-ready-demo',
      displayId: orderIdCounter.toString(),
      tableNo: 'E01',
      customerName: "Ready to Pack",
      items: [
          {
              id: 'ex-ready-1',
              name: "Beef Noodle Soup / 牛肉麵",
              quantity: 2,
              station: 'noodle',
              completed: true
          },
          {
              id: 'ex-ready-2',
              name: "Cucumber Salad / 拍黃瓜",
              quantity: 1,
              station: 'cold',
              completed: true
          }
      ],
      status: 'new', // Status is new/cooking in system until Expediter clicks Done, but items are cooked
      createdAt: m(12),
  });

  // B. Partially Completed Order (Mixed States)
  orderIdCounter++;
  orders.push({
      id: 'expediter-partial-demo',
      displayId: orderIdCounter.toString(),
      tableNo: 'E02',
      customerName: "Partial Order",
      items: [
          {
              id: 'ex-part-1',
              name: "Peking Duck / 北京烤鴨",
              quantity: 1,
              station: 'roast',
              completed: true // Roast station finished
          },
          {
              id: 'ex-part-2',
              name: "Egg Fried Rice / 蛋炒飯",
              quantity: 1,
              station: 'wok',
              completed: false // Wok still cooking
          },
          {
              id: 'ex-part-3',
              name: "Wonton Soup / 餛飩湯",
              quantity: 1,
              station: 'noodle',
              completed: true // Noodle finished
          }
      ],
      status: 'new',
      createdAt: m(8),
  });

  // C. Another Mixed Order
  orderIdCounter++;
  orders.push({
      id: 'expediter-mixed-demo-2',
      displayId: orderIdCounter.toString(),
      tableNo: 'E03',
      customerName: "Mixed Items",
      items: [
          {
              id: 'ex-mix-1',
              name: "Kung Pao Chicken / 宮保雞丁",
              quantity: 1,
              station: 'wok',
              completed: true
          },
          {
              id: 'ex-mix-2',
              name: "Mapo Tofu / 麻婆豆腐",
              quantity: 1,
              station: 'wok',
              completed: false
          }
      ],
      status: 'warning',
      createdAt: m(20),
  });

  // --- 6. Edge Cases ---
  // Super Long Item Names Demo
  orders.push({
      id: 'long-name-demo',
      displayId: '9999',
      tableNo: 'T99',
      customerName: "Long Name Test",
      items: [
          {
              id: 'long-item-1',
              name: "Super Deluxe Premium Seafood Platter with Abalone, Lobster, and Truffle Oil / 超級無敵海景佛跳牆配鮑魚龍蝦松露油 (特大份)",
              quantity: 1,
              station: 'wok',
              notes: ['Sauce on side'],
          },
          {
              id: 'long-item-2',
              name: "Braised Abalone with Sea Cucumber and Fish Maw in Oyster Sauce / 紅燒鮑魚海參花膠佐蠔油 (極品)",
              quantity: 2,
              station: 'steamer',
              notes: [],
          },
          {
             id: 'long-item-3',
             name: "This is a very very very long english name just to test the wrapping behavior of the card component when there is no chinese text involved",
             quantity: 1,
             station: 'cold',
          }
      ],
      status: 'new',
      createdAt: m(2),
  });

  // Massive Order
  orders.push(createOrder(5, 'Massive', 'new', { orderNote: 'Banquet Order' }));

  // Return sorted list (Time based, though App will re-sort by Rush)
  return orders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

const generateMockHistory = (): Order[] => {
    const history: Order[] = [];
    // Generate 50 past orders
    for (let i = 0; i < 50; i++) {
        const minsAgo = Math.floor(Math.random() * 400) + 30; // 30m to 430m ago
        const duration = Math.floor(Math.random() * 25) + 3; // took 3-28m
        
        const isCancelled = Math.random() < 0.1;
        const o = createOrder(minsAgo, 'Standard', isCancelled ? 'cancelled' : 'completed');
        
        o.completedAt = m(minsAgo - duration);
        o.waitDuration = duration * 60;
        
        history.push(o);
    }
    return history.sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
}

// Generate History FIRST so they have lower (older) Sequence IDs
const historyData = generateMockHistory();
const ordersData = generateMockOrders();

export const mockOrders: Order[] = ordersData;
export const mockHistory: Order[] = historyData;
export const mockMenu: MenuItem[] = [];