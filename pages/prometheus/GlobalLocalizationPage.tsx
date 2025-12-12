
import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import { generateTextContent } from '../../services/api';
import { SharedIcons } from '../../components/common/Icons';
import SuspenseLoader from '../../components/ui/SuspenseLoader';

interface TranslationResult {
    language: string;
    translatedText: string;
    culturalNotes: string;
}

const GlobalLocalizationPage: React.FC = () => {
    const [sourceText, setSourceText] = useState('');
    const [targetLangs, setTargetLangs] = useState<string[]>(['Spanish', 'Japanese']);
    const [results, setResults] = useState<TranslationResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleTranslate = async () => {
        if (!sourceText.trim()) return;
        setIsLoading(true);
        setResults([]);

        const newResults: TranslationResult[] = [];

        for (const lang of targetLangs) {
            const prompt = `Translate the following creative text (lyrics, bio, or book description) into ${lang}. 
            Crucially, provide a "Cultural Note" explaining any nuances, idioms, or changes made to fit the local culture better.
            
            Text: "${sourceText}"
            
            Format:
            [Translation]
            ...
            [Cultural Note]
            ...`;
            
            const response = await generateTextContent(prompt);
            const parts = response.split('[Cultural Note]');
            const translation = parts[0]?.replace('[Translation]', '').trim() || response;
            const note = parts[1]?.trim() || 'No specific cultural notes for this direct translation.';

            newResults.push({
                language: lang,
                translatedText: translation,
                culturalNotes: note
            });
        }

        setResults(newResults);
        setIsLoading(false);
    };

    const toggleLang = (lang: string) => {
        setTargetLangs(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
    };

    const availableLangs = ['Spanish', 'Japanese', 'German', 'French', 'Korean', 'Portuguese'];

    return (
        <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-r from-blue-900/20 to-dark-card border border-blue-500/30">
                <div className="flex items-center space-x-4">
                    <div className="text-4xl text-primary-blue"><SharedIcons.Globe /></div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Global Localization AI</h1>
                        <p className="text-gray-300 mt-1">Translate your creative assets with cultural intelligence. Reach global fans authentically.</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="p-6 lg:col-span-1 h-fit">
                    <h3 className="text-xl font-bold text-white mb-4">Input Content</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Target Languages</label>
                            <div className="flex flex-wrap gap-2">
                                {availableLangs.map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => toggleLang(lang)}
                                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                                            targetLangs.includes(lang)
                                                ? 'bg-primary-blue text-white'
                                                : 'bg-dark-bg text-gray-400 hover:bg-dark-border'
                                        }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Source Text</label>
                            <textarea 
                                value={sourceText}
                                onChange={e => setSourceText(e.target.value)}
                                rows={8}
                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:ring-primary-blue focus:border-primary-blue"
                                placeholder="Paste lyrics, artist bio, or book blurb here..."
                            />
                        </div>

                        <button 
                            onClick={handleTranslate}
                            disabled={isLoading || !sourceText}
                            className="w-full bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 transition-all"
                        >
                            {isLoading ? 'Localizing...' : 'Translate & Localize'}
                        </button>
                    </div>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    {isLoading && <div className="h-64"><SuspenseLoader /></div>}
                    
                    {!isLoading && results.length === 0 && (
                         <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-dark-card/50 rounded-2xl border-2 border-dashed border-dark-border">
                            <div className="text-6xl mb-4">🌍</div>
                            <h3 className="text-xl font-bold text-white">Ready to go Global?</h3>
                            <p className="text-gray-400 mt-2">Enter your text on the left to receive culturally aware translations.</p>
                        </div>
                    )}

                    {results.map((result, idx) => (
                        <Card key={idx} className="p-6 animate-fade-in">
                            <div className="flex justify-between items-center mb-4 border-b border-dark-border pb-2">
                                <h3 className="text-xl font-bold text-white">{result.language}</h3>
                                <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue text-xs rounded font-semibold">AI Localized</span>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-1">Translation</h4>
                                <p className="text-gray-200 whitespace-pre-wrap font-serif text-lg">{result.translatedText}</p>
                            </div>
                            <div className="bg-dark-bg/50 p-4 rounded-lg flex items-start space-x-3">
                                <div className="text-primary-purple mt-1"><SharedIcons.AIAssistant /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Cultural Insight</h4>
                                    <p className="text-sm text-gray-400 italic">{result.culturalNotes}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GlobalLocalizationPage;
