import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (onSearch) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search movies, shows..."
        value={query}
        onChange={handleChange}
        className="bg-gray-800 text-white rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 text-gray-400 hover:text-green-500"
        aria-label="Search"
      >
        🔍
      </button>
    </form>
  );
}
