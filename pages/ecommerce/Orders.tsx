// FIX: This file was a placeholder. Added page implementation.
import React, { useState, useMemo } from 'react';
import Card from '../../components/ui/Card';
import { getOrders } from '../../services/api';
import { Order, OrderStatus } from '../../types';

const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusStyles = {
        Processing: 'bg-blue-500/20 text-blue-400',
        Shipped: 'bg-yellow-500/20 text-yellow-400',
        Delivered: 'bg-green-500/20 text-green-400',
        Cancelled: 'bg-red-500/20 text-red-400',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>{status}</span>;
};

const Orders: React.FC = () => {
    const [orders] = useState(getOrders());
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');

    const filteredOrders = useMemo(() => {
        if (statusFilter === 'All') return orders;
        return orders.filter(order => order.status === statusFilter);
    }, [orders, statusFilter]);

    const filterOptions: (OrderStatus | 'All')[] = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="space-y-6">
            <Card className="p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">All Orders</h2>
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-400">Filter by status:</label>
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value as any)}
                            className="bg-dark-bg border border-dark-border rounded-lg p-2 text-sm"
                        >
                            {filterOptions.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>
            </Card>
            
            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-dark-border">
                        <thead className="bg-dark-bg">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="hover:bg-dark-bg">
                                    <td className="px-6 py-4 text-sm font-medium text-white">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{order.customerName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{order.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm"><OrderStatusBadge status={order.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Orders;
