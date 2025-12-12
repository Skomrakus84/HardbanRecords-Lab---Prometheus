
import React, { useState, useContext, useEffect } from 'react';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import { AuthContext, ToastContext } from '../context/AuthContext';
import { SharedIcons } from '../components/common/Icons';
import { getIntegrations, toggleIntegration } from '../services/api';
import { Integration } from '../types';

// --- Sub-components for better organization ---

const ProfileEditor = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    
    // Local state initialized from global user context
    const [name, setName] = useState(user?.name || '');
    const [email] = useState(user?.email || ''); // Read-only usually
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [location, setLocation] = useState(user?.location || '');
    const [website, setWebsite] = useState(user?.website || '');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({ name, avatar, bio, location, website });
        addToast('Profile updated successfully!', 'success');
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 relative group cursor-pointer mx-auto md:mx-0">
                    <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-dark-border object-cover" />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Change</span>
                    </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Avatar URL</label>
                        <input type="text" value={avatar} onChange={e => setAvatar(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                        <input type="email" value={email} disabled className="w-full bg-dark-bg/50 border border-dark-border rounded-lg p-3 text-gray-500 cursor-not-allowed" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                        <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple transition-colors" placeholder="Tell us about yourself..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                        <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple transition-colors" placeholder="City, Country" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
                        <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple transition-colors" placeholder="https://..." />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-dark-border">
                <button type="submit" className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all">Save Changes</button>
            </div>
        </form>
    );
};

