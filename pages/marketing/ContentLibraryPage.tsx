
import React, { useState } from 'react';
import { getContentLibrary, addContent } from '../../services/api';
import { Content } from '../../types';
import ResourceTablePage, { Column } from '../../components/common/ResourceTablePage';

const AddContentModalContent: React.FC<{ onClose: () => void, onContentAdded: (newContent: Content) => void }> = ({ onClose, onContentAdded }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'Social Post' | 'Blog Article' | 'Ad Copy' | 'Email'>('Social Post');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            const newContent = addContent({ title, type, content });
            onContentAdded(newContent);
            onClose();
        }
    };

    return (
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

    const handleContentAdded = (newContent: Content) => {
        setContent(prev => [newContent, ...prev]);
    };

    const columns: Column<Content>[] = [
        { header: 'Title', render: (item) => <span className="font-medium text-white">{item.title}</span> },
        { header: 'Type', render: (item) => <span className="text-gray-300">{item.type}</span> },
        { header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
        { header: 'Last Modified', render: (item) => <span className="text-gray-400">{item.lastModified}</span> },
    ];

    return (
        <ResourceTablePage<Content>
            title="Content Library"
            subtitle="A central hub for all your marketing content."
            items={content}
            columns={columns}
            searchKeys={['title', 'type']}
            searchPlaceholder="Search content..."
            addNewButtonText="Create New Content"
            addModalTitle="Create New Content"
            addModalContent={(onClose) => <AddContentModalContent onClose={onClose} onContentAdded={handleContentAdded} />}
            emptyState={{
                icon: <span className="text-4xl">📚</span>,
                title: "Centralize Your Creative Assets",
                description: "This library is empty. Start adding social posts, ad copy, and articles to streamline your marketing workflow.",
                ctaText: "+ Add Content"
            }}
        />
    );
};

export default ContentLibraryPage;