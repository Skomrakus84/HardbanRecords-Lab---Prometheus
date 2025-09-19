// FIX: This was a placeholder file. Implemented the Releases page.
import React, { useState, useMemo, useContext } from 'react';
import { getMusicData, addRelease } from '../../services/api';
import { MusicRelease } from '../../types';
import ReleaseCard from '../../components/music/ReleaseCard';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ReleaseWizard from '../../components/music/ReleaseWizard';
import { ToastContext } from '../../context/AuthContext';

const Releases: React.FC = () => {
    const { addToast } = useContext(ToastContext);
    const [releases, setReleases] = useState<MusicRelease[]>(getMusicData().releases);
    const [selectedReleases, setSelectedReleases] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelect = (id: string) => {
        setSelectedReleases(prev => 
            prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
        );
    };

    const handleReleaseAdded = (releaseData: Partial<MusicRelease>) => {
        const newRelease = addRelease(releaseData);
        setReleases(prev => [newRelease, ...prev]);
        addToast('Release created successfully!', 'success');
    };

    const filteredReleases = useMemo(() => {
        return releases.filter(r => 
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [releases, searchTerm]);

    return (
        <div className="space-y-6">
            <Card className="p-4">
                <div className="flex justify-between items-center">
                    <input 
                        type="text" 
                        placeholder="Search releases..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-dark-bg border border-dark-border rounded-lg p-2 text-sm w-64"
                    />
                    <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
                        + New Release
                    </button>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReleases.map(release => (
                    <ReleaseCard 
                        key={release.id} 
                        release={release} 
                        isSelected={selectedReleases.includes(release.id)}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Release">
                <ReleaseWizard 
                    onClose={() => setIsModalOpen(false)}
                    onComplete={handleReleaseAdded}
                />
            </Modal>
        </div>
    );
};

export default Releases;
