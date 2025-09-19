import React from 'react';
import Card from '../../components/ui/Card';
import { getSocialPlatforms } from '../../services/api';

const SocialMediaPage: React.FC = () => {
    const platforms = getSocialPlatforms();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card className="p-8">
                     <h2 className="text-2xl font-bold text-white">Schedule a Post</h2>
                     <p className="text-gray-400 mb-6">Craft your message and schedule it across multiple platforms.</p>
                     <div className="space-y-4">
                        <textarea 
                            rows={5} 
                            className="w-full bg-dark-bg p-3 rounded-lg border border-dark-border focus:ring-primary-purple focus:border-primary-purple"
                            placeholder="What's on your mind?"
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-2 text-gray-400">
                                {/* Add attachment icons here */}
                            </div>
                            <button className="bg-primary-blue hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg">Schedule</button>
                        </div>
                     </div>
                </Card>
                 <Card className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Upcoming Posts</h2>
                     {/* Placeholder for a list of scheduled posts */}
                    <div className="text-center py-10 border-2 border-dashed border-dark-border rounded-lg">
                        <p className="text-gray-400">No posts scheduled yet.</p>
                    </div>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Connected Platforms</h3>
                    <div className="space-y-3">
                        {platforms.map(p => (
                            <div key={p.id} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="text-primary-purple">{p.icon}</div>
                                    <span className="font-semibold">{p.name}</span>
                                </div>
                                <span className={`text-xs font-bold ${p.status === 'Connected' ? 'text-success-green' : 'text-gray-500'}`}>{p.status}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SocialMediaPage;