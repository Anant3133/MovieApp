import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedSlider from '../components/FeaturedSlider';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import { searchMovies } from '../api/search';

import { fetchAllMovies, fetchFeaturedMovies, filterMovies } from '../api/movies';

export default function Home({ genre }) {
  const [featured, setFeatured] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
  };

useEffect(() => {
  async function loadMovies() {
    try {
      const featuredData = await fetchFeaturedMovies();
      const movieData = await fetchAllMovies();

      const featuredList = Array.isArray(featuredData) ? featuredData : [];
      const allMovies = Array.isArray(movieData?.data) ? movieData.data : [];

      const featuredIds = new Set(featuredList.map(m => m._id || m.id));
      const nonFeatured = allMovies.filter(m => {
        const id = m._id || m.id;
        return !featuredIds.has(id);
      });

      setFeatured(featuredList);
      setMovies(nonFeatured);
    } catch (err) {
      console.error('Error loading movies:', err);
    }
  }

  async function fetchSearchResults() {
    if (!query) {
      setResults([]);
      return;
    }
    try {
      const data = await searchMovies(query);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }

  async function fetchFilteredMovies() {
    try {
      const data = await filterMovies(genre && genre !== '' ? genre : '');

      const featuredData = await fetchFeaturedMovies();
      const featuredList = Array.isArray(featuredData) ? featuredData : [];
      const featuredIds = new Set(featuredList.map(m => m._id || m.id));

      const nonFeatured = data.filter(m => !featuredIds.has(m._id || m.id));

      setFeatured(featuredList);
      setMovies(nonFeatured);
    } catch (err) {
      console.error('Error loading filtered movies:', err);
    }
  }

  if (query) {
    fetchSearchResults();
  } else if (genre && genre !== '') {
    fetchFilteredMovies();
  } else {
    loadMovies();
  }
}, [query, genre]);


  console.log("State.movies:", movies);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-auto scrollbar-hide hide-scrollbar">
      <Navbar onSearch={handleSearch} />
      <ToastContainer />
      <HeroCarousel />
      {query ? (
        <div className="px-6 mt-10">
          <h2 className="text-3xl font-bold mb-4 text-green-500">Search Results</h2>
            <MovieGrid movies={results} onSelect={setSelectedMovie} />
        </div>
      ) : genre ? (
        <div className="px-6 mt-10">
          <h2 className="text-3xl font-bold mb-4 text-green-500">Filtered by Genre: {genre}</h2>
           <MovieGrid movies={filterResults} onSelect={setSelectedMovie} />
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="px-6 mt-10 overflow-x-auto scrollbar-hide hide-scrollbar">
              <h2 className="text-3xl font-bold mb-4 text-green-500">Featured Movies</h2>
              <FeaturedSlider movies={featured} onSelect={setSelectedMovie} />
            </div>
          )}
          <div className="px-6 mt-10">
            <h2 className="text-3xl font-bold mb-4 text-green-500">All Movies</h2>
            <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          </div>
        </>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
