

import React from 'react';
import { getPublishingData, getBookSalesData } from '../../services/api';
import Card from '../../components/ui/Card';
import BookCard from '../../components/publishing/BookCard';
import AuthorCard from '../../components/publishing/AuthorCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PublishingDashboard: React.FC = () => {
    const { books, authors } = getPublishingData();
    const salesData = getBookSalesData();

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary-indigo to-blue-500">
                    <p className="text-lg text-indigo-200">Published Books</p>
                    <p className="text-5xl font-bold text-white">{books.length}</p>
                </Card>
                <Card className="p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-500 to-pink-500">
                    <p className="text-lg text-purple-200">Active Authors</p>
                    <p className="text-5xl font-bold text-white">{authors.length}</p>
                </Card>
                <Card className="p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-green-500 to-teal-500">
                    <p className="text-lg text-green-200">Total Sales</p>
                    <p className="text-5xl font-bold text-white">{(books.reduce((acc, b) => acc + b.sales, 0)).toLocaleString()}</p>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Sales Trend (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                        <Legend />
                        <Line type="monotone" dataKey="amazon" name="Amazon" stroke="#F59E0B" strokeWidth={2} />
                        <Line type="monotone" dataKey="apple" name="Apple Books" stroke="#A855F7" strokeWidth={2} />
                        <Line type="monotone" dataKey="kobo" name="Kobo" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Recently Published Books</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.slice(0, 3).map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Top Authors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {authors.map(author => (
                        <AuthorCard key={author.id} author={author} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublishingDashboard;