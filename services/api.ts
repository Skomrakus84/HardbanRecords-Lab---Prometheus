// FIX: This file was a placeholder file. Implemented mock data and API functions, including integration with the Gemini API for AI-powered features.
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Imported `ActivityStatus` enum to resolve 'Cannot find name' errors.
import {
    MusicRelease, Artist, AnalyticsData, Book, Author, SmartLink, GeneratedTrack, PressRelease,
    Contact, Campaign, CalendarEvent, MediaMention, Content, Product, Order, SocialPlatform,
    Contract, PlaylistPlacement, PublishingStore, Role, ActivityStatus
} from '../types';

// --- GEMINI API SETUP ---
// FIX: Initialize GoogleGenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


// --- MOCK DATA ---
const releases: MusicRelease[] = [
    { id: 'rel-1', title: 'Cosmic Dream', artist: 'Casey Creator', coverArt: 'https://picsum.photos/seed/cosmic/400/400', status: 'Published', streams: 1250000, revenue: 4500, platforms: 150 },
    { id: 'rel-2', title: 'Midnight City', artist: 'Casey Creator', coverArt: 'https://picsum.photos/seed/midnight/400/400', status: 'Published', streams: 850000, revenue: 2800, platforms: 150 },
    { id: 'rel-3', title: 'Ocean Tides', artist: 'Casey Creator', coverArt: 'https://picsum.photos/seed/ocean/400/400', status: 'Pending', streams: 0, revenue: 0, platforms: 0 },
    { id: 'rel-4', title: 'Synthwave Memories', artist: 'Alex Admin', coverArt: 'https://picsum.photos/seed/synth/400/400', status: 'Published', streams: 3200000, revenue: 9800, platforms: 200 },
];

const artists: Artist[] = [
    { id: 'creator-001', name: 'Casey Creator', avatar: 'https://i.pravatar.cc/150?u=casey-creator', monthlyListeners: 2500000, totalStreams: 2100000, totalRevenue: 7300, releases: releases.filter(r => r.artist === 'Casey Creator') },
    { id: 'admin-001', name: 'Alex Admin', avatar: 'https://i.pravatar.cc/150?u=admin-alex', monthlyListeners: 5800000, totalStreams: 3200000, totalRevenue: 9800, releases: releases.filter(r => r.artist === 'Alex Admin') },
];

const books: Book[] = [
    { id: 'book-1', title: 'The Silent Forest', author: 'Pat Publisher', coverArt: 'https://picsum.photos/seed/forest/400/600', status: 'Published', sales: 15200, revenue: 65000, stores: 20 },
    { id: 'book-2', title: 'Echoes of Tomorrow', author: 'Pat Publisher', coverArt: 'https://picsum.photos/seed/echoes/400/600', status: 'Published', sales: 8500, revenue: 38000, stores: 20 },
    { id: 'book-3', title: 'Secrets of the Deep', author: 'Pat Publisher', coverArt: 'https://picsum.photos/seed/deep/400/600', status: 'Draft', sales: 0, revenue: 0, stores: 0 },
];

const authors: Author[] = [
    { id: 'author-001', name: 'Pat Publisher', avatar: 'https://i.pravatar.cc/150?u=pat-publisher', booksPublished: 2, totalSales: 23700, totalRevenue: 103000, books },
];

let smartLinks: SmartLink[] = [
    { id: 'sl-1', name: 'Cosmic Dream Pre-Save', shortUrl: 'fan.link/cosmic', originalUrl: 'spotify:track:123', type: 'Pre-Save', clicks: 12450, conversions: 4500 },
    { id: 'sl-2', name: 'Casey Creator Bio', shortUrl: 'fan.link/casey', originalUrl: 'https://casey.com', type: 'Bio-Link', clicks: 8800, conversions: 0 },
];

let pressReleases: PressRelease[] = [
    { id: 'pr-1', title: 'Casey Creator Announces "Cosmic Dream" Single', status: 'Sent', sentDate: '2024-05-15', openRate: 45 },
    { id: 'pr-2', title: 'Pat Publisher\'s "The Silent Forest" Hits Bestseller List', status: 'Draft', sentDate: null, openRate: 0 },
];

let contacts: Contact[] = [
    { id: 'ct-1', name: 'John Doe', email: 'john.doe@musicblog.com', role: 'Press', list: 'Press & Media', dateAdded: '2024-01-10' },
];

