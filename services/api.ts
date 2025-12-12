
// FIX: This file was a placeholder file. Implemented mock data and API functions, including integration with the Gemini API for AI-powered features.
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Imported `ActivityStatus` enum to resolve 'Cannot find name' errors.
import {
    MusicRelease, Artist, AnalyticsData, Book, Author, SmartLink, GeneratedTrack, PressRelease,
    Contact, Campaign, CalendarEvent, MediaMention, Content, Product, Order, SocialPlatform,
    Contract, PlaylistPlacement, PublishingStore, Role, ActivityStatus, Transaction, TransactionStatus, 
    TransactionType, WalletData, AudienceData, AudienceSegment, Goal, GoalStatus,
    CollaborationProject, CollaborationProjectStatus, CreativeFeedback, CatalogueAsset, AuditOpportunity,
    SalesForecast,
    CampaignStrategy,
    MarketTrend,
    CreativeOpportunity,
    FanInteraction,
    CommunityAnalytics,
    BrandKeyword,
    BrandReport,
    Integration
} from '../types';

// --- GEMINI API SETUP ---
// FIX: Initialize GoogleGenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- LOCAL STORAGE HELPERS ---
const STORAGE_KEYS = {
    RELEASES: 'hardban_releases',
    ARTISTS: 'hardban_artists',
    BOOKS: 'hardban_books',
    AUTHORS: 'hardban_authors',
    SMARTLINKS: 'hardban_smartlinks',
    PRESS_RELEASES: 'hardban_press_releases',
    CONTACTS: 'hardban_contacts',
    CAMPAIGNS: 'hardban_campaigns',
    CONTENT: 'hardban_content',
    PRODUCTS: 'hardban_products',
    ORDERS: 'hardban_orders',
    GOALS: 'hardban_goals',
    COLLABS: 'hardban_collabs',
    FEEDBACK: 'hardban_feedback',
    INTEGRATIONS: 'hardban_integrations' // New for Integrations tab
};

function loadFromStorage<T>(key: string, defaultData: T): T {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultData;
    } catch (e) {
        console.error(`Error loading ${key} from storage`, e);
        return defaultData;
    }
}

