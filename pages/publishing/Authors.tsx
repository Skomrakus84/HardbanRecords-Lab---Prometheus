import React, { useState, useMemo } from 'react';
import { getAuthors, addAuthor } from '../../services/api';
import { Author } from '../../types';
import AuthorCard from '../../components/publishing/AuthorCard';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';

const AddAuthorModal: React.FC<{ isOpen: boolean, onClose: () => void, onAuthorAdded: (author: Author) => void }> = ({ isOpen, onClose, onAuthorAdded }) => {
    const [name, setName] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            const newAuthor = addAuthor(name);
            onAuthorAdded(newAuthor);
            setName('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Author">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm">Author Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 bg-dark-bg p-2 rounded-md border border-dark-border" />
                </div>
                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-primary-purple py-2 px-6 rounded-lg">Add Author</button>
                </div>
            </form>
        </Modal>
    );
};

const Authors: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>(getAuthors());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAuthorAdded = (newAuthor: Author) => {
        setAuthors(prev => [newAuthor, ...prev]);
        setIsModalOpen(false);
    };

    const filteredAuthors = useMemo(() => {
        return authors.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [authors, searchTerm]);

    return (
        <div className="space-y-6">
            <Card className="p-4">
                <div className="flex justify-between items-center">
                    <input 
                        type="text" 
                        placeholder="Search authors..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-dark-bg border border-dark-border rounded-lg p-2 text-sm w-64"
                    />
                    <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
                        + New Author
                    </button>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAuthors.map(author => (
                    <AuthorCard key={author.id} author={author} />
                ))}
            </div>
            <AddAuthorModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAuthorAdded={handleAuthorAdded}
            />
        </div>
    );
};

export default Authors;
