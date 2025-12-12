
import React from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import WorkflowOrchestrator from './WorkflowOrchestrator';
import ImmersiveLab from './ImmersiveLab';
import GlobalLocalizationPage from './GlobalLocalizationPage';
import SmartRightsPage from './SmartRightsPage';
import ArtFactoryPage from './ArtFactoryPage';

const PrometheusGenesisPage: React.FC = () => {
    const location = useLocation();
    
    const getTitle = () => {
        const path = location.pathname.split('/prometheus/')[1] || 'orchestrator';
        switch(path) {
            case 'orchestrator': return 'Workflow Orchestrator';
            case 'immersive': return 'Immersive Lab (AR/VR)';
            case 'localization': return 'Global Localization AI';
            case 'smart-rights': return 'Smart Rights & IP';
            case 'art-factory': return 'Art Factory';
            default: return 'Prometheus Genesis';
        }
    };

    const navLinks = [
        { path: 'orchestrator', label: 'Workflow', icon: '⚡' },
        { path: 'immersive', label: 'Immersive', icon: '🕶️' },
        { path: 'localization', label: 'Localization', icon: '🌍' },
        { path: 'smart-rights', label: 'Smart Rights', icon: '🛡️' },
        { path: 'art-factory', label: 'Art Factory', icon: '🎨' },
    ];

    const PrometheusHeader = () => (
         <div className="flex justify-between items-center bg-dark-card/50 p-4 rounded-xl border border-dark-border overflow-x-auto">
            <nav className="flex space-x-2 min-w-max">
                {navLinks.map(link => (
                    <Link 
                        key={link.path} 
                        to={link.path} 
                        className={`flex items-center py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                            location.pathname.includes(`/prometheus/${link.path}`)
                             ? 'bg-primary-purple text-white'
                             : 'text-gray-300 hover:bg-dark-border hover:text-white'
                        }`}
                    >
                         <span className="mr-2 text-lg">{link.icon}</span> {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );

    return (
        <DashboardPage 
            title={getTitle()} 
            component={
                <div className="space-y-6">
                    <PrometheusHeader />
                    <div className="pt-6">
                        <Routes>
                            <Route path="/" element={<Navigate to="orchestrator" replace />} />
                            <Route path="orchestrator" element={<WorkflowOrchestrator />} />
                            <Route path="immersive" element={<ImmersiveLab />} />
                            <Route path="localization" element={<GlobalLocalizationPage />} />
                            <Route path="smart-rights" element={<SmartRightsPage />} />
                            <Route path="art-factory" element={<ArtFactoryPage />} />
                        </Routes>
                    </div>
                </div>
            }
        />
    );
};

export default PrometheusGenesisPage;