function saveToStorage<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Error saving ${key} to storage`, e);
    }
}

// --- INITIAL MOCK DATA (Defaults) ---
const defaultReleases: MusicRelease[] = [
    { id: 'rel-1', title: 'Cosmic Dream', artist: 'Casey Creator', coverArt: 'https://picsum.photos/seed/cosmic/400/400', status: 'Published', streams: 1250000, revenue: 4500, platforms: 150 },
    { id: 'rel-2', title: 'Midnight City', artist: 'Casey Creator', coverArt: 'https://picsum.photos/seed/midnight/400/400', status: 'Published', streams: 850000, revenue: 2800, platforms: 150 },
    { id: 'rel-3', title: 'Ocean Tides', artist: 'Casey Creator', coverArt: 'https://picsum.photos/seed/ocean/400/400', status: 'Pending', streams: 0, revenue: 0, platforms: 0 },
    { id: 'rel-4', title: 'Synthwave Memories', artist: 'Alex Admin', coverArt: 'https://picsum.photos/seed/synth/400/400', status: 'Published', streams: 3200000, revenue: 9800, platforms: 200 },
];

const defaultArtists: Artist[] = [
    { id: 'creator-001', name: 'Casey Creator', avatar: 'https://i.pravatar.cc/150?u=casey-creator', monthlyListeners: 2500000, totalStreams: 2100000, totalRevenue: 7300, releases: [] }, // Releases linked dynamically
    { id: 'admin-001', name: 'Alex Admin', avatar: 'https://i.pravatar.cc/150?u=admin-alex', monthlyListeners: 5800000, totalStreams: 3200000, totalRevenue: 9800, releases: [] },
];

const defaultBooks: Book[] = [
    { id: 'book-1', title: 'The Silent Forest', author: 'Pat Publisher', coverArt: 'https://picsum.photos/seed/forest/400/600', status: 'Published', sales: 15200, revenue: 65000, stores: 20 },
    { id: 'book-2', title: 'Echoes of Tomorrow', author: 'Pat Publisher', coverArt: 'https://picsum.photos/seed/echoes/400/600', status: 'Published', sales: 8500, revenue: 38000, stores: 20 },
    { id: 'book-3', title: 'Secrets of the Deep', author: 'Pat Publisher', coverArt: 'https://picsum.photos/seed/deep/400/600', status: 'Draft', sales: 0, revenue: 0, stores: 0 },
];

const defaultAuthors: Author[] = [
    { id: 'author-001', name: 'Pat Publisher', avatar: 'https://i.pravatar.cc/150?u=pat-publisher', booksPublished: 2, totalSales: 23700, totalRevenue: 103000, books: [] },
];

const defaultSmartLinks: SmartLink[] = [
    { id: 'sl-1', name: 'Cosmic Dream Pre-Save', shortUrl: 'fan.link/cosmic', originalUrl: 'spotify:track:123', type: 'Pre-Save', clicks: 12450, conversions: 4500 },
    { id: 'sl-2', name: 'Casey Creator Bio', shortUrl: 'fan.link/casey', originalUrl: 'https://casey.com', type: 'Bio-Link', clicks: 8800, conversions: 0 },
];

const defaultPressReleases: PressRelease[] = [
    { id: 'pr-1', title: 'Casey Creator Announces "Cosmic Dream" Single', status: 'Sent', sentDate: '2024-05-15', openRate: 45 },
    { id: 'pr-2', title: 'Pat Publisher\'s "The Silent Forest" Hits Bestseller List', status: 'Draft', sentDate: null, openRate: 0 },
];

const defaultContacts: Contact[] = [
    { id: 'ct-1', name: 'John Doe', email: 'john.doe@musicblog.com', role: 'Press', list: 'Press & Media', dateAdded: '2024-01-10' },
];

const defaultCampaigns: Campaign[] = [
    { id: 'camp-1', name: 'Cosmic Dream Release Campaign', status: 'Active', budget: 5000, startDate: '2024-05-01', endDate: '2024-06-01', channels: ['Spotify Ads', 'Instagram'] },
];

const defaultContent: Content[] = [
    { id: 'cl-1', title: 'Cosmic Dream Instagram Post', type: 'Social Post', status: 'Published', content: 'My new single is out now!', lastModified: '2024-05-20' },
];

const defaultProducts: Product[] = [
    { id: 'prod-1', name: 'Cosmic Dream T-Shirt', price: 25, image: 'https://picsum.photos/seed/tshirt/400/400', category: 'Apparel', sales: 150, stock: 50 },
];

const defaultOrders: Order[] = [
    { id: 'ord-1', customerName: 'Jane Smith', date: '2024-05-21', total: 25.00, status: 'Delivered', items: [{ productId: 'prod-1', quantity: 1 }] },
];

const defaultGoals: Goal[] = [
    { 
        id: 'goal-1', 
        title: "Increase 'Cosmic Dream' streams", 
        description: "Boost the streams for the latest single to drive discovery and revenue.",
        status: GoalStatus.ON_TRACK, 
        dueDate: '2024-08-31', 
        progress: 25, 
        targetMetric: "5,000,000 streams",
        currentValue: "1,250,000",
        suggestedTasks: [
            { id: 't-1-1', description: 'Create a Smart Link for the single', isCompleted: true, link: '/marketing/smart-links' },
            { id: 't-1-2', description: 'Run a social media ad campaign', isCompleted: false, link: '/marketing/campaigns' },
            { id: 't-1-3', description: 'Pitch to 10 independent playlist curators', isCompleted: false, link: '/marketing/contacts' },
        ]
    }
];

const defaultCollabs: CollaborationProject[] = [
    {
        id: 'collab-1',
        title: 'Seeking Vocalist for Chillwave Track',
        description: 'I have a fully produced instrumental track. Looking for a vocalist.',
        creatorId: 'creator-001',
        creatorName: 'Casey Creator',
        status: CollaborationProjectStatus.OPEN,
        rolesNeeded: ['Vocalist', 'Lyricist'],
        revenueSplits: [
            { role: 'Producer', share: 50, userId: 'creator-001' },
            { role: 'Vocalist', share: 25 },
            { role: 'Lyricist', share: 25 },
        ]
    }
];

// --- LOAD DATA FROM STORAGE OR INITIALIZE ---
let releases = loadFromStorage<MusicRelease[]>(STORAGE_KEYS.RELEASES, defaultReleases);
let artists = loadFromStorage<Artist[]>(STORAGE_KEYS.ARTISTS, defaultArtists);
let books = loadFromStorage<Book[]>(STORAGE_KEYS.BOOKS, defaultBooks);
let authors = loadFromStorage<Author[]>(STORAGE_KEYS.AUTHORS, defaultAuthors);
let smartLinks = loadFromStorage<SmartLink[]>(STORAGE_KEYS.SMARTLINKS, defaultSmartLinks);
let pressReleases = loadFromStorage<PressRelease[]>(STORAGE_KEYS.PRESS_RELEASES, defaultPressReleases);
let contacts = loadFromStorage<Contact[]>(STORAGE_KEYS.CONTACTS, defaultContacts);
let campaigns = loadFromStorage<Campaign[]>(STORAGE_KEYS.CAMPAIGNS, defaultCampaigns);
let contentLibrary = loadFromStorage<Content[]>(STORAGE_KEYS.CONTENT, defaultContent);
let products = loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, defaultProducts);
let orders = loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, defaultOrders);
let goals = loadFromStorage<Goal[]>(STORAGE_KEYS.GOALS, defaultGoals);
let collaborationProjects = loadFromStorage<CollaborationProject[]>(STORAGE_KEYS.COLLABS, defaultCollabs);
let creativeFeedbackHistory: CreativeFeedback[] = loadFromStorage(STORAGE_KEYS.FEEDBACK, []);

// Fix relationships after loading
artists.forEach(a => {
    a.releases = releases.filter(r => r.artist === a.name);
});
authors.forEach(a => {
    a.books = books.filter(b => b.author === a.name);
});


// --- STATIC DATA (No storage needed yet) ---
const transactions: Transaction[] = [
    { id: 'txn-1', date: '2024-06-20', description: "Royalty from 'Cosmic Dream' on Spotify", type: TransactionType.ROYALTY, status: TransactionStatus.CLEARED, amount: 150.25 },
    { id: 'txn-2', date: '2024-06-19', description: "Sale of 'Cosmic Dream T-Shirt'", type: TransactionType.SALE, status: TransactionStatus.CLEARED, amount: 18.50 },
    { id: 'txn-3', date: '2024-06-18', description: "Sale of 'The Silent Forest' on Amazon", type: TransactionType.SALE, status: TransactionStatus.CLEARED, amount: 4.99 },
    { id: 'txn-4', date: '2024-06-15', description: "Payout to Bank Account", type: TransactionType.PAYOUT, status: TransactionStatus.PAID_OUT, amount: -5200.00 },
];

const audienceData: AudienceData = {
    totalAudience: 785430,
    audienceGrowth: [
        { month: 'Jan', newFollowers: 1200 },
        { month: 'Feb', newFollowers: 1500 },
        { month: 'Mar', newFollowers: 1300 },
        { month: 'Apr', newFollowers: 1800 },
        { month: 'May', newFollowers: 2500 },
        { month: 'Jun', newFollowers: 3200 },
    ],
    engagementRate: 4.7,
    topEngagement: [
        { id: 'eng-1', contentTitle: 'Cosmic Dream', contentType: 'Release', metric: 'Streams', value: 1250000 },
    ],
    geoDistribution: [ { id: 'USA', value: 500000 }, { id: 'GBR', value: 150000 }, { id: 'CAN', value: 120000 }, { id: 'AUS', value: 100000 }, { id: 'DEU', value: 80000 } ],
    fanDemographics: {
        age: [ { name: '18-24', value: 45 }, { name: '25-34', value: 35 }, { name: '35-44', value: 15 }, { name: '45+', value: 5 } ],
        gender: [ { name: 'Female', value: 55 }, { name: 'Male', value: 42 }, { name: 'Non-binary', value: 3 } ]
    }
};

const fanInteractions: FanInteraction[] = [
    { id: 'fi-1', fanId: 'fan-1', fanName: 'SynthwaveLover88', fanAvatar: 'https://i.pravatar.cc/150?u=fan1', type: 'Comment', content: "Cosmic Dream is an absolute masterpiece!", date: new Date().toISOString() },
];


// --- API FUNCTIONS (Updated to use storage) ---

// MUSIC
export const getMusicData = () => {
    // Re-link relationships
    artists.forEach(a => {
        a.releases = releases.filter(r => r.artist === a.name);
    });
    return { releases, artists };
};
export const getArtists = () => artists;
export const getArtistById = (id: string) => artists.find(a => a.id === id);
export const addArtist = (name: string) => {
    const newArtist: Artist = {
        id: `artist-${Date.now()}`, name, avatar: 'https://i.pravatar.cc/150?u=' + Date.now(), monthlyListeners: 0, totalStreams: 0, totalRevenue: 0, releases: []
    };
    artists.unshift(newArtist);
    saveToStorage(STORAGE_KEYS.ARTISTS, artists);
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
    saveToStorage(STORAGE_KEYS.RELEASES, releases);
    return newRelease;
};
export const getArtistContracts = (artistId: string): Contract[] => [
    { id: 'cont-1', name: 'Recording Contract 2024', date: '2024-01-01', status: 'Active' },
];

// PUBLISHING
export const getPublishingData = () => {
    authors.forEach(a => {
        a.books = books.filter(b => b.author === a.name);
    });
    return { books, authors };
};
export const getAuthors = () => authors;
export const getAuthorById = (id: string) => authors.find(a => a.id === id);
export const addAuthor = (name: string) => {
    const newAuthor: Author = {
        id: `author-${Date.now()}`, name, avatar: 'https://i.pravatar.cc/150?u=' + Date.now(), booksPublished: 0, totalSales: 0, totalRevenue: 0, books: []
    };
    authors.unshift(newAuthor);
    saveToStorage(STORAGE_KEYS.AUTHORS, authors);
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
    saveToStorage(STORAGE_KEYS.BOOKS, books);
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
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
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
export const getAudienceData = (): AudienceData => audienceData;
export const getBookSalesData = () => [ { month: 'Jan', amazon: 4000, apple: 2400, kobo: 1200 }, { month: 'Feb', amazon: 3000, apple: 1398, kobo: 1000 }, { month: 'Mar', amazon: 2000, apple: 9800, kobo: 1500 }, { month: 'Apr', amazon: 2780, apple: 3908, kobo: 1800 }, { month: 'May', amazon: 1890, apple: 4800, kobo: 2000 }, { month: 'Jun', amazon: 2390, apple: 3800, kobo: 2200 } ];
export const getPublishingStores = (): PublishingStore[] => [ { name: 'Amazon KDP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Amazon-KDP-Logo.svg/2560px-Amazon-KDP-Logo.svg.png', status: 'Live' }, { name: 'Apple Books', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/1024px-Apple_Music_icon.svg.png', status: 'Live' }, ];
export const getSmartLinks = () => smartLinks;
export const addSmartLink = (data: Omit<SmartLink, 'id' | 'shortUrl' | 'clicks' | 'conversions'>): SmartLink => {
    const newLink: SmartLink = { ...data, id: `sl-${Date.now()}`, shortUrl: `fan.link/new${Date.now()}`, clicks: 0, conversions: 0 };
    smartLinks.unshift(newLink);
    saveToStorage(STORAGE_KEYS.SMARTLINKS, smartLinks);
    return newLink;
}
export const getPressReleases = () => pressReleases;
export const addPressRelease = (data: Partial<PressRelease>): PressRelease => {
    const newRelease: PressRelease = { id: `pr-${Date.now()}`, title: data.title || 'New Draft', status: 'Draft', sentDate: null, openRate: 0 };
    pressReleases.unshift(newRelease);
    saveToStorage(STORAGE_KEYS.PRESS_RELEASES, pressReleases);
    return newRelease;
}
export const getContacts = () => contacts;
export const addContact = (data: Omit<Contact, 'id' | 'dateAdded'>): Contact => {
    const newContact: Contact = { ...data, id: `ct-${Date.now()}`, dateAdded: new Date().toISOString().split('T')[0] };
    contacts.unshift(newContact);
    saveToStorage(STORAGE_KEYS.CONTACTS, contacts);
    return newContact;
}
export const getCampaigns = () => campaigns;
export const addCampaign = (data: Partial<Campaign>): Campaign => {
    const newCampaign: Campaign = { id: `camp-${Date.now()}`, name: 'New Campaign', status: 'Planning', budget: 0, startDate: '', endDate: '', channels: [], ...data };
    campaigns.unshift(newCampaign);
    saveToStorage(STORAGE_KEYS.CAMPAIGNS, campaigns);
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
    saveToStorage(STORAGE_KEYS.CONTENT, contentLibrary);
    return newContent;
}
export const getPlaylistPlacements = (): PlaylistPlacement[] => [
    { id: 'pl-1', playlistName: 'Chillwave Vibes', platform: 'Spotify', followers: 125000, releaseTitle: 'Cosmic Dream' },
    { id: 'pl-2', playlistName: 'Synthwave Hits', platform: 'Apple Music', followers: 250000, releaseTitle: 'Synthwave Memories' },
];

// FINANCES
export const getWalletData = (): WalletData => ({
    currentBalance: 5850.75,
    lifetimeEarnings: 125680.00,
    nextPayoutAmount: 5850.75,
    nextPayoutDate: 'July 15, 2024',
    earningsBreakdown: [
        { name: 'Music Royalties', value: 75000 },
        { name: 'Book Sales', value: 45000 },
        { name: 'Merchandise', value: 5680 },
    ]
});
export const getTransactions = (): Transaction[] => transactions;

// STRATEGY
export const getGoals = (): Goal[] => goals;
export const addGoal = (goalData: Partial<Goal>): Goal => {
    const newGoal: Goal = {
        id: `goal-${Date.now()}`,
        title: 'New Goal',
        description: '',
        status: GoalStatus.NOT_STARTED,
        dueDate: '',
        progress: 0,
        targetMetric: '',
        currentValue: '',
        suggestedTasks: [],
        ...goalData
    };
    goals.unshift(newGoal);
    saveToStorage(STORAGE_KEYS.GOALS, goals);
    return newGoal;
};

// COLLABORATION
export const getCollaborationProjects = (): CollaborationProject[] => collaborationProjects;
export const addCollaborationProject = (projectData: Omit<CollaborationProject, 'id' | 'status' | 'creatorId' | 'creatorName'>, creator: {id: string, name: string}): CollaborationProject => {
    const newProject: CollaborationProject = {
        ...projectData,
        id: `collab-${Date.now()}`,
        status: CollaborationProjectStatus.OPEN,
        creatorId: creator.id,
        creatorName: creator.name,
    };
    collaborationProjects.unshift(newProject);
    saveToStorage(STORAGE_KEYS.COLLABS, collaborationProjects);
    return newProject;
};

// CREATIVE
export const getCreativeFeedbackHistory = (): CreativeFeedback[] => creativeFeedbackHistory;
export const addCreativeFeedback = (feedback: Omit<CreativeFeedback, 'id' | 'analysisDate'>): CreativeFeedback => {
    const newFeedback: CreativeFeedback = {
        ...feedback,
        id: `cf-${Date.now()}`,
        analysisDate: new Date().toISOString(),
    };
    creativeFeedbackHistory.unshift(newFeedback);
    saveToStorage(STORAGE_KEYS.FEEDBACK, creativeFeedbackHistory);
    return newFeedback;
};

// INTEGRATIONS (New)
const defaultIntegrations: Integration[] = [
    { id: 'int-1', name: 'Spotify for Artists', type: 'DSP', status: 'Connected', iconUrl: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' },
    { id: 'int-2', name: 'Stripe', type: 'Payment', status: 'Disconnected', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
    { id: 'int-3', name: 'Mailchimp', type: 'Marketing', status: 'Disconnected', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Mailchimp_logo.svg' },
    { id: 'int-4', name: 'Meta Business Suite', type: 'Social', status: 'Connected', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
];

export const getIntegrations = (): Integration[] => loadFromStorage(STORAGE_KEYS.INTEGRATIONS, defaultIntegrations);

export const toggleIntegration = (id: string): Integration[] => {
    const current = getIntegrations();
    const updated = current.map(i => i.id === id ? { ...i, status: i.status === 'Connected' ? 'Disconnected' : 'Connected' } : i);
    saveToStorage(STORAGE_KEYS.INTEGRATIONS, updated);
    return updated as Integration[];
};


// --- GEMINI API FUNCTIONS ---

export const generateTextContent = async (prompt: string): Promise<string> => {
    try {
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

export const generateAudienceSegments = async (data: AudienceData): Promise<AudienceSegment[]> => {
    try {
        const prompt = `Based on the following JSON data about a creator's audience, generate 3 distinct audience segments or personas. For each segment, provide a creative name, a brief description, its size as a percentage of the total audience, 2-3 key characteristics, and a short, actionable marketing insight. Audience data: ${JSON.stringify(data)}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            sizePercentage: { type: Type.NUMBER },
                            keyCharacteristics: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                            marketingInsight: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating audience segments:", error);
        // Return mock data on failure
        return [
            { name: 'The Trendsetter', description: 'Early adopters who are highly engaged on social media.', sizePercentage: 25, keyCharacteristics: ['Ages 18-24', 'High social media usage', 'Prefers digital music'], marketingInsight: 'Engage them with TikTok challenges and behind-the-scenes content.' },
            { name: 'The Loyal Collector', description: 'Dedicated fans who purchase physical media and merchandise.', sizePercentage: 15, keyCharacteristics: ['Ages 25-44', 'Buys merchandise', 'Attends live events'], marketingInsight: 'Offer exclusive limited-edition vinyl or signed book copies.' },
            { name: 'The Casual Browser', description: 'Discovered the creator through playlists or recommendations.', sizePercentage: 60, keyCharacteristics: ['Wide age range', 'Passive listener/reader', 'Low merchandise purchase rate'], marketingInsight: 'Convert them to followers with targeted ads and email newsletters offering exclusive content.' },
        ];
    }
};

