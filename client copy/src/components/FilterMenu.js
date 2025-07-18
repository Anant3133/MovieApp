import React, { useState } from 'react';

export default function FilterMenu({ onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];

  const handleChange = (e) => {
    setSelectedGenre(e.target.value);
    if (onFilter) onFilter(e.target.value);
  };

  return (
    <select
      value={selectedGenre}
      onChange={handleChange}
      className="bg-gray-800 text-white rounded-md px-4 py-2 ml-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      aria-label="Filter by genre"
    >
      {genres.map((genre) => (
        <option key={genre} value={genre === 'All' ? '' : genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}
