
import React, { useState } from 'react';
import { getContacts, addContact } from '../../services/api';
import { Contact } from '../../types';
import ResourceTablePage, { Column } from '../../components/common/ResourceTablePage';

const AddContactModalContent: React.FC<{ onClose: () => void, onContactAdded: (contact: Contact) => void }> = ({ onClose, onContactAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Press');
    const [list, setList] = useState('General');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            const newContact = addContact({ name, email, role, list });
            onContactAdded(newContact);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full bg-dark-bg border-dark-border rounded-md p-3" required />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-dark-bg border-dark-border rounded-md p-3" required />
            <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Role (e.g., Press, Booking)" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
            <select value={list} onChange={e => setList(e.target.value)} className="w-full bg-dark-bg border-dark-border rounded-md p-3">
                <option>General</option>
                <option>Press & Media</option>
                <option>Booking Agents</option>
                <option>Super Fans</option>
            </select>
            <div className="flex justify-end pt-4">
                <button type="submit" className="bg-primary-purple py-2 px-6 rounded-lg">Add Contact</button>
            </div>
        </form>
    );
};

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState(getContacts());

    const handleContactAdded = (newContact: Contact) => {
        setContacts(prev => [newContact, ...prev]);
    };

    const columns: Column<Contact>[] = [
        { header: 'Name', render: (c) => <span className="font-medium text-white">{c.name}</span> },
        { header: 'Email', render: (c) => <span className="text-primary-purple">{c.email}</span> },
        { header: 'Role', render: (c) => <span className="text-gray-300">{c.role}</span> },
        { header: 'List', render: (c) => <span className="text-gray-300">{c.list}</span> },
        { header: 'Date Added', render: (c) => <span className="text-gray-400">{c.dateAdded}</span> },
    ];

    return (
        <ResourceTablePage<Contact>
            title="Contacts CRM"
            subtitle="Manage your industry and fan contacts."
            items={contacts}
            columns={columns}
            searchKeys={['name', 'email', 'role']}
            searchPlaceholder="Search contacts..."
            addNewButtonText="New Contact"
            addModalTitle="Add New Contact"
            addModalContent={(onClose) => <AddContactModalContent onClose={onClose} onContactAdded={handleContactAdded} />}
            emptyState={{
                icon: <span className="text-4xl">📇</span>,
                title: "Grow Your Network",
                description: "Your contact list is empty. Add industry professionals, media contacts, and super fans to build your reach.",
                ctaText: "+ Add New Contact"
            }}
        />
    );
};

export default ContactsPage;