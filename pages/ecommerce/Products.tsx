import React, { useState } from 'react';
import { getProducts, addProduct } from '../../services/api';
import { Product, ProductCategory } from '../../types';
import ProductCard from '../../components/ecommerce/ProductCard';
import ResourceListPage from '../../components/common/ResourceListPage';

const AddProductForm: React.FC<{ onProductAdded: (product: Product) => void, onClose: () => void }> = ({ onProductAdded, onClose }) => {
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
    );
};

const Products: React.FC = () => {
    const [products, setProducts] = useState(getProducts());

    const handleProductAdded = (newProduct: Product) => {
        setProducts(prev => [newProduct, ...prev]);
    };

    return (
        <ResourceListPage<Product>
            items={products}
            renderItem={(product) => <ProductCard product={product} />}
            searchKeys={['name', 'category']}
            searchPlaceholder="Search products..."
            addNewButtonText="Add Product"
            addModalTitle="Add New Product"
            addModalContent={(onClose) => (
                <AddProductForm 
                    onProductAdded={handleProductAdded}
                    onClose={onClose}
                />
            )}
            emptyState={{
                icon: <>👕</>,
                title: "Stock Your Store",
                description: "No merchandise found. Add products like apparel, accessories, or digital downloads to start selling to your fans.",
                ctaText: "+ Add New Product",
            }}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        />
    );
};

export default Products;