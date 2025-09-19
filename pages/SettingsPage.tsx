// FIX: This was a placeholder file. Implemented the SettingsPage component.
import React, { useState, useContext } from 'react';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import { AuthContext, ToastContext } from '../context/AuthContext';
import { User } from '../types';

const ProfileSettings = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const [name, setName] = useState(user?.name || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({ name, avatar });
        addToast('Profile updated successfully!', 'success');
    };

    return (
        <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center space-x-6">
                <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300">Avatar URL</label>
                    <input type="text" value={avatar} onChange={e => setAvatar(e.target.value)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-dark-bg border-dark-border rounded-md p-3" />
            </div>
            <div className="pt-4 flex justify-end">
                <button type="submit" className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg">Save Changes</button>
            </div>
        </form>
    );
};

const NotificationSettings = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Email Notifications</h3>
            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <p>Weekly Performance Summary</p>
                <input type="checkbox" className="h-5 w-5 rounded bg-dark-bg/50 border-gray-500 text-primary-purple focus:ring-primary-purple" defaultChecked />
            </div>
             <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <p>New Platform Payouts</p>
                <input type="checkbox" className="h-5 w-5 rounded bg-dark-bg/50 border-gray-500 text-primary-purple focus:ring-primary-purple" defaultChecked />
            </div>
        </div>
    );
};


const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'notifications', label: 'Notifications' },
    ];

    return (
        <div className="space-y-8">
            <Card className="p-8">
                <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
                <div className="mt-8">
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;
