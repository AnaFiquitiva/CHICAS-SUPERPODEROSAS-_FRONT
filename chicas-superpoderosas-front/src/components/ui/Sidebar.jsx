import { useState } from 'react';
import { X, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface SidebarProps {
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
    periods: string[];
}

const DAYS_SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function Sidebar({ selectedPeriod, onPeriodChange, periods }: SidebarProps) {
    const [calendarsExpanded, setCalendarsExpanded] = useState(true);
    const [favoritesExpanded, setFavoritesExpanded] = useState(true);
    const [categoriesExpanded, setCategoriesExpanded] = useState(true);

    // Mini calendar data
    const currentMonth = 'October 2023';
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const startDay = 6; // October 2023 starts on Sunday

    return (
        <div className="w-80 bg-[#1E1E1E] text-white flex flex-col h-full">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
                <Button
                    variant="ghost"
                    size="icon"
                    className="bg-purple-500 hover:bg-purple-600 rounded-xl h-12 w-12"
                >
                    <X className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="bg-[#2D2D2D] hover:bg-[#3D3D3D] rounded-xl h-12 w-12"
                >
                    <Plus className="h-6 w-6" />
                </Button>
            </div>

            {/* User Avatars */}
            <div className="px-4 py-4 flex gap-2">
                <Avatar className="h-12 w-12 border-2 border-purple-500">
                    <AvatarFallback className="bg-orange-400">MG</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12 border-2 border-transparent">
                    <AvatarFallback className="bg-yellow-400">JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12 border-2 border-transparent">
                    <AvatarFallback className="bg-teal-400">AR</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12 border-2 border-transparent">
                    <AvatarFallback className="bg-pink-400">LM</AvatarFallback>
                </Avatar>
            </div>

            {/* Mini Calendar */}
            <div className="px-4 py-2">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm">{currentMonth}</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs">
                    {DAYS_SHORT.map((day) => (
                        <div key={day} className="text-center text-gray-500 pb-1">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: startDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {daysInMonth.map((day) => (
                        <button
                            key={day}
                            className={`aspect-square flex items-center justify-center rounded-full text-xs transition-colors ${
                                day === 18
                                    ? 'bg-yellow-400 text-gray-900'
                                    : 'hover:bg-gray-700 text-gray-400'
                            }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                {/* My Calendars */}
                <div>
                    <button
                        onClick={() => setCalendarsExpanded(!calendarsExpanded)}
                        className="flex items-center justify-between w-full text-sm mb-2 hover:text-gray-300"
                    >
                        <span>My Calendars</span>
                        {calendarsExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                    {calendarsExpanded && (
                        <div className="space-y-2 ml-2">
                            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                                <input type="checkbox" defaultChecked className="rounded" />
                                <span>Daily Tasks</span>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                                <input type="checkbox" defaultChecked className="rounded" />
                                <span>Birthdays</span>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                                <input type="checkbox" defaultChecked className="rounded" />
                                <span>Tasks</span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Favorites */}
                <div>
                    <button
                        onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                        className="flex items-center justify-between w-full text-sm mb-2 hover:text-gray-300"
                    >
                        <span>Favorites</span>
                        {favoritesExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                </div>

                {/* Categories */}
                <div>
                    <button
                        onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                        className="flex items-center justify-between w-full text-sm mb-2 hover:text-gray-300"
                    >
                        <span>Categories</span>
                        {categoriesExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                    {categoriesExpanded && (
                        <div className="space-y-2 ml-2">
                            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                <span>Work</span>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                                <div className="w-2 h-2 rounded-full bg-purple-400" />
                                <span>Personal</span>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                <span>Education</span>
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Avatars */}
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                        <Avatar className="h-8 w-8 border-2 border-[#1E1E1E]">
                            <AvatarFallback className="bg-blue-500 text-xs">JG</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-[#1E1E1E]">
                            <AvatarFallback className="bg-pink-500 text-xs">SM</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-[#1E1E1E]">
                            <AvatarFallback className="bg-green-500 text-xs">KL</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-[#1E1E1E]">
                            <AvatarFallback className="bg-orange-500 text-xs">DP</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8 border-2 border-[#1E1E1E]">
                            <AvatarFallback className="bg-purple-500 text-xs">RC</AvatarFallback>
                        </Avatar>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="text-xs">•••</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