let campaigns: Campaign[] = [
    { id: 'camp-1', name: 'Cosmic Dream Release Campaign', status: 'Active', budget: 5000, startDate: '2024-05-01', endDate: '2024-06-01', channels: ['Spotify Ads', 'Instagram'] },
];

let contentLibrary: Content[] = [
    { id: 'cl-1', title: 'Cosmic Dream Instagram Post', type: 'Social Post', status: 'Published', content: 'My new single is out now!', lastModified: '2024-05-20' },
];

let products: Product[] = [
    { id: 'prod-1', name: 'Cosmic Dream T-Shirt', price: 25, image: 'https://picsum.photos/seed/tshirt/400/400', category: 'Apparel', sales: 150, stock: 50 },
];

let orders: Order[] = [
    { id: 'ord-1', customerName: 'Jane Smith', date: '2024-05-21', total: 25.00, status: 'Delivered', items: [{ productId: 'prod-1', quantity: 1 }] },
];


// --- API FUNCTIONS ---

// MUSIC
export const getMusicData = () => ({ releases, artists });
export const getArtists = () => artists;
export const getArtistById = (id: string) => artists.find(a => a.id === id);
export const addArtist = (name: string) => {
    const newArtist: Artist = {
        id: `artist-${Date.now()}`, name, avatar: 'https://i.pravatar.cc/150?u=' + Date.now(), monthlyListeners: 0, totalStreams: 0, totalRevenue: 0, releases: []
    };
    artists.unshift(newArtist);
    return newArtist;
}
export const addRelease = (releaseData: Partial<MusicRelease>): MusicRelease => {
    const newRelease: MusicRelease = {
        id: `rel-${Date.now()}`,
        title: 'New Release',
        artist: 'Casey Creator',
        coverArt: 'https://picsum.photos/seed/new/400/400',
        status: 'Draft',
        streams: 0,
        revenue: 0,
        platforms: 0,
        ...releaseData
    };
    releases.unshift(newRelease);
    return newRelease;
};
export const getArtistContracts = (artistId: string): Contract[] => [
    { id: 'cont-1', name: 'Recording Contract 2024', date: '2024-01-01', status: 'Active' },
];

// PUBLISHING
export const getPublishingData = () => ({ books, authors });
export const getAuthors = () => authors;
export const getAuthorById = (id: string) => authors.find(a => a.id === id);
export const addAuthor = (name: string) => {
    const newAuthor: Author = {
        id: `author-${Date.now()}`, name, avatar: 'https://i.pravatar.cc/150?u=' + Date.now(), booksPublished: 0, totalSales: 0, totalRevenue: 0, books: []
    };
    authors.unshift(newAuthor);
    return newAuthor;
}
export const addBook = (bookData: Partial<Book>): Book => {
    const newBook: Book = {
        id: `book-${Date.now()}`,
        title: 'New Book',
        author: 'Pat Publisher',
        coverArt: 'https://picsum.photos/seed/newbook/400/600',
        status: 'Draft',
        sales: 0,
        revenue: 0,
        stores: 0,
        ...bookData
    };
    books.unshift(newBook);
    return newBook;
};

// ECOMMERCE
export const getProducts = () => products;
export const addProduct = (productData: Partial<Product>): Product => {
    const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: 'New Product',
        price: 0,
        stock: 0,
        image: 'https://picsum.photos/seed/newprod/400/400',
        category: 'Apparel',
        sales: 0,
        ...productData
    };
    products.unshift(newProduct);
    return newProduct;
}
export const getOrders = () => orders;

