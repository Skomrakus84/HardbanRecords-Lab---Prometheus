import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { getSmartLinks, addSmartLink } from '../../services/api';
import { SmartLink } from '../../types';

const AddLinkModal: React.FC<{ isOpen: boolean, onClose: () => void, onLinkAdded: (newLink: SmartLink) => void }> = ({ isOpen, onClose, onLinkAdded }) => {
    const [name, setName] = useState('');
    const [originalUrl, setOriginalUrl] = useState('');
    const [type, setType] = useState<'Pre-Save' | 'Bio-Link' | 'Single'>('Pre-Save');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && originalUrl.trim()) {
            const newLink = addSmartLink({ name, originalUrl, type });
            onLinkAdded(newLink);
            setName('');
            setOriginalUrl('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Smart Link">
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label htmlFor="link-name" className="block text-sm font-medium text-gray-300">Link Name</label>
                    <input type="text" id="link-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" placeholder="e.g., New Single Pre-Save" />
                </div>
                <div>
                    <label htmlFor="link-url" className="block text-sm font-medium text-gray-300">Original URL</label>
                    <input type="url" id="link-url" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" placeholder="https://open.spotify.com/..." />
                </div>
                 <div>
                    <label htmlFor="link-type" className="block text-sm font-medium text-gray-300">Link Type</label>
                    <select id="link-type" value={type} onChange={(e) => setType(e.target.value as any)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3">
                        <option>Pre-Save</option>
                        <option>Bio-Link</option>
                        <option>Single</option>
                    </select>
                </div>
                <div className="flex justify-end pt-4 space-x-4">
                    <button type="button" onClick={onClose} className="bg-dark-border text-white font-bold py-2 px-6 rounded-lg">Cancel</button>
                    <button type="submit" className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg">Create Link</button>
                </div>
            </form>
        </Modal>
    );
};


const SmartLinksPage: React.FC = () => {
    const [links, setLinks] = useState(getSmartLinks());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLinkAdded = (newLink: SmartLink) => {
        setLinks(prev => [newLink, ...prev]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-bold text-white">Smart Links</h2>
                    <p className="text-gray-400">Create and manage pre-save links, bio links, and more.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                >
                    + Create Link
                </button>
            </div>

            <Card>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-dark-border">
                        <thead className="bg-dark-bg">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Short URL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Clicks</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Conversions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {links.map(link => (
                                <tr key={link.id} className="hover:bg-dark-bg">
                                    <td className="px-6 py-4 text-sm font-medium text-white">{link.name}</td>
                                    <td className="px-6 py-4 text-sm text-primary-purple">{link.shortUrl}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{link.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{link.clicks.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{link.conversions > 0 ? link.conversions.toLocaleString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <AddLinkModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLinkAdded={handleLinkAdded}
            />
        </div>
    );
};

export default SmartLinksPage;