const PreferencesSettings = () => {
    const { user, updateUser } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);

    const [language, setLanguage] = useState(user?.preferences?.language || 'English');
    const [currency, setCurrency] = useState(user?.preferences?.currency || 'USD');
    const [timezone, setTimezone] = useState(user?.preferences?.timezone || 'UTC');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({ preferences: { language, currency, timezone } });
        addToast('Preferences updated successfully!', 'success');
    };

    return (
        <form onSubmit={handleSave} className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white">Platform Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Language</label>
                    <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Polish</option>
                        <option>Japanese</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Currency</label>
                    <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>PLN (zł)</option>
                        <option>JPY (¥)</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Timezone</label>
                    <select value={timezone} onChange={e => setTimezone(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-purple focus:border-primary-purple">
                        <option value="UTC-8">Pacific Time (US & Canada) (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (US & Canada) (UTC-5)</option>
                        <option value="UTC+0">London, Dublin (UTC+0)</option>
                        <option value="UTC+1">Warsaw, Berlin, Paris (UTC+1)</option>
                        <option value="UTC+9">Tokyo, Seoul (UTC+9)</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-dark-border">
                <button type="submit" className="bg-primary-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all">Update Preferences</button>
            </div>
        </form>
    );
};

const AccountSecurity = () => {
    const { addToast } = useContext(ToastContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            addToast("New passwords don't match.", 'error');
            return;
        }
        // Mock API call
        addToast('Password updated successfully.', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Change Password</h3>
                <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                        <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white" />
                    </div>
                    <button type="submit" className="bg-dark-border hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Update Password</button>
                </form>
            </div>

            <div className="pt-8 border-t border-dark-border">
                <h3 className="text-xl font-bold text-white mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                    <div>
                        <p className="font-semibold text-white">Protect your account</p>
                        <p className="text-sm text-gray-400">Secure your account with 2FA via SMS or Authenticator App.</p>
                    </div>
                    <button className="text-primary-purple hover:text-white font-semibold transition-colors">Enable 2FA</button>
                </div>
            </div>

            <div className="pt-8 border-t border-dark-border">
                <h3 className="text-xl font-bold text-error-red mb-4">Danger Zone</h3>
                <div className="p-4 bg-error-red/10 border border-error-red/30 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="font-bold text-error-red">Delete Account</p>
                        <p className="text-sm text-gray-400">Permanently remove your account and all associated data.</p>
                    </div>
                    <button className="bg-error-red hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors" onClick={() => alert("This feature is disabled in the demo.")}>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

const NotificationSettings = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white">Email Notifications</h3>
            <div className="space-y-4">
                {[
                    { label: 'Weekly Performance Summary', desc: 'Get a digest of your streams and sales.' },
                    { label: 'New Platform Payouts', desc: 'Receive an email when royalties are deposited.' },
                    { label: 'Marketing Campaign Updates', desc: 'Alerts when your campaigns start or end.' },
                    { label: 'Security Alerts', desc: 'Get notified of suspicious login attempts.' }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                        <div>
                            <p className="font-semibold text-white">{item.label}</p>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name={`toggle-${idx}`} id={`toggle-${idx}`} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                            <label htmlFor={`toggle-${idx}`} className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-purple cursor-pointer"></label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const IntegrationsManager = () => {
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const { addToast } = useContext(ToastContext);

    useEffect(() => {
        setIntegrations(getIntegrations());
    }, []);

    const handleToggle = (id: string) => {
        const updated = toggleIntegration(id);
        setIntegrations(updated);
        const integ = updated.find(i => i.id === id);
        if (integ) {
            addToast(`${integ.name} ${integ.status === 'Connected' ? 'connected' : 'disconnected'}.`, 'success');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-primary-blue/10 border border-primary-blue/20 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-primary-blue flex items-center gap-2">
                    <SharedIcons.Strategy /> API Bridges
                </h4>
                <p className="text-sm text-gray-300 mt-1">Connect your external accounts to sync real-time data into your dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map(integration => (
                    <div key={integration.id} className="p-4 bg-dark-bg border border-dark-border rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/10 rounded-lg p-2 flex items-center justify-center">
                                <img src={integration.iconUrl} alt={integration.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{integration.name}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${integration.status === 'Connected' ? 'bg-success-green/20 text-success-green' : 'bg-gray-700 text-gray-400'}`}>
                                    {integration.status}
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleToggle(integration.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                integration.status === 'Connected' 
                                    ? 'bg-dark-border hover:bg-red-900/30 text-gray-300 hover:text-red-400' 
                                    : 'bg-primary-blue hover:bg-blue-600 text-white'
                            }`}
                        >
                            {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BillingSettings = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-primary-purple/20 to-primary-blue/20 p-6 rounded-2xl border border-primary-purple/30">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                        <p className="text-primary-purple font-semibold">$29.99 / month</p>
                        <p className="text-sm text-gray-400 mt-2">Next billing date: August 1, 2024</p>
                    </div>
                    <span className="bg-success-green text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Active</span>
                </div>
                <div className="mt-6 flex gap-4">
                    <button className="bg-white text-dark-bg font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">Manage Subscription</button>
                    <button className="text-gray-300 hover:text-white font-medium py-2 px-4">Download Invoices</button>
                </div>
            </div>

            <div>
                <h4 className="text-lg font-bold text-white mb-4">Payment Methods</h4>
                <div className="p-4 bg-dark-bg border border-dark-border rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-700 p-2 rounded">💳</div>
                        <div>
                            <p className="text-white font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-gray-400">Expires 12/25</p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">Edit</button>
                </div>
                <button className="mt-4 text-primary-purple text-sm font-semibold hover:underline">+ Add Payment Method</button>
            </div>
        </div>
    );
};


const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const tabs = [
        { id: 'profile', label: 'Edit Profile' },
        { id: 'preferences', label: 'Preferences' },
        { id: 'security', label: 'Account Security' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'integrations', label: 'Integrations' },
        { id: 'billing', label: 'Billing & Plan' },
    ];

    return (
        <div className="space-y-8">
            <Card className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="text-3xl text-primary-purple"><SharedIcons.Settings /></div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                        <p className="text-gray-400">Manage your personal information, preferences, and billing.</p>
                    </div>
                </div>
                
                <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
                
                <div className="mt-8">
                    {activeTab === 'profile' && <ProfileEditor />}
                    {activeTab === 'preferences' && <PreferencesSettings />}
                    {activeTab === 'security' && <AccountSecurity />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                    {activeTab === 'integrations' && <IntegrationsManager />}
                    {activeTab === 'billing' && <BillingSettings />}
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;
