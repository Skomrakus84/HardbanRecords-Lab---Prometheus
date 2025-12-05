import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Role } from '../../types';
import { getAnalyticsData, getBookSalesData, getPublishingData } from '../../services/api';

interface AnalyticsChartProps {
  userId?: string;
  role: Role;
}

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const AnalyticsCharts: React.FC<AnalyticsChartProps> = ({ userId, role }) => {
    
    if (role === Role.BOOK_AUTHOR) {
        const bookSalesData = getBookSalesData();
        const { books } = getPublishingData();
        const bookRevenueData = books.filter(b => b.status === 'Published').map(b => ({ name: b.title, value: b.revenue }));

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Book Sales Trend (Last 6 Months)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bookSalesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} formatter={(value: number) => value.toLocaleString()} />
                            <Legend />
                            <Line type="monotone" dataKey="amazon" name="Amazon" stroke="#F59E0B" strokeWidth={2} />
                            <Line type="monotone" dataKey="apple" name="Apple Books" stroke="#A855F7" strokeWidth={2} />
                            <Line type="monotone" dataKey="kobo" name="Kobo" stroke="#3B82F6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Revenue by Book</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={bookRevenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                {bookRevenueData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} formatter={(value: number) => `$${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
    
    // Default for Music Creator and Admin
    const data = getAnalyticsData(userId);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Streams Trend (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.streamsTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${Number(value) / 1000}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                        <Legend />
                        <Line type="monotone" dataKey="streams" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Total Revenue Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={data.revenueBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                            {data.revenueBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

             <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-lg lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Revenue by Platform (Music)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.platformRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                        <Legend />
                        <Bar dataKey="value" name="Revenue">
                           {data.platformRevenue.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsCharts;