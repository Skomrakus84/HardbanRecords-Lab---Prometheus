// FIX: This file was a placeholder. Added page implementation.
import React, { useContext } from 'react';
import AnalyticsCharts from '../components/charts/AnalyticsChart';
import { AuthContext } from '../context/AuthContext';

const AnalyticsPage: React.FC = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Platform Analytics</h1>
            <p className="text-gray-400">An overview of key metrics across all your activities.</p>
            <AnalyticsCharts userId={user.id} role={user.role} />
        </div>
    );
};

export default AnalyticsPage;
