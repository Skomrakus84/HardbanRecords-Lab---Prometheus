
import React, { useState, useContext } from 'react';
import Card from '../../components/ui/Card';
import { getCreatorCatalogue } from '../../services/api';
import { AuthContext, ToastContext } from '../../context/AuthContext';
import { SharedIcons } from '../../components/common/Icons';

const SmartRightsPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { addToast } = useContext(ToastContext);
    const catalogue = user ? getCreatorCatalogue(user.id) : [];
    
    const [selectedAssetId, setSelectedAssetId] = useState<string>('');
    const [mintingStatus, setMintingStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
    const [contractHash, setContractHash] = useState<string | null>(null);

    const handleMint = () => {
        if (!selectedAssetId) return;
        setMintingStatus('processing');
        
        // Simulate blockchain delay
        setTimeout(() => {
            setMintingStatus('completed');
            setContractHash(`0x${Math.random().toString(16).substr(2, 40)}`);
            addToast('Asset successfully registered on blockchain!', 'success');
        }, 3000);
    };

    return (
        <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-r from-green-900/20 to-dark-card border border-green-500/30">
                <div className="flex items-center space-x-4">
                    <div className="text-4xl text-success-green"><SharedIcons.Shield /></div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Smart Rights & IP Manager</h1>
                        <p className="text-gray-300 mt-1">Secure your intellectual property on the blockchain. Generate certificates and manage smart contracts.</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Register New Asset</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Select Catalogue Asset</label>
                            <select 
                                value={selectedAssetId}
                                onChange={(e) => {
                                    setSelectedAssetId(e.target.value);
                                    setMintingStatus('idle');
                                    setContractHash(null);
                                }}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white"
                            >
                                <option value="">-- Select an Asset --</option>
                                {catalogue.map(asset => (
                                    <option key={asset.id} value={asset.id}>{asset.title} ({asset.type})</option>
                                ))}
                            </select>
                        </div>

                        {selectedAssetId && (
                            <div className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                                <h4 className="font-bold text-white">Asset Details</h4>
                                <p className="text-sm text-gray-400 mt-1">Title: {catalogue.find(a => a.id === selectedAssetId)?.title}</p>
                                <p className="text-sm text-gray-400">Owner: {user?.name}</p>
                                <p className="text-sm text-gray-400">Rights: 100% Master & Composition</p>
                            </div>
                        )}

                        <button
                            onClick={handleMint}
                            disabled={!selectedAssetId || mintingStatus === 'processing' || mintingStatus === 'completed'}
                            className={`w-full py-4 px-6 rounded-lg font-bold text-white shadow-lg transition-all ${
                                mintingStatus === 'completed' 
                                    ? 'bg-success-green cursor-default' 
                                    : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500'
                            } disabled:opacity-50`}
                        >
                            {mintingStatus === 'idle' && 'Mint Smart Contract'}
                            {mintingStatus === 'processing' && 'Registering on Blockchain...'}
                            {mintingStatus === 'completed' && 'Registration Complete'}
                        </button>
                    </div>
                </Card>

                <div className="flex flex-col justify-center">
                    {mintingStatus === 'completed' ? (
                        <Card className="p-8 border-2 border-success-green bg-success-green/5 text-center animate-slide-up">
                            <div className="w-20 h-20 rounded-full bg-success-green/20 flex items-center justify-center mx-auto mb-6 text-success-green text-5xl">
                                ✓
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Certificate of Ownership</h2>
                            <p className="text-gray-400 mb-6">This asset has been immutably recorded.</p>
                            
                            <div className="bg-dark-bg p-4 rounded-lg text-left mb-6 font-mono text-xs text-gray-400 break-all">
                                <p className="mb-2"><strong className="text-gray-300">Asset ID:</strong> {selectedAssetId}</p>
                                <p className="mb-2"><strong className="text-gray-300">Contract Hash:</strong> {contractHash}</p>
                                <p><strong className="text-gray-300">Timestamp:</strong> {new Date().toISOString()}</p>
                            </div>

                            <button className="text-success-green hover:text-white font-semibold underline">
                                View on Block Explorer &rarr;
                            </button>
                        </Card>
                    ) : (
                         <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-dark-card/50 rounded-2xl border-2 border-dashed border-dark-border opacity-50">
                            <div className="text-6xl mb-4">⛓️</div>
                            <h3 className="text-xl font-bold text-white">Blockchain Secure</h3>
                            <p className="text-gray-400 mt-2">Select an asset to generate a smart contract and prove ownership.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartRightsPage;
