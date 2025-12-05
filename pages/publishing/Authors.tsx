import React, { useState } from 'react';
import { getAuthors, addAuthor } from '../../services/api';
import { Author } from '../../types';
import AuthorCard from '../../components/publishing/AuthorCard';
import ResourceListPage from '../../components/common/ResourceListPage';

const AddAuthorForm: React.FC<{ onAuthorAdded: (author: Author) => void }> = ({ onAuthorAdded }) => {
    const [name, setName] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            const newAuthor = addAuthor(name);
            onAuthorAdded(newAuthor);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm">Author Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 bg-dark-bg p-2 rounded-md border border-dark-border" />
            </div>
            <div className="flex justify-end pt-4">
                <button type="submit" className="bg-primary-purple py-2 px-6 rounded-lg">Add Author</button>
            </div>
        </form>
    );
};

const Authors: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>(getAuthors());

    const handleAuthorAdded = (newAuthor: Author) => {
        setAuthors(prev => [newAuthor, ...prev]);
    };
    
    return (
        <ResourceListPage<Author>
            items={authors}
            renderItem={(author) => <AuthorCard author={author} />}
            searchKeys={['name']}
            searchPlaceholder="Search authors..."
            addNewButtonText="New Author"
            addModalTitle="Add New Author"
            addModalContent={(onClose) => (
                <AddAuthorForm onAuthorAdded={(author) => {
                    handleAuthorAdded(author);
                    onClose();
                }} />
            )}
            emptyState={{
                icon: <>✍️</>,
                title: "Manage Your Authors",
                description: "No authors found. Create an author profile to organize books and track individual performance.",
                ctaText: "+ Add New Author",
            }}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        />
    );
};

export default Authors;