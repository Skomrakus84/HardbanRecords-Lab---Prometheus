import React, { useState, useMemo } from 'react';
import { getArtists, addArtist } from '../../services/api';
import { Artist } from '../../types';
import ArtistCard from '../../components/music/ArtistCard';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';

const AddArtistModal: React.FC<{ isOpen: boolean, onClose: () => void, onArtistAdded: (artist: Artist) => void }> = ({ isOpen, onClose, onArtistAdded }) => {
    const [name, setName] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            const newArtist = addArtist(name);
            onArtistAdded(newArtist);
            setName('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Artist">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm">Artist Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 bg-dark-bg p-2 rounded-md border border-dark-border" />
                </div>
                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-primary-purple py-2 px-6 rounded-lg">Add Artist</button>
                </div>
            </form>
        </Modal>
    );
};


const Artists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>(getArtists());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleArtistAdded = (newArtist: Artist) => {
        setArtists(prev => [newArtist, ...prev]);
        setIsModalOpen(false);
    };

    const filteredArtists = useMemo(() => {
        return artists.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [artists, searchTerm]);

    return (
        <div className="space-y-6">
            <Card className="p-4">
                <div className="flex justify-between items-center">
                    <input 
                        type="text" 
                        placeholder="Search artists..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-dark-bg border border-dark-border rounded-lg p-2 text-sm w-64"
                    />
                    <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
                        + New Artist
                    </button>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArtists.map(artist => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
            
            <AddArtistModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onArtistAdded={handleArtistAdded}
            />
        </div>
    );
};

export default Artists;