// ANALYTICS & MARKETING
export const getAnalyticsData = (userId?: string): AnalyticsData => ({
    streamsTrend: [ { name: 'Jan', streams: 120000 }, { name: 'Feb', streams: 150000 }, { name: 'Mar', streams: 130000 }, { name: 'Apr', streams: 180000 }, { name: 'May', streams: 250000 }, { name: 'Jun', streams: 320000 } ],
    revenueBreakdown: [ { name: 'Spotify', value: 4500 }, { name: 'Apple Music', value: 3200 }, { name: 'Amazon', value: 1800 }, { name: 'YouTube', value: 1200 } ],
    platformRevenue: [ { name: 'Spotify', value: 4500 }, { name: 'Apple Music', value: 3200 }, { name: 'Amazon', value: 1800 }, { name: 'YouTube', value: 1200 } ],
    geoDistribution: [ { id: 'USA', value: 500000 }, { id: 'GBR', value: 150000 }, { id: 'CAN', value: 120000 }, { id: 'AUS', value: 100000 }, { id: 'DEU', value: 80000 } ],
    fanDemographics: {
        age: [ { name: '18-24', value: 45 }, { name: '25-34', value: 35 }, { name: '35-44', value: 15 }, { name: '45+', value: 5 } ],
        gender: [ { name: 'Female', value: 55 }, { name: 'Male', value: 42 }, { name: 'Non-binary', value: 3 } ]
    }
});
export const getBookSalesData = () => [ { month: 'Jan', amazon: 4000, apple: 2400, kobo: 1200 }, { month: 'Feb', amazon: 3000, apple: 1398, kobo: 1000 }, { month: 'Mar', amazon: 2000, apple: 9800, kobo: 1500 }, { month: 'Apr', amazon: 2780, apple: 3908, kobo: 1800 }, { month: 'May', amazon: 1890, apple: 4800, kobo: 2000 }, { month: 'Jun', amazon: 2390, apple: 3800, kobo: 2200 } ];
export const getPublishingStores = (): PublishingStore[] => [ { name: 'Amazon KDP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Amazon-KDP-Logo.svg/2560px-Amazon-KDP-Logo.svg.png', status: 'Live' }, { name: 'Apple Books', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/1024px-Apple_Music_icon.svg.png', status: 'Live' }, ];
export const getSmartLinks = () => smartLinks;
export const addSmartLink = (data: Omit<SmartLink, 'id' | 'shortUrl' | 'clicks' | 'conversions'>): SmartLink => {
    const newLink: SmartLink = { ...data, id: `sl-${Date.now()}`, shortUrl: `fan.link/new${Date.now()}`, clicks: 0, conversions: 0 };
    smartLinks.unshift(newLink);
    return newLink;
}
export const getPressReleases = () => pressReleases;
export const addPressRelease = (data: Partial<PressRelease>): PressRelease => {
    const newRelease: PressRelease = { id: `pr-${Date.now()}`, title: data.title || 'New Draft', status: 'Draft', sentDate: null, openRate: 0 };
    pressReleases.unshift(newRelease);
    return newRelease;
}
export const getContacts = () => contacts;
export const addContact = (data: Omit<Contact, 'id' | 'dateAdded'>): Contact => {
    const newContact: Contact = { ...data, id: `ct-${Date.now()}`, dateAdded: new Date().toISOString().split('T')[0] };
    contacts.unshift(newContact);
    return newContact;
}
export const getCampaigns = () => campaigns;
export const addCampaign = (data: Partial<Campaign>): Campaign => {
    const newCampaign: Campaign = { id: `camp-${Date.now()}`, name: 'New Campaign', status: 'Planning', budget: 0, startDate: '', endDate: '', channels: [], ...data };
    campaigns.unshift(newCampaign);
    return newCampaign;
}
export const getSocialPlatforms = (): SocialPlatform[] => [
    { id: 'sp-1', name: 'Instagram', icon: '📷', status: 'Connected' },
    { id: 'sp-2', name: 'TikTok', icon: '🎵', status: 'Connected' },
    { id: 'sp-3', name: 'X / Twitter', icon: '✖️', status: 'Not Connected' },
];
export const getCalendarEvents = (): CalendarEvent[] => [ { date: new Date().toISOString(), title: 'Release: Cosmic Dream', color: 'purple' } ];
export const getContentLibrary = () => contentLibrary;
export const addContent = (data: Partial<Content>): Content => {
    const newContent: Content = { id: `cl-${Date.now()}`, title: 'New Content', type: 'Social Post', status: 'Draft', content: '', lastModified: new Date().toISOString().split('T')[0], ...data };
    contentLibrary.unshift(newContent);
    return newContent;
}
export const getPlaylistPlacements = (): PlaylistPlacement[] => [
    { id: 'pl-1', playlistName: 'Chillwave Vibes', platform: 'Spotify', followers: 125000, releaseTitle: 'Cosmic Dream' },
    { id: 'pl-2', playlistName: 'Synthwave Hits', platform: 'Apple Music', followers: 250000, releaseTitle: 'Synthwave Memories' },
];

// --- GEMINI API FUNCTIONS ---

export const generateTextContent = async (prompt: string): Promise<string> => {
    try {
        // FIX: Use ai.models.generateContent for text generation
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating text content:", error);
        return "Sorry, I couldn't generate content right now.";
    }
};

export const generateAIImage = async (prompt: string, style: string): Promise<string> => {
    // FIX: Simulate image generation as per component expectation of receiving a URL
    // In a real app, this would involve generating, storing, and returning the URL.
    return new Promise(resolve => {
        setTimeout(() => {
            const seed = encodeURIComponent(`${prompt}-${style}`);
            resolve(`https://picsum.photos/seed/${seed}/512/512`);
        }, 2000);
    });
};


export const generateAITrack = (genre: string, mood: string, duration: number): Promise<GeneratedTrack> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                title: `${mood} ${genre} Groove`,
                genre, mood, duration,
                url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
            });
        }, 3000);
    });
};

