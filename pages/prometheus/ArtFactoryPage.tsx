
import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import { generateAIImage } from '../../services/api';
import { SharedIcons } from '../../components/common/Icons';
import SuspenseLoader from '../../components/ui/SuspenseLoader';

const ArtFactoryPage: React.FC = () => {
    const [basePrompt, setBasePrompt] = useState('');
    const [variations, setVariations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const styles = ['Cyberpunk', 'Minimalist', 'Oil Painting', 'Surrealist 3D'];

    const handleGenerateVariations = async () => {
        if (!basePrompt.trim()) return;
        setIsLoading(true);
        setVariations([]);

        // Parallel generation simulation
        const promises = styles.map(style => 
            generateAIImage(`${basePrompt}, ${style} style`, style)
        );

        const results = await Promise.all(promises);
        setVariations(results);
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-r from-pink-600/20 to-dark-card border border-pink-500/30">
                <div className="flex items-center space-x-4">
                    <div className="text-4xl text-pink-500"><SharedIcons.Palette /></div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Art Factory (Hyper-Automation)</h1>
                        <p className="text-gray-300 mt-1">Generate massive variations of your visual assets for A/B testing and multi-platform campaigns.</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="p-6 lg:col-span-1 h-fit">
                    <h3 className="text-xl font-bold text-white mb-4">Base Concept</h3>
                    <textarea 
                        value={basePrompt}
                        onChange={e => setBasePrompt(e.target.value)}
                        rows={6}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white mb-4"
                        placeholder="Describe your core visual concept (e.g., A lonely astronaut sitting on a neon park bench)..."
                    />
                    <button 
                        onClick={handleGenerateVariations}
                        disabled={isLoading || !basePrompt}
                        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 transition-all"
                    >
                        {isLoading ? 'Dreaming...' : 'Generate 4 Variations'}
                    </button>
                </Card>

                <div className="lg:col-span-3">
                    {isLoading ? (
                        <div className="h-96 flex items-center justify-center"><SuspenseLoader /></div>
                    ) : variations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {variations.map((src, idx) => (
                                <Card key={idx} className="group overflow-hidden relative">
                                    <img src={src} alt={`Variation ${idx}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-white font-bold">{styles[idx]}</p>
                                        <button className="text-xs text-pink-400 hover:text-white mt-1">Download for A/B Test</button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-dark-card/50 rounded-2xl border-2 border-dashed border-dark-border">
                            <div className="text-6xl mb-4">🎨</div>
                            <h3 className="text-xl font-bold text-white">Empty Canvas</h3>
                            <p className="text-gray-400 mt-2">Enter a prompt to automatically generate stylistic variations.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtFactoryPage;
