// FIX: This was a placeholder file. Added all necessary type definitions and enums for the application to resolve type-related errors across multiple files.
import React from 'react';

export enum Role {
    ADMIN = 'ADMIN',
    MUSIC_CREATOR = 'MUSIC_CREATOR',
    BOOK_AUTHOR = 'BOOK_AUTHOR',
}

export interface User {
    id: string;
    name: string;
    role: Role;
    avatar: string;
}

export interface StatCardData {
    title: string;
    value: string;
    trend: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}

export interface PerformanceMetric {
    title: string;
    value: string;
    trend: string;
    subtext: string;
    icon: React.ReactNode;
    gradient: string;
}

export enum ActivityStatus {
    SUCCESS = 'Success',
    PENDING = 'Pending',
    FAILED = 'Failed',
}

export interface ActivityItem {
    emoji: string;
    title: string;
    details: string;
    status: ActivityStatus;
}

export interface MusicRelease {
    id: string;
    title: string;
    artist: string;
    coverArt: string;
    status: 'Published' | 'Pending' | 'Draft';
    streams: number;
    revenue: number;
    platforms: number;
}

export interface Artist {
    id: string;
    name: string;
    avatar: string;
    monthlyListeners: number;
    totalStreams: number;
    totalRevenue: number;
    releases: MusicRelease[];
}

export interface GeoData {
    id: string;
    value: number;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    coverArt: string;
    status: 'Published' | 'Draft';
    sales: number;
    revenue: number;
    stores: number;
}

export interface Author {
    id: string;
    name: string;
    avatar: string;
    booksPublished: number;
    totalSales: number;
    totalRevenue: number;
    books: Book[];
}

export interface SmartLink {
    id: string;
    name: string;
    shortUrl: string;
    originalUrl: string;
    type: 'Pre-Save' | 'Bio-Link' | 'Single';
    clicks: number;
    conversions: number;
}

export interface GeneratedTrack {
    title: string;
    genre: string;
    mood: string;
    duration: number;
    url: string;
}

export interface PressRelease {
    id: string;
    title: string;
    status: 'Sent' | 'Draft';
    sentDate: string | null;
    openRate: number;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    role: string;
    list: string;
    dateAdded: string;
}

export type CampaignStatus = 'Active' | 'Planning' | 'Completed' | 'Paused';

export interface Campaign {
    id: string;
    name: string;
    status: CampaignStatus;
    budget: number;
    startDate: string;
    endDate: string;
    channels: string[];
}

export interface CalendarEvent {
    date: string;
    title: string;
    color: 'purple' | 'blue' | 'green' | 'yellow';
}

export interface MediaMention {
    id: string;
    source: string;
    url: string;
    title: string;
    snippet: string;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    publishedAt: string;
}

export interface Content {
    id: string;
    title: string;
    type: 'Social Post' | 'Blog Article' | 'Ad Copy' | 'Email';
    status: 'Draft' | 'Scheduled' | 'Published';
    content: string;
    lastModified: string;
}

export type ProductCategory = 'Apparel' | 'Accessory' | 'Digital';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: ProductCategory;
    sales: number;
    stock: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
    id: string;
    customerName: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: { productId: string; quantity: number }[];
}

export interface AnalyticsData {
    streamsTrend: { name: string; streams: number }[];
    revenueBreakdown: { name: string; value: number }[];
    platformRevenue: { name: string; value: number }[];
    geoDistribution: GeoData[];
    fanDemographics: {
        age: { name: string; value: number }[];
        gender: { name: string; value: number }[];
    };
}

export interface SocialPlatform {
    id: string;
    name: string;
    icon: React.ReactNode;
    status: 'Connected' | 'Not Connected';
}

export interface Contract {
    id: string;
    name: string;
    date: string;
    status: 'Active' | 'Expired';
}

export interface PlaylistPlacement {
    id: string;
    playlistName: string;
    platform: string;
    followers: number;
    releaseTitle: string;
}

export interface PublishingStore {
    name: string;
    logo: string;
    status: 'Live' | 'Processing';
}