export const getAIInsight = async (contextData: string): Promise<string> => {
     try {
        // FIX: Use ai.models.generateContent for insights
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on this JSON data for a user dashboard, provide a short, actionable strategic insight (2-3 sentences max). Data: ${contextData}`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating AI insight:", error);
        return "Could not generate an insight at this time. Please check your connection and configuration.";
    }
};

export const getAIAssistantResponse = async (prompt: string): Promise<string> => {
    return generateTextContent(`You are an expert marketing assistant for music artists and authors. Respond to the following user query: "${prompt}"`);
};

export const getMediaMentions = async (): Promise<MediaMention[] | { error: string }> => {
    try {
        // FIX: Use ai.models.generateContent with the googleSearch tool for media monitoring
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Find recent web mentions for the artist 'Casey Creator' and their single 'Cosmic Dream'. Return only the most relevant articles, blogs, or social media posts from the last month.",
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (!groundingChunks || groundingChunks.length === 0) {
            return [];
        }

        const mentions: MediaMention[] = groundingChunks.map((chunk, index) => ({
            id: `mention-${index}-${Date.now()}`,
            source: new URL(chunk.web.uri).hostname.replace('www.', ''),
            url: chunk.web.uri,
            title: chunk.web.title || "Untitled Mention",
            snippet: response.text.substring(0, 150) + '...', // Mock snippet
            sentiment: 'Positive', // Mock sentiment
            publishedAt: new Date().toISOString(),
        }));

        return mentions;
    } catch (error: any) {
        console.error("Error fetching media mentions:", error);
        // FIX: Provide a more generic error as per guidelines, assuming API key is handled via environment.
        return { error: `An error occurred while searching for mentions: ${error.message}` };
    }
};

// MOCK DASHBOARD DATA AGGREGATORS
export const getAdminDashboardData = () => ({
    stats: {
        totalRevenue: artists.reduce((sum, a) => sum + a.totalRevenue, 0) + authors.reduce((sum, a) => sum + a.totalRevenue, 0),
        activeArtists: artists.length,
        activeAuthors: authors.length,
        totalStreams: artists.reduce((sum, a) => sum + a.totalStreams, 0),
    },
    activities: [
        { emoji: '🎵', title: 'New Release: "Cosmic Dream"', details: 'Casey Creator', status: ActivityStatus.SUCCESS },
        { emoji: '📖', title: 'Book Published: "The Silent Forest"', details: 'Pat Publisher', status: ActivityStatus.SUCCESS },
    ]
});

export const getCreatorDashboardData = (userId: string, role: Role) => {
    if (role === Role.MUSIC_CREATOR) {
        const artist = getArtistById(userId);
        return {
            stats: {
                monthlyListeners: artist?.monthlyListeners || 0,
                totalStreams: artist?.totalStreams || 0,
                totalRevenue: artist?.totalRevenue || 0,
            },
            activities: artist?.releases.slice(0, 2).map(r => ({
                 emoji: '🎵', title: `Release: "${r.title}"`, details: r.status, status: r.status === 'Published' ? ActivityStatus.SUCCESS : ActivityStatus.PENDING
            }))
        }
    }
    if (role === Role.BOOK_AUTHOR) {
        const author = getAuthorById(userId);
        return {
            stats: {
                booksPublished: author?.booksPublished || 0,
                totalSales: author?.totalSales || 0,
                totalRevenue: author?.totalRevenue || 0,
            },
             activities: author?.books.slice(0, 2).map(b => ({
                 emoji: '📖', title: `Book: "${b.title}"`, details: b.status, status: b.status === 'Published' ? ActivityStatus.SUCCESS : ActivityStatus.PENDING
            }))
        }
    }
    return {};
};
