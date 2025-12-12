
import React, { useState } from 'react';
import ResourceTablePage, { Column } from '../../components/common/ResourceTablePage';

interface Subscriber {
    id: string;
    name: string;
    tier: 'Gold' | 'Silver' | 'Bronze';
    joinDate: string;
    lifetimeValue: number;
}

const SubscriptionsPage: React.FC = () => {
    // Mock data
    const [subscribers] = useState<Subscriber[]>([
        { id: '1', name: 'Alice Fan', tier: 'Gold', joinDate: '2024-01-15', lifetimeValue: 120 },
        { id: '2', name: 'Bob Listener', tier: 'Silver', joinDate: '2024-02-01', lifetimeValue: 45 },
        { id: '3', name: 'Charlie Reader', tier: 'Bronze', joinDate: '2024-03-10', lifetimeValue: 15 },
    ]);

    const columns: Column<Subscriber>[] = [
        { header: 'Name', render: (s) => <span className="font-medium text-white">{s.name}</span> },
        { header: 'Tier', render: (s) => (
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                s.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                s.tier === 'Silver' ? 'bg-gray-400/20 text-gray-300' :
                'bg-orange-700/20 text-orange-400'
            }`}>{s.tier}</span>
        )},
        { header: 'Join Date', render: (s) => <span className="text-gray-400">{s.joinDate}</span> },
        { header: 'LTV', render: (s) => <span className="text-success-green font-mono">${s.lifetimeValue}</span> },
    ];

    return (
        <ResourceTablePage<Subscriber>
            title="Subscriptions"
            subtitle="Manage your recurring supporters and membership tiers."
            items={subscribers}
            columns={columns}
            searchKeys={['name']}
            searchPlaceholder="Search subscribers..."
            addNewButtonText="Edit Tiers"
            addModalTitle="Manage Tiers"
            addModalContent={(onClose) => (
                <div className="text-center p-6">
                    <p className="text-gray-400">Tier management coming soon.</p>
                    <button onClick={onClose} className="mt-4 bg-primary-purple px-4 py-2 rounded">Close</button>
                </div>
            )}
            emptyState={{
                icon: <span>⭐</span>,
                title: "No Subscribers Yet",
                description: "Launch a subscription tier to start earning recurring revenue from your top fans.",
                ctaText: "Setup Tiers"
            }}
        />
    );
};

export default SubscriptionsPage;
