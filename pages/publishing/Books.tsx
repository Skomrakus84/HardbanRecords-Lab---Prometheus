// FIX: This was a placeholder file. Implemented the Books page.
import React, { useState, useMemo, useContext } from 'react';
import { getPublishingData, addBook } from '../../services/api';
import { Book } from '../../types';
import BookCard from '../../components/publishing/BookCard';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import BookWizard from '../../components/publishing/BookWizard';
import { ToastContext } from '../../context/AuthContext';

const Books: React.FC = () => {
    const { addToast } = useContext(ToastContext);
    const [books, setBooks] = useState<Book[]>(getPublishingData().books);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelect = (id: string) => {
        setSelectedBooks(prev => 
            prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
        );
    };

    const handleBookAdded = (bookData: Partial<Book>) => {
        const newBook = addBook(bookData);
        setBooks(prev => [newBook, ...prev]);
        addToast('Book created successfully!', 'success');
    };

    const filteredBooks = useMemo(() => {
        return books.filter(b => 
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [books, searchTerm]);

    return (
        <div className="space-y-6">
            <Card className="p-4">
                <div className="flex justify-between items-center">
                    <input 
                        type="text" 
                        placeholder="Search books..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-dark-bg border border-dark-border rounded-lg p-2 text-sm w-64"
                    />
                    <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
                        + New Book
                    </button>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        isSelected={selectedBooks.includes(book.id)}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Book">
                <BookWizard 
                    onClose={() => setIsModalOpen(false)}
                    onComplete={handleBookAdded}
                />
            </Modal>
        </div>
    );
};

export default Books;
