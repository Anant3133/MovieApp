// components/AddMovieForm.js
import React, { useState } from 'react';
import { createMovie } from '../api/movies';

export default function AddMovieForm() {
  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    posterUrl: '',
    genre: '',
    releaseYear: '',
    trailerUrl: '',
    cast: '',
    length: '',
    rating: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovie(formData);
      alert('Movie added!');
    } catch (err) {
      console.error('Error adding movie:', err);
      alert('Failed to add movie');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-800 rounded-lg shadow-md text-white space-y-4 max-w-xl mx-auto mt-8"
    >
      <h2 className="text-xl font-bold text-center">Add a New Movie</h2>
      {['title', 'posterUrl', 'synopsis', 'genre', 'releaseYear', 'trailerUrl', 'cast', 'length', 'rating'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
      ))}
      <button
        type="submit"
        className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