export const generateGoalSuggestions = async (userRole: Role, userData: any): Promise<Partial<Goal>[]> => {
    try {
        const prompt = `You are a strategic advisor for a ${userRole === Role.MUSIC_CREATOR ? 'music creator' : 'book author'}. Based on their current data, suggest 3 actionable and specific goals. For each goal, provide a title, a short description, a targetMetric (e.g., "100,000 streams"), and a due date within the next 3 months. User Data: ${JSON.stringify(userData)}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            targetMetric: { type: Type.STRING },
                            dueDate: { type: Type.STRING, description: "Date in YYYY-MM-DD format" }
                        },
                        required: ["title", "description", "targetMetric", "dueDate"]
                    }
                }
            }
        });
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating goal suggestions:", error);
        // Return mock data on failure
        return [
            { title: "Engage Your Top Audience Segment", description: "Create a targeted campaign for 'The Trendsetter' segment to boost engagement.", targetMetric: "10% engagement increase", dueDate: new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0] },
            { title: "Boost 'Midnight City' Streams", description: "Run a campaign to get the 'Midnight City' single to 1 million total streams.", targetMetric: "1,000,000 streams", dueDate: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0] },
            { title: "Plan Next Release", description: "Finalize and schedule your next release, 'Ocean Tides', to maintain momentum.", targetMetric: "Release scheduled", dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0] },
        ];
    }
}

export const analyzeCreativeIdea = async (idea: string, audienceData: AudienceData): Promise<Omit<CreativeFeedback, 'id' | 'analysisDate'>> => {
    try {
        const prompt = `You are an expert A&R and literary agent. Analyze this creative idea: "${idea}". 
        Base your analysis on this audience data: ${JSON.stringify(audienceData.fanDemographics)}.
        Provide a commercial potential score (0-100).
        Identify the top 3 key emotional triggers from this list: Nostalgia, Excitement, Melancholy, Tension, Joy. Provide a score for each (0-100).
        Give 3 concrete, actionable creative suggestions for improvement.
        Return the data as a JSON object.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        ideaSnippet: { type: Type.STRING },
                        commercialPotential: { type: Type.NUMBER },
                        keyEmotions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    emotion: { type: Type.STRING },
                                    score: { type: Type.NUMBER }
                                }
                            }
                        },
                        creativeSuggestions: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error analyzing creative idea:", error);
        // Fallback mock data
        return {
            ideaSnippet: idea,
            commercialPotential: 75,
            keyEmotions: [{ emotion: 'Nostalgia', score: 85 }, { emotion: 'Joy', score: 65 }],
            creativeSuggestions: ["This is mock data due to an API error.", "Consider simplifying the chorus.", "The visual concept is strong."]
        };
    }
};

export const getAIAssistantResponse = async (prompt: string): Promise<string> => {
    return generateTextContent(`You are an expert marketing assistant for music artists and authors. Respond to the following user query: "${prompt}"`);
};

export const getMediaMentions = async (): Promise<MediaMention[] | { error: string }> => {
    try {
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
        return { error: `An error occurred while searching for mentions: ${error.message}` };
    }
};

export const getCreatorCatalogue = (userId: string): CatalogueAsset[] => {
    const musicAssets: CatalogueAsset[] = releases.map(r => ({
        id: r.id,
        type: 'Music',
        title: r.title,
        authorOrArtist: r.artist,
        coverArt: r.coverArt,
        releaseDate: '2023-10-26'
    }));
    const bookAssets: CatalogueAsset[] = books.map(b => ({
        id: b.id,
        type: 'Book',
        title: b.title,
        authorOrArtist: b.author,
        coverArt: b.coverArt,
        releaseDate: '2022-05-15'
    }));
    return [...musicAssets, ...bookAssets];
};

export const runCatalogueAudit = async (catalogue: CatalogueAsset[]): Promise<AuditOpportunity[]> => {
    try {
        const prompt = `You are an expert A&R and marketing strategist. Analyze this creator's back-catalogue and identify up to 3-4 assets with the highest untapped potential for re-monetization or promotion. For each identified asset, provide a "potentialScore" (0-100), a concise "insight" explaining why it has potential (e.g., genre is trending, seasonal relevance), and a list of 2-3 concrete "suggestedActions". Catalogue data: ${JSON.stringify(catalogue)}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            assetId: { type: Type.STRING },
                            assetTitle: { type: Type.STRING },
                            assetType: { type: Type.STRING },
                            potentialScore: { type: Type.NUMBER },
                            insight: { type: Type.STRING },
                            suggestedActions: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ["assetId", "assetTitle", "assetType", "potentialScore", "insight", "suggestedActions"]
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error running catalogue audit:", error);
        return [
            { assetId: 'rel-2', assetTitle: 'Midnight City', assetType: 'Music', potentialScore: 85, insight: "The Synthwave genre is experiencing a resurgence on TikTok. This track fits the trend perfectly.", suggestedActions: ["Create a TikTok campaign using this track.", "Pitch to 'Retro Revival' Spotify playlists.", "Run targeted ads to fans of The Midnight and Kavinsky."] },
            { assetId: 'book-1', assetTitle: 'The Silent Forest', assetType: 'Book', potentialScore: 78, insight: "With the rise of #DarkAcademia and #CottageCore on social media, this book's theme is highly relevant again.", suggestedActions: ["Promote on Instagram and Pinterest with aesthetic visuals.", "Offer a limited-time discount for the e-book.", "Engage with BookTok influencers for reviews."] },
        ];
    }
};

export const runSalesForecast = async (asset: CatalogueAsset, period: number): Promise<SalesForecast> => {
    try {
        const unit = asset.type === 'Music' ? 'streams' : 'sales';
        const prompt = `You are a data scientist specializing in media sales forecasting. Analyze this creative asset: ${JSON.stringify(asset)}. 
        Generate a realistic sales/stream forecast for the next ${period} months. 
        Provide a month-by-month breakdown with 'projected', 'optimistic', and 'pessimistic' scenarios for the units (${unit}).
        Also provide a total projectedUnits and projectedRevenue for the period, a confidence level ('High', 'Medium', or 'Low'), and a short strategic 'insight'.
        Assume a revenue of $0.0035 per stream for music, and $4.50 per sale for books.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        projectedUnits: { type: Type.NUMBER },
                        projectedRevenue: { type: Type.NUMBER },
                        confidence: { type: Type.STRING },
                        insight: { type: Type.STRING },
                        data: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    month: { type: Type.STRING },
                                    projected: { type: Type.NUMBER },
                                    optimistic: { type: Type.NUMBER },
                                    pessimistic: { type: Type.NUMBER }
                                }
                            }
                        }
                    },
                    required: ["projectedUnits", "projectedRevenue", "confidence", "insight", "data"]
                }
            }
        });
        
        const jsonResult = JSON.parse(response.text.trim());
        return {
            ...jsonResult,
            assetId: asset.id,
            assetTitle: asset.title,
            forecastPeriod: period,
        };

    } catch (error) {
        console.error("Error running sales forecast:", error);
        const months = Array.from({ length: period }, (_, i) => new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }));
        const mockData = months.map((m, i) => ({
            month: m,
            projected: 50000 + i * 10000,
            optimistic: 60000 + i * 12000,
            pessimistic: 40000 + i * 8000,
        }));

        return {
            assetId: asset.id,
            assetTitle: asset.title,
            forecastPeriod: period,
            projectedUnits: 390000,
            projectedRevenue: 1365,
            confidence: 'Medium',
            insight: 'This is fallback mock data due to an API error. The forecast suggests steady growth based on historical trends.',
            data: mockData
        };
    }
};

