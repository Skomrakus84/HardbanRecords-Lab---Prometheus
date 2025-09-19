import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { getProducts, addProduct } from '../../services/api';
import { Product, ProductCategory } from '../../types';
import ProductCard from '../../components/ecommerce/ProductCard';

const AddProductModal: React.FC<{ isOpen: boolean, onClose: () => void, onProductAdded: (product: Product) => void }> = ({ isOpen, onClose, onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState<ProductCategory>('Apparel');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = addProduct({ name, price, stock, category });
        onProductAdded(newProduct);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
                <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Price" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
                <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} placeholder="Stock" className="w-full bg-dark-bg border-dark-border rounded-md p-3" />
                <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full bg-dark-bg border-dark-border rounded-md p-3">
                    <option>Apparel</option>
                    <option>Accessory</option>
                    <option>Digital</option>
                </select>
                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-primary-purple py-2 px-6 rounded-lg">Add Product</button>
                </div>
            </form>
        </Modal>
    );
};

const Products: React.FC = () => {
    const [products, setProducts] = useState(getProducts());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProductAdded = (newProduct: Product) => {
        setProducts(prev => [newProduct, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Products</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary-purple hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
                    + Add Product
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onProductAdded={handleProductAdded} />
        </div>
    );
};

export default Products;