// FIX: This file was a placeholder. Added page implementation.
import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { getContacts, addContact } from '../../services/api';
import { Contact } from '../../types';

const AddContactModal: React.FC<{ isOpen: boolean, onClose: () => void, onContactAdded: (contact: Contact) => void }> = ({ isOpen, onClose, onContactAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Press');
    const [list, setList] = useState('General');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            const newContact = addContact({ name, email, role, list });
            onContactAdded(newContact);
            setName('');
            setEmail('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Contact">
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
        </Modal>
    );
};

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState(getContacts());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleContactAdded = (newContact: Contact) => {
        setContacts(prev => [newContact, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Contacts CRM</h2>
                    <p className="text-gray-400">Manage your industry and fan contacts.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
                    + New Contact
                </button>
            </div>
            <Card>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-dark-border">
                        <thead className="bg-dark-bg">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">List</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date Added</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {contacts.map(contact => (
                                <tr key={contact.id} className="hover:bg-dark-bg">
                                    <td className="px-6 py-4 text-sm font-medium text-white">{contact.name}</td>
                                    <td className="px-6 py-4 text-sm text-primary-purple">{contact.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{contact.role}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{contact.list}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{contact.dateAdded}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <AddContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onContactAdded={handleContactAdded} />
        </div>
    );
};

export default ContactsPage;