export const generateCampaignStrategy = async (asset: CatalogueAsset, platform: string): Promise<CampaignStrategy> => {
    try {
        const prompt = `You are an expert marketing strategist for independent creators. A ${asset.type === 'Music' ? 'musician' : 'author'} wants to launch a marketing campaign for their asset titled "${asset.title}" by ${asset.authorOrArtist}. The campaign will primarily target ${platform}. Create a comprehensive 4-week marketing strategy as a JSON object. The strategy should include a catchy campaign title, a description of the target audience, the key messaging, 3-4 content pillars, a 4-week timeline with specific activities for each week, and 2 sample posts for the target platform, including an image prompt for one of them.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        campaignTitle: { type: Type.STRING },
                        targetAudience: { type: Type.STRING },
                        keyMessaging: { type: Type.STRING },
                        contentPillars: { type: Type.ARRAY, items: { type: Type.STRING } },
                        timeline: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    week: { type: Type.STRING },
                                    activities: { type: Type.ARRAY, items: { type: Type.STRING } }
                                }
                            }
                        },
                        postExamples: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    platform: { type: Type.STRING },
                                    content: { type: Type.STRING },
                                    imagePrompt: { type: Type.STRING }
                                }
                            }
                        }
                    },
                    required: ["campaignTitle", "targetAudience", "keyMessaging", "contentPillars", "timeline", "postExamples"]
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating campaign strategy:", error);
        return {
            campaignTitle: `Mock Campaign for ${asset.title}`,
            targetAudience: "Target audience would be described here.",
            keyMessaging: "Key messaging and campaign slogan.",
            contentPillars: ["Behind the Scenes", "Creator's Story", "Interactive Content"],
            timeline: [
                { week: "Week 1", activities: ["Announce project", "Share snippets"] },
            ],
            postExamples: [
                { platform: platform, content: "This is a mock post example.", imagePrompt: "A vibrant, abstract image." }
            ]
        };
    }
};

export const findMarketOpportunities = async (catalogue: CatalogueAsset[], role: Role): Promise<{ trends: MarketTrend[], opportunities: CreativeOpportunity[] }> => {
    try {
        const creatorType = role === Role.MUSIC_CREATOR ? 'music creator' : 'book author';
        const prompt = `You are a market trend analyst for a ${creatorType}. Their current catalogue is: ${JSON.stringify(catalogue.map(c => c.title))}. 
        Find 3 current (within the last 3-6 months), specific, and verifiable market trends. 
        Then, generate 2 unique and actionable creative opportunities based on these trends and the creator's existing style.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        trends: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    platform: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                }
                            }
                        },
                        opportunities: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    relatedTrendId: { type: Type.STRING },
                                    assetSuggestion: {
                                        type: Type.OBJECT,
                                        properties: {
                                            type: { type: Type.STRING },
                                            format: { type: Type.STRING }
                                        }
                                    },
                                    aiSnippet: {
                                        type: Type.OBJECT,
                                        properties: {
                                            type: { type: Type.STRING },
                                            content: { type: Type.STRING }
                                        }
                                    },
                                    rationale: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const jsonResponse = JSON.parse(response.text.trim());
        
        if (groundingChunks && groundingChunks.length > 0) {
            jsonResponse.trends.forEach((trend: any, index: number) => {
                const source = groundingChunks[index % groundingChunks.length]?.web;
                if (source) {
                    trend.source = { title: source.title || "Web Source", uri: source.uri };
                }
            });
        }
        
        return jsonResponse;

    } catch (error) {
        console.error("Error finding market opportunities:", error);
        return {
            trends: [
                { id: 'trend-1', platform: 'TikTok', description: 'Retro-funk and synthwave sounds are trending.', source: { title: 'TikTok Trends', uri: '#' } },
            ],
            opportunities: [
                { id: 'opp-1', title: 'Create a "Neon Groove" TikTok Sound', description: 'Produce a high-energy synthwave clip.', relatedTrendId: 'trend-1', assetSuggestion: { type: 'Short-form Content', format: '15-second TikTok Audio' }, aiSnippet: { type: 'Melody Description', content: 'Catchy bassline.' }, rationale: 'Directly taps into the trend.' },
            ]
        };
    }
};

