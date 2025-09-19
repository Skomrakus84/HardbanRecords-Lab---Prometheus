import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { getPressReleases, addPressRelease, generateTextContent } from '../../services/api';
import { PressRelease } from '../../types';

const CreatePressReleaseModal: React.FC<{ isOpen: boolean, onClose: () => void, onReleaseAdded: (newRelease: PressRelease) => void }> = ({ isOpen, onClose, onReleaseAdded }) => {
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState('');
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!title || !points) return;
        setIsGenerating(true);
        const prompt = `Create a press release titled "${title}" with these key points: ${points}`;
        const generated = await generateTextContent(prompt);
        setContent(generated);
        setIsGenerating(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            const newRelease = addPressRelease({ title });
            onReleaseAdded(newRelease);
            setTitle('');
            setPoints('');
            setContent('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Press Release">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Press Release Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" placeholder="e.g., Artist Announces World Tour" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Key Points (for AI Assistant)</label>
                    <textarea value={points} onChange={(e) => setPoints(e.target.value)} rows={3} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" placeholder="1. New album drops Dec 1st.\n2. Tour starts in New York.\n3. Special guest will be..." />
                </div>
                <button type="button" onClick={handleGenerate} disabled={isGenerating || !title || !points} className="w-full bg-primary-blue text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">
                    {isGenerating ? 'Generating...' : '✨ Use AI Assistant to Write'}
                </button>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" />
                </div>
                <div className="flex justify-end pt-4 space-x-4">
                    <button type="button" onClick={onClose} className="bg-dark-border text-white font-bold py-2 px-6 rounded-lg">Cancel</button>
                    <button type="submit" className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg">Save Draft</button>
                </div>
            </form>
        </Modal>
    );
};

const PressReleasePage: React.FC = () => {
    const [releases, setReleases] = useState(getPressReleases());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReleaseAdded = (newRelease: PressRelease) => {
        setReleases(prev => [newRelease, ...prev]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Press Releases</h2>
                    <p className="text-gray-400">Manage and distribute your announcements.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
                    + Create Press Release
                </button>
            </div>

            <Card>
                <table className="min-w-full divide-y divide-dark-border">
                    <thead className="bg-dark-bg">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Sent Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Open Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border">
                        {releases.map(release => (
                            <tr key={release.id} className="hover:bg-dark-bg">
                                <td className="px-6 py-4 text-sm font-medium text-white">{release.title}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 text-xs rounded-full ${release.status === 'Sent' ? 'bg-success-green/20 text-success-green' : 'bg-gray-500/20 text-gray-300'}`}>
                                        {release.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">{release.sentDate || 'N/A'}</td>
                                <td className="px-6 py-4 text-sm text-gray-300">{release.openRate > 0 ? `${release.openRate}%` : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <CreatePressReleaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onReleaseAdded={handleReleaseAdded} />
        </div>
    );
};

export default PressReleasePage;