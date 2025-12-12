
import React, { useState } from 'react';
import ResourceListPage from '../../components/common/ResourceListPage';
import Card from '../../components/ui/Card';

interface ExclusiveItem {
    id: string;
    title: string;
    type: 'Video' | 'Audio' | 'Post';
    tierRequired: 'Gold' | 'Silver' | 'Bronze';
    postedDate: string;
}

const ExclusiveContentPage: React.FC = () => {
    const [items, setItems] = useState<ExclusiveItem[]>([
        { id: '1', title: 'Behind the Scenes: Studio Tour', type: 'Video', tierRequired: 'Gold', postedDate: '2024-04-01' },
        { id: '2', title: 'Early Demo: "Night Sky"', type: 'Audio', tierRequired: 'Silver', postedDate: '2024-04-05' },
    ]);

    const handleAddItem = (onClose: () => void) => {
        // Mock add
        const newItem: ExclusiveItem = {
            id: Date.now().toString(),
            title: 'New Exclusive Post',
            type: 'Post',
            tierRequired: 'Bronze',
            postedDate: new Date().toISOString().split('T')[0]
        };
        setItems([newItem, ...items]);
        onClose();
    };

    return (
        <ResourceListPage<ExclusiveItem>
            items={items}
            renderItem={(item) => (
                <Card className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white">{item.title}</h3>
                        <span className="text-xs bg-primary-purple/20 text-primary-purple px-2 py-1 rounded">{item.tierRequired}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{item.type} • {item.postedDate}</p>
                </Card>
            )}
            searchKeys={['title']}
            searchPlaceholder="Search content..."
            addNewButtonText="Add Content"
            addModalTitle="Add Exclusive Content"
            addModalContent={(onClose) => (
                <div className="text-center p-6">
                    <p className="text-gray-400 mb-4">Upload form would go here.</p>
                    <button onClick={() => handleAddItem(onClose)} className="bg-primary-purple px-4 py-2 rounded text-white">Simulate Add</button>
                </div>
            )}
            emptyState={{
                icon: <span>🔒</span>,
                title: "No Exclusive Content",
                description: "Reward your subscribers with special content available only to them.",
                ctaText: "Add First Post"
            }}
        />
    );
};

export default ExclusiveContentPage;
