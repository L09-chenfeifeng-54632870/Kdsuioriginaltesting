import * as React from "react";
import { MenuItem, Station } from "@/app/data/mock";
import { Switch } from "@/app/components/ui/switch";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Wifi, Search, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StockModeProps {
  menu: MenuItem[];
  onToggleStock: (id: string, inStock: boolean) => void;
}

export function StockMode({ menu, onToggleStock }: StockModeProps) {
  const [filterStation, setFilterStation] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredMenu = React.useMemo(() => {
    return menu.filter(item => {
      const matchesStation = filterStation === "all" || item.station === filterStation;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStation && matchesSearch;
    });
  }, [menu, filterStation, searchTerm]);

  const handleToggle = (id: string, currentStatus: boolean, name: string) => {
    onToggleStock(id, !currentStatus);
    toast(currentStatus ? `${name} marked as Out of Stock` : `${name} back In Stock`, {
        description: currentStatus ? "Servers cannot order this item now." : "Servers can order this item again.",
        action: {
            label: "Undo",
            onClick: () => onToggleStock(id, currentStatus)
        }
    });
  };

  const outOfStockCount = menu.filter(i => !i.inStock).length;

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
       {/* Header with System Status */}
       <div className="flex items-center justify-between">
           <div>
               <h1 className="text-2xl font-bold flex items-center gap-3">
                   Item Availability
                   {outOfStockCount > 0 && (
                       <Badge variant="destructive" className="ml-2 rounded-md">
                           {outOfStockCount} Unavailable
                       </Badge>
                   )}
               </h1>
               <p className="text-muted-foreground">Manage 86'd items instantly</p>
           </div>
           
           <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
               <Wifi className="h-4 w-4" />
               <span>System Online</span>
           </div>
       </div>

       {/* Controls */}
       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
           <Tabs value={filterStation} onValueChange={setFilterStation} className="w-full sm:w-auto">
               <TabsList>
                   <TabsTrigger value="all">All Stations</TabsTrigger>
                   <TabsTrigger value="grill">Grill</TabsTrigger>
                   <TabsTrigger value="fryer">Fryer</TabsTrigger>
                   <TabsTrigger value="cold">Cold</TabsTrigger>
               </TabsList>
           </Tabs>
           
           <div className="relative w-full sm:w-72">
               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input 
                 placeholder="Find item..." 
                 className="pl-8"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
           </div>
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-10">
           {filteredMenu.map((item) => (
               <Card key={item.id} className={cn(
                   "transition-all duration-200", 
                   item.inStock ? "shadow-sm border-2 border-transparent" : "bg-muted/30 border-2 border-dashed border-muted-foreground/20"
               )}>
                   <CardContent className="p-6 flex items-center justify-between h-full min-h-[100px]">
                       <div className="flex flex-col gap-1">
                           <span className={cn(
                               "text-xl font-bold leading-tight", 
                               item.inStock ? "" : "text-muted-foreground line-through decoration-destructive"
                           )}>
                               {item.name}
                           </span>
                           <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                               {item.category} • {item.station}
                           </span>
                       </div>
                       <div className="scale-125 origin-right">
                           <Switch 
                               checked={item.inStock}
                               onCheckedChange={() => handleToggle(item.id, item.inStock, item.name)}
                               className="data-[state=checked]:bg-green-600"
                           />
                       </div>
                   </CardContent>
               </Card>
           ))}
       </div>
    </div>
  );
}
