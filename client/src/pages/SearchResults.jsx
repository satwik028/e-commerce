import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/common/ProductCard';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            setLoading(true);
            try {
                // Assuming backend /api/products?search=query
                const { data } = await axiosInstance.get(`/products?search=${query}`);
                setResults(data.products || data); // handle different formats if pagination is used
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <div style={{ padding: '120px 40px 60px', minHeight: '80vh', backgroundColor: '#fcfcfc' }}>
            <h2 style={{ fontFamily: "'Didot', 'Playfair Display', serif", fontSize: '2rem', marginBottom: '40px' }}>
                Search Results for "{query}"
            </h2>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
            ) : results.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '40px'
                }}>
                    {results.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: '#666' }}>
                    No products found matching your search.
                    <br />
                    <button 
                        onClick={() => navigate('/')}
                        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
                    >
                        Continue Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
