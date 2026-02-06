import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';
import { Monitor, Layout, AlertTriangle, Save, Hash, Lock, Fingerprint, Tag, Wifi, LogOut, X, Globe } from 'lucide-react';
import { useSettings, SettingsState } from '@/app/contexts/SettingsContext';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SettingsTab = 'general' | 'layout' | 'alerts';

const translations = {
  en: {
    adminAccess: "Admin Access",
    enterPassword: "Enter password to access settings",
    enter: "Enter",
    settings: "Settings",
    general: "General",
    layout: "Layout",
    alerts: "Alerts",
    deviceConfig: "Device Configuration",
    deviceUuid: "Device UUID",
    uuidDescription: "Unique identifier for authentication with host server",
    kdsId: "KDS ID",
    kdsIdDescription: "Select KDS station identifier",
    stationId: "Station ID (01-99)",
    ipAddress: "IP Address",
    interfaceLang: "Interface Language",
    langNote: "* Affects buttons and system labels only. Menu items remain unchanged.",
    paginationLimits: "Pagination Limits",
    orderView: "Order View",
    itemView: "Item View",
    minOrders: "Min Orders",
    maxOrders: "Max Orders",
    minItems: "Min Items",
    maxItems: "Max Items",
    orderTimerColors: "Order Timer Colors",
    warning: "Warning",
    critical: "Critical",
    triggersAfter: "Triggers after",
    minutes: "minutes",
    cancel: "Close",
    saveSettings: "Save Settings",
    accessGranted: "Access Granted",
    invalidPassword: "Invalid Password",
    settingsSaved: "Settings Saved Successfully",
    invalidStationId: "Invalid Station ID",
    stationIdInUse: "Station ID 88 is already in use by another device",
    minutesLabel: "Minutes",
    copyUuid: "Copy UUID",
    logout: "Lock Settings"
  },
  zh: {
    adminAccess: "管理員權限",
    enterPassword: "請輸入密碼以進入設定",
    enter: "進入",
    settings: "設定",
    general: "一般",
    layout: "版面",
    alerts: "提示",
    deviceConfig: "裝置設定",
    deviceUuid: "裝置 UUID",
    uuidDescription: "用於與主機通信時的唯一識別碼",
    kdsId: "KDS 代號",
    kdsIdDescription: "選擇 KDS 工作站代號",
    stationId: "工作站代號 (01-99)",
    ipAddress: "IP 位址",
    interfaceLang: "介面語言",
    langNote: "* 僅影響按鈕與系統標籤，菜單項目不會改變。",
    paginationLimits: "分頁限制",
    orderView: "訂單視圖",
    itemView: "品項視圖",
    minOrders: "最少訂單",
    maxOrders: "最多訂單",
    minItems: "最少品項",
    maxItems: "最多品項",
    orderTimerColors: "訂單計時顏色",
    warning: "警告",
    critical: "嚴重",
    triggersAfter: "觸發時間",
    minutes: "分鐘後",
    cancel: "關閉",
    saveSettings: "儲存設定",
    accessGranted: "存取允許",
    invalidPassword: "密碼錯誤",
    settingsSaved: "設定儲存成功",
    invalidStationId: "無效的工作站代號",
    stationIdInUse: "工作站代號 88 已被其他裝置使用",
    minutesLabel: "分鐘",
    copyUuid: "複製 UUID",
    logout: "鎖定設定"
  }
};

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { 
    language: globalLanguage, 
    kdsId: globalKdsId,
    stationId: globalStationId,
    ipAddress: globalIpAddress,
    layoutSettings: globalLayoutSettings,
    alertSettings: globalAlertSettings,
    deviceUuid: globalDeviceUuid,
    updateSettings 
  } = useSettings();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Local State for form editing
  const [localKdsId, setLocalKdsId] = useState(globalKdsId);
  const [localStationId, setLocalStationId] = useState(globalStationId);
  const [localIpAddress, setLocalIpAddress] = useState(globalIpAddress);
  const [localLanguage, setLocalLanguage] = useState(globalLanguage);
  const [localLayoutSettings, setLocalLayoutSettings] = useState(globalLayoutSettings);
  const [localAlertSettings, setLocalAlertSettings] = useState(globalAlertSettings);

  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const t = translations[localLanguage === 'bi' ? 'en' : localLanguage]; // Default to en for bi for now, or use en

  // Sync with global settings when modal opens
  useEffect(() => {
    if (open) {
      setLocalKdsId(globalKdsId);
      setLocalStationId(globalStationId);
      setLocalIpAddress(globalIpAddress);
      setLocalLanguage(globalLanguage);
      setLocalLayoutSettings(globalLayoutSettings);
      setLocalAlertSettings(globalAlertSettings);
    }
  }, [open, globalKdsId, globalStationId, globalIpAddress, globalLanguage, globalLayoutSettings, globalAlertSettings]);

  const handlePasswordSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (password === '999') {
      setIsAuthenticated(true);
      toast.success(t.accessGranted);
    } else {
      toast.error(t.invalidPassword);
      setPassword('');
    }
  };

  const handleStationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty for typing, otherwise restrict
    if (val === '' || (/^\d+$/.test(val) && parseInt(val) >= 0 && parseInt(val) <= 99)) {
       setLocalStationId(val);
    }
  };

  const handleSave = () => {
    // Validation
    if (localStationId === '00' || localStationId === '') {
        toast.error(t.invalidStationId);
        return;
    }
    
    // Mock BoxAP check
    if (localStationId === '88') { // Mock duplicate
        toast.error(t.stationIdInUse);
        return;
    }

    // Save to context (which saves to localStorage)
    updateSettings({
      kdsId: localKdsId,
      stationId: localStationId,
      ipAddress: localIpAddress,
      language: localLanguage,
      layoutSettings: localLayoutSettings,
      alertSettings: localAlertSettings
    });

    toast.success(t.settingsSaved);
    onOpenChange(false);
  };

  const resetState = () => {
    setIsAuthenticated(false);
    setPassword('');
    setActiveTab('general');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetState, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        if (!val) handleClose();
    }}>
      <DialogContent 
        className="w-screen h-screen max-w-none sm:rounded-none rounded-none border-0 p-0 gap-0 bg-slate-50 text-slate-900 overflow-hidden flex flex-col fixed inset-0 translate-x-0 translate-y-0 left-0 top-0 data-[state=open]:slide-in-from-bottom-5 data-[state=closed]:slide-out-to-bottom-5 duration-300"
        hideCloseButton
      >
        <DialogDescription className="sr-only">
            Configuration settings for the Kitchen Display System
        </DialogDescription>
        
        {/* Close Button (Top Right) - Only show when NOT authenticated */}
        {!isAuthenticated && (
            <div className="absolute top-6 right-6 z-50">
                <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleClose} 
                    className="w-12 h-12 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 shadow-sm border border-slate-200 transition-all active:scale-95"
                >
                    <X className="w-6 h-6" />
                </Button>
            </div>
        )}

        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-full bg-slate-50 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-full max-w-md flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center border border-slate-100 mb-2">
                        <Lock className="w-12 h-12 text-emerald-500" />
                    </div>
                    <div>
                        <DialogTitle className="text-3xl font-bold text-slate-800 mb-2">{t.adminAccess}</DialogTitle>
                        <p className="text-slate-500 text-lg">{t.enterPassword}</p>
                    </div>
                </div>
                
                {/* Password Dots Display */}
                <div className="flex items-center gap-4 h-16 bg-white px-8 rounded-2xl border border-slate-200 shadow-sm w-full justify-center">
                    {[0, 1, 2].map((i) => (
                        <div 
                            key={i}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                password.length > i 
                                    ? "bg-emerald-500 scale-125" 
                                    : "bg-slate-200 scale-100"
                            }`}
                        />
                    ))}
                </div>

                {/* Numeric Keypad */}
                <div className="grid grid-cols-3 gap-4 w-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <Button
                            key={num}
                            variant="outline"
                            className="h-20 text-3xl font-bold rounded-2xl bg-white border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 active:scale-95 shadow-sm transition-all"
                            onClick={() => {
                                if (password.length < 3) setPassword(prev => prev + num);
                            }}
                        >
                            {num}
                        </Button>
                    ))}
                    
                    {/* Clear Button */}
                    <Button
                        variant="ghost"
                        className="h-20 text-lg font-bold rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => setPassword('')}
                    >
                        CLEAR
                    </Button>

                    {/* Zero Button */}
                    <Button
                        variant="outline"
                        className="h-20 text-3xl font-bold rounded-2xl bg-white border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 active:scale-95 shadow-sm transition-all"
                        onClick={() => {
                            if (password.length < 3) setPassword(prev => prev + '0');
                        }}
                    >
                        0
                    </Button>

                    {/* Enter Button */}
                    <Button
                        variant="default"
                        className={`h-20 text-lg font-bold rounded-2xl transition-all shadow-md ${
                            password.length === 3 
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 active:scale-95" 
                                : "bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200 border-none"
                        }`}
                        onClick={() => {
                            if (password.length === 3) handlePasswordSubmit();
                        }}
                        disabled={password.length !== 3}
                    >
                        {t.enter}
                    </Button>
                </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full overflow-hidden">
            {/* Sidebar - Fixed width */}
            <div className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col">
                <div className="p-6 pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-slate-800">
                        <span className="w-1.5 h-6 bg-emerald-500 rounded-full shadow-sm"></span>
                        {t.settings}
                    </DialogTitle>
                    <div className="mt-2 text-xs text-slate-400 font-mono px-4">
                        ID: {globalDeviceUuid.split('-')[1]}
                    </div>
                </div>
                
                <nav className="flex-1 px-4 space-y-3 mt-4">
                    <button 
                        onClick={() => setActiveTab('general')}
                        className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-lg font-bold active:scale-95 duration-200 ${activeTab === 'general' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'}`}
                    >
                        <Monitor className="w-6 h-6" />
                        <span>{t.general}</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('layout')}
                        className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-lg font-bold active:scale-95 duration-200 ${activeTab === 'layout' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'}`}
                    >
                        <Layout className="w-6 h-6" />
                        <span>{t.layout}</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('alerts')}
                        className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-lg font-bold active:scale-95 duration-200 ${activeTab === 'alerts' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:bg-white/50 hover:text-slate-900'}`}
                    >
                        <AlertTriangle className="w-6 h-6" />
                        <span>{t.alerts}</span>
                    </button>
                </nav>

                <div className="p-4 mt-auto">
                    {/* Logout button removed */}
                </div>
            </div>

            {/* Main Content - Flex-1 */}
            <div className="flex-1 flex flex-col bg-white h-full overflow-hidden relative">
                
                {/* Save Header - Compact */}
                <div className="flex-shrink-0 h-20 px-8 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            {activeTab === 'general' && t.general}
                            {activeTab === 'layout' && t.layout}
                            {activeTab === 'alerts' && t.alerts}
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleClose} className="h-10 px-6 rounded-lg text-base font-medium border-slate-200 hover:bg-slate-50 text-slate-600">
                            {t.cancel}
                        </Button>
                        <Button onClick={handleSave} className="h-10 px-8 rounded-lg text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20">
                            <Save className="w-4 h-4 mr-2" />
                            {t.saveSettings}
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 overflow-auto">
                    {activeTab === 'general' && (
                        <div className="grid grid-cols-12 gap-6 max-w-[1200px] mx-auto">
                            {/* Left Column: Authentication & Identity */}
                            <div className="col-span-12 xl:col-span-6 space-y-5">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-5">
                                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <Fingerprint className="w-5 h-5 text-emerald-600" />
                                        {localLanguage === 'en' ? 'Authentication & Identity' : '認證與身份'}
                                    </h3>
                                    
                                    {/* Device UUID */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-600 font-medium flex items-center gap-2">
                                            {t.deviceUuid}
                                        </label>
                                        <div className="relative">
                                            <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                            <Input 
                                                value={globalDeviceUuid}
                                                readOnly
                                                className="bg-white border-slate-200 pl-10 h-12 text-base font-mono text-emerald-900 cursor-not-allowed shadow-sm rounded-lg"
                                            />
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 rounded-lg"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(globalDeviceUuid);
                                                    toast.success(localLanguage === 'en' ? 'UUID copied to clipboard' : 'UUID 已複製到剪貼簿');
                                                }}
                                            >
                                                {t.copyUuid}
                                            </Button>
                                        </div>
                                        <p className="text-xs text-slate-400">{t.uuidDescription}</p>
                                    </div>

                                    {/* KDS ID */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-600 font-medium flex items-center gap-2">
                                            {t.kdsId}
                                        </label>
                                        <div className="relative">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
                                            <Select value={localKdsId} onValueChange={setLocalKdsId}>
                                                <SelectTrigger className="bg-white border-slate-200 pl-10 h-12 text-base font-bold text-slate-900 focus:ring-emerald-500 shadow-sm rounded-lg">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white rounded-xl">
                                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                                        <SelectItem 
                                                            key={num} 
                                                            value={`KDS${num}`}
                                                            className="text-base font-bold py-2 hover:bg-emerald-50 cursor-pointer rounded-lg"
                                                        >
                                                            KDS{num}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <p className="text-xs text-slate-400">{t.kdsIdDescription}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Device Config & Language */}
                            <div className="col-span-12 xl:col-span-6 space-y-5">
                                {/* Device Config */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-5">
                                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <Monitor className="w-5 h-5 text-blue-500" />
                                        {t.deviceConfig}
                                    </h3>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-600 font-medium">{t.stationId}</label>
                                            <div className="relative">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input 
                                                    value={localStationId}
                                                    onChange={handleStationIdChange}
                                                    className="bg-white border-slate-200 pl-10 h-12 text-base font-mono text-slate-900 focus:ring-emerald-500 shadow-sm rounded-lg"
                                                    placeholder="09"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-600 font-medium">{t.ipAddress}</label>
                                            <div className="relative">
                                                <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input 
                                                    value={localIpAddress}
                                                    onChange={(e) => setLocalIpAddress(e.target.value)}
                                                    className="bg-white border-slate-200 pl-10 h-12 text-base font-mono text-slate-900 focus:ring-emerald-500 shadow-sm rounded-lg"
                                                    placeholder="localhost"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Language */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-5">
                                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-indigo-500" />
                                        {t.interfaceLang}
                                    </h3>
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => setLocalLanguage('zh')}
                                            className={`flex-1 h-14 rounded-xl border-2 flex items-center justify-center gap-2 font-medium transition-all shadow-sm ${localLanguage === 'zh' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}
                                        >
                                            <span className="text-base">中文</span>
                                        </button>
                                        <button 
                                            onClick={() => setLocalLanguage('en')}
                                            className={`flex-1 h-14 rounded-xl border-2 flex items-center justify-center gap-2 font-medium transition-all shadow-sm ${localLanguage === 'en' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}
                                        >
                                            <span className="text-base">English</span>
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400">{t.langNote}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'layout' && (
                        <div className="grid grid-cols-12 gap-6 max-w-[1200px] mx-auto">
                            <div className="col-span-12 lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Layout className="w-5 h-5 text-purple-500" />
                                    {t.paginationLimits}
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <h4 className="font-semibold text-base text-slate-800 flex items-center gap-2 mb-4">
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></div> {t.orderView}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs text-slate-500 uppercase tracking-wide font-bold">{t.minOrders}</label>
                                                <Input type="number" value={localLayoutSettings.orderViewMin} onChange={(e) => setLocalLayoutSettings({...localLayoutSettings, orderViewMin: parseInt(e.target.value)})} className="bg-slate-50 border-slate-200 text-slate-900 h-12 text-base shadow-inner rounded-lg" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-slate-500 uppercase tracking-wide font-bold">{t.maxOrders}</label>
                                                <Input type="number" value={localLayoutSettings.orderViewMax} onChange={(e) => setLocalLayoutSettings({...localLayoutSettings, orderViewMax: parseInt(e.target.value)})} className="bg-slate-50 border-slate-200 text-slate-900 h-12 text-base shadow-inner rounded-lg" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <h4 className="font-semibold text-base text-slate-800 flex items-center gap-2 mb-4">
                                            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm"></div> {t.itemView}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs text-slate-500 uppercase tracking-wide font-bold">{t.minItems}</label>
                                                <Input type="number" value={localLayoutSettings.itemViewMin} onChange={(e) => setLocalLayoutSettings({...localLayoutSettings, itemViewMin: parseInt(e.target.value)})} className="bg-slate-50 border-slate-200 text-slate-900 h-12 text-base shadow-inner rounded-lg" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-slate-500 uppercase tracking-wide font-bold">{t.maxItems}</label>
                                                <Input type="number" value={localLayoutSettings.itemViewMax} onChange={(e) => setLocalLayoutSettings({...localLayoutSettings, itemViewMax: parseInt(e.target.value)})} className="bg-slate-50 border-slate-200 text-slate-900 h-12 text-base shadow-inner rounded-lg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'alerts' && (
                        <div className="grid grid-cols-12 gap-6 max-w-[1200px] mx-auto">
                             <div className="col-span-12 lg:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                                    {t.orderTimerColors}
                                </h3>
                                <div className="space-y-4">
                                    {localAlertSettings.map((alert, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: alert.color + '20' }}>
                                                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: alert.color }} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800 text-lg capitalize">{t[alert.label as keyof typeof t] || alert.label}</h4>
                                                <p className="text-slate-400 text-sm">{t.triggersAfter}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Input
                                                    type="number"
                                                    value={alert.minutes}
                                                    onChange={(e) => {
                                                        const newAlerts = [...localAlertSettings];
                                                        newAlerts[idx] = { ...newAlerts[idx], minutes: parseInt(e.target.value) };
                                                        setLocalAlertSettings(newAlerts);
                                                    }}
                                                    className="w-24 h-12 text-xl font-bold text-center bg-slate-50 border-slate-200"
                                                />
                                                <span className="text-slate-500 font-medium">{t.minutesLabel}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}