import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { getContentLibrary, addContent } from '../../services/api';
import { Content } from '../../types';

const AddContentModal: React.FC<{ isOpen: boolean, onClose: () => void, onContentAdded: (newContent: Content) => void }> = ({ isOpen, onClose, onContentAdded }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'Social Post' | 'Blog Article' | 'Ad Copy' | 'Email'>('Social Post');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            const newContent = addContent({ title, type, content });
            onContentAdded(newContent);
            setTitle('');
            setContent('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Content">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Content Type</label>
                    <select value={type} onChange={e => setType(e.target.value as any)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3">
                        <option>Social Post</option>
                        <option>Blog Article</option>
                        <option>Ad Copy</option>
                        <option>Email</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Content Body</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" />
                </div>
                <div className="flex justify-end pt-4 space-x-4">
                    <button type="button" onClick={onClose} className="bg-dark-border text-white font-bold py-2 px-6 rounded-lg">Cancel</button>
                    <button type="submit" className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg">Save Draft</button>
                </div>
            </form>
        </Modal>
    );
};

const StatusBadge: React.FC<{ status: Content['status'] }> = ({ status }) => {
    const styles = {
        Draft: 'bg-gray-500/20 text-gray-400',
        Scheduled: 'bg-blue-500/20 text-blue-400',
        Published: 'bg-green-500/20 text-green-400',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

const ContentLibraryPage: React.FC = () => {
    const [content, setContent] = useState(getContentLibrary());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleContentAdded = (newContent: Content) => {
        setContent(prev => [newContent, ...prev]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Content Library</h2>
                    <p className="text-gray-400">A central hub for all your marketing content.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
                    + Create New Content
                </button>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-dark-border">
                        <thead className="bg-dark-bg">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Last Modified</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {content.map(item => (
                                <tr key={item.id} className="hover:bg-dark-bg">
                                    <td className="px-6 py-4 text-sm font-medium text-white">{item.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{item.type}</td>
                                    <td className="px-6 py-4 text-sm"><StatusBadge status={item.status} /></td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{item.lastModified}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <AddContentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onContentAdded={handleContentAdded} />
        </div>
    );
};

export default ContentLibraryPage;