export const getCommunityAnalytics = async (): Promise<CommunityAnalytics> => {
     try {
        const prompt = `Analyze this raw data of recent fan interactions and generate a community analytics report. Fan Interaction Data: ${JSON.stringify(fanInteractions)}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        communityPulseSummary: { type: Type.STRING },
                        topFans: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    fanId: { type: Type.STRING },
                                    fanName: { type: Type.STRING },
                                    fanAvatar: { type: Type.STRING },
                                    reason: { type: Type.STRING },
                                    suggestedAction: { type: Type.STRING }
                                }
                            }
                        },
                        engagementOpportunities: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    interactionId: { type: Type.STRING },
                                    fanName: { type: Type.STRING },
                                    fanAvatar: { type: Type.STRING },
                                    comment: { type: Type.STRING },
                                    aiReplySuggestion: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating community analytics:", error);
        return {
            communityPulseSummary: "This is mock data due to an API error. Overall fan sentiment is positive.",
            topFans: [],
            engagementOpportunities: []
        };
    }
};

export const getBrandReport = async (keywords: BrandKeyword[]): Promise<BrandReport> => {
    try {
        const activeKeywords = keywords.filter(k => k.isActive).map(k => k.text).join(', ');
        if (!activeKeywords) throw new Error("No active keywords provided.");

        const prompt = `Analyze the public perception of a creative brand based on these keywords: "${activeKeywords}".
        Provide a brand report including sentiment, archetype, and SWOT analysis.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sentiment: {
                            type: Type.OBJECT,
                            properties: {
                                positiveScore: { type: Type.NUMBER },
                                neutralScore: { type: Type.NUMBER },
                                negativeScore: { type: Type.NUMBER },
                                keyPositiveTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
                                keyNegativeTopics: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        },
                        archetype: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                description: { type: Type.STRING },
                                keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        },
                        swot: {
                            type: Type.OBJECT,
                            properties: {
                                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                                opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                                threats: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        const reportData = JSON.parse(jsonStr);
        
        return {
            ...reportData,
            generatedAt: new Date().toISOString()
        };

    } catch (error) {
        console.error("Error generating brand report:", error);
        return {
            generatedAt: new Date().toISOString(),
            sentiment: {
                positiveScore: 65, neutralScore: 25, negativeScore: 10,
                keyPositiveTopics: ["Nostalgic sounds"], keyNegativeTopics: ["Long wait"]
            },
            archetype: { name: "The Magician", description: "Creates transformative experiences.", keywords: ["Visionary"] },
            swot: { strengths: ["Strong fanbase"], weaknesses: ["Infrequent releases"], opportunities: ["Patreon"], threats: ["Burnout"] }
        };
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
