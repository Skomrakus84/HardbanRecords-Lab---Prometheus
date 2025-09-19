
import React from 'react';
import { MusicRelease } from '../../types';
import Card from '../ui/Card';

interface ReleaseCardProps {
    release: MusicRelease;
    // FIX: Make isSelected and onSelect optional for display-only usage.
    isSelected?: boolean;
    onSelect?: (id: string) => void;
}

const StatusBadge: React.FC<{ status: MusicRelease['status'] }> = ({ status }) => {
    const colorClasses = {
        Published: 'bg-success-green/20 text-success-green',
        Pending: 'bg-warning-yellow/20 text-warning-yellow',
        Draft: 'bg-gray-500/20 text-gray-400',
    };
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses[status]}`}>
            {status}
        </span>
    );
};

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, isSelected = false, onSelect }) => {
    
    // FIX: Removed unused event parameter to match Card's onClick prop type.
    const handleCardClick = () => {
        // Prevent selection when clicking on interactive elements inside the card if any
        // For now, the whole card is clickable for selection
        onSelect?.(release.id);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        onSelect?.(release.id);
    };


    return (
        <div className="relative">
            <Card className={`overflow-hidden group transition-all duration-200 ${isSelected ? 'ring-2 ring-primary-purple scale-105' : 'ring-0'}`} onClick={onSelect ? handleCardClick : undefined}>
                <div className="relative">
                    <img src={release.coverArt} alt={release.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    {/* FIX: Conditionally render selection UI only if onSelect is provided. */}
                    {onSelect && (
                        <div className="absolute top-2 left-2 z-10">
                            <input 
                                type="checkbox"
                                checked={isSelected}
                                onChange={handleCheckboxChange}
                                onClick={(e) => e.stopPropagation()} // Prevent card click handler from firing twice
                                className="h-5 w-5 rounded bg-dark-bg/50 border-gray-500 text-primary-purple focus:ring-primary-purple"
                            />
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{release.title}</h3>
                        <p className="text-sm text-gray-300">{release.artist}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                        <StatusBadge status={release.status} />
                    </div>
                </div>
                <div className="p-4 bg-dark-bg/50">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-xs text-gray-400">Streams</p>
                            <p className="text-lg font-semibold text-white">{release.streams.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Revenue</p>
                            <p className="text-lg font-semibold text-white">${release.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Platforms</p>
                            <p className="text-lg font-semibold text-white">{release.platforms}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ReleaseCard;
