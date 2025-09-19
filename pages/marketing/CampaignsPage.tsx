import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { getCampaigns, addCampaign } from '../../services/api';
import { Campaign, CampaignStatus } from '../../types';

const AddCampaignModal: React.FC<{ isOpen: boolean, onClose: () => void, onCampaignAdded: (campaign: Campaign) => void }> = ({ isOpen, onClose, onCampaignAdded }) => {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCampaign = addCampaign({ name, status: 'Planning', budget, startDate, endDate, channels: [] });
        onCampaignAdded(newCampaign);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Campaign">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Campaign Name" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
                <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} placeholder="Budget" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Start Date" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="End Date" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-primary-purple py-2 px-6 rounded-lg">Create Campaign</button>
                </div>
            </form>
        </Modal>
    );
};

const CampaignStatusBadge: React.FC<{ status: CampaignStatus }> = ({ status }) => {
    const statusStyles = {
        Active: 'bg-green-500/20 text-green-400',
        Planning: 'bg-blue-500/20 text-blue-400',
        Completed: 'bg-gray-500/20 text-gray-400',
        Paused: 'bg-yellow-500/20 text-yellow-400',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>{status}</span>;
};

const CampaignsPage: React.FC = () => {
    const [campaigns, setCampaigns] = useState(getCampaigns());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCampaignAdded = (newCampaign: Campaign) => {
        setCampaigns(prev => [newCampaign, ...prev]);
        setIsModalOpen(false);
    };
    
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Marketing Campaigns</h2>
                    <p className="text-gray-400">Plan, execute, and track your promotional campaigns.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
                    + New Campaign
                </button>
            </div>
            <Card>
                <table className="min-w-full divide-y divide-dark-border">
                    <thead className="bg-dark-bg">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Campaign</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Budget</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Timeline</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border">
                        {campaigns.map(c => (
                            <tr key={c.id} className="hover:bg-dark-bg">
                                <td className="px-6 py-4 text-sm font-medium text-white">{c.name}</td>
                                <td className="px-6 py-4 text-sm"><CampaignStatusBadge status={c.status} /></td>
                                <td className="px-6 py-4 text-sm text-gray-300">${c.budget.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-300">{c.startDate} - {c.endDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <AddCampaignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCampaignAdded={handleCampaignAdded} />
        </div>
    );
};

export default CampaignsPage;
