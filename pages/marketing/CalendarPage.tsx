import React, { useState, useMemo } from 'react';
import Card from '../../components/ui/Card';
import { getCalendarEvents } from '../../services/api';
import { CalendarEvent } from '../../types';

const CalendarPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const allEvents = useMemo(() => getCalendarEvents(), []);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay(); // 0 = Sunday, 1 = Monday
    const daysInMonth = endOfMonth.getDate();

    const days = Array.from({ length: startDay }, (_, i) => null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    const eventsByDate = useMemo(() => {
        const grouped: { [key: string]: CalendarEvent[] } = {};
        allEvents.forEach(event => {
            const date = new Date(event.date);
            if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth()) {
                const day = date.getDate();
                if (!grouped[day]) {
                    grouped[day] = [];
                }
                grouped[day].push(event);
            }
        });
        return grouped;
    }, [allEvents, currentDate]);
    
    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const eventColorClass = (color: CalendarEvent['color']) => {
        const colors = {
            purple: 'bg-primary-purple/20 text-primary-purple border-l-2 border-primary-purple',
            blue: 'bg-primary-blue/20 text-primary-blue border-l-2 border-primary-blue',
            green: 'bg-success-green/20 text-success-green border-l-2 border-success-green',
            yellow: 'bg-warning-yellow/20 text-warning-yellow border-l-2 border-warning-yellow',
        };
        return colors[color];
    }

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <div className="flex space-x-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-md bg-dark-border hover:bg-primary-purple">&lt;</button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm rounded-md bg-dark-border hover:bg-primary-purple">Today</button>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-md bg-dark-border hover:bg-primary-purple">&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-dark-border">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-xs text-gray-400 py-3 bg-dark-bg uppercase">{day}</div>
                ))}
                {days.map((day, index) => (
                    <div key={index} className="h-40 bg-dark-card p-2 overflow-y-auto">
                        {day && <span className="font-bold text-sm">{day}</span>}
                        <div className="space-y-1 mt-1">
                            {day && eventsByDate[day]?.map((event, i) => (
                                <div key={i} className={`p-1.5 rounded text-xs truncate ${eventColorClass(event.color)}`}>
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default CalendarPage;