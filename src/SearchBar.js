import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, onClear }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim());
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        onClear();
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
                {searchTerm && (
                    <button type="button" onClick={handleClear} className="clear-button">Clear</button>
                )}
            </form>
        </div>
    );
}

export default SearchBar;