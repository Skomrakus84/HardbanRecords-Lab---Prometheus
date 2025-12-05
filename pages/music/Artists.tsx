import React, { useState } from 'react';
import { getArtists, addArtist } from '../../services/api';
import { Artist } from '../../types';
import ArtistCard from '../../components/music/ArtistCard';
import ResourceListPage from '../../components/common/ResourceListPage';

const AddArtistForm: React.FC<{ onArtistAdded: (artist: Artist) => void }> = ({ onArtistAdded }) => {
    const [name, setName] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            const newArtist = addArtist(name);
            onArtistAdded(newArtist);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm">Artist Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 bg-dark-bg p-2 rounded-md border border-dark-border" />
            </div>
            <div className="flex justify-end pt-4">
                <button type="submit" className="bg-primary-purple py-2 px-6 rounded-lg">Add Artist</button>
            </div>
        </form>
    );
};


const Artists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>(getArtists());

    const handleArtistAdded = (newArtist: Artist) => {
        setArtists(prev => [newArtist, ...prev]);
    };
    
    return (
        <ResourceListPage<Artist>
            items={artists}
            renderItem={(artist) => (
                <ArtistCard artist={artist} />
            )}
            searchKeys={['name']}
            searchPlaceholder="Search artists..."
            addNewButtonText="New Artist"
            addModalTitle="Add New Artist"
            addModalContent={(onClose) => (
                <AddArtistForm onArtistAdded={(artist) => {
                    handleArtistAdded(artist);
                    onClose();
                }} />
            )}
            emptyState={{
                icon: <>👥</>,
                title: "Build Your Roster",
                description: "No artists found yet. Add your first artist profile to begin tracking streams and managing releases.",
                ctaText: "+ Add New Artist",
            }}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        />
    );
};

export default Artists;