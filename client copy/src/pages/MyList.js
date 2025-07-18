import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchWatchlist, removeFromWatchlist } from '../api/watchlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TiltWrapper from '../components/TiltWrapper';

export default function MyList() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    setLoading(true);
    try {
      const res = await fetchWatchlist();
      const movies = Array.isArray(res.data) ? res.data.filter(Boolean) : [];
      setWatchlist(movies);
      console.log('Fetched movies:', movies);
    } catch (err) {
      console.error('Failed to load watchlist:', err);
      toast.error('Failed to load your watchlist.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (movieId) => {
    try {
      await removeFromWatchlist(movieId);
      toast.success('Removed from your watchlist.');
      setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error('Failed to remove movie:', err);
      toast.error('Failed to remove movie.');
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <ToastContainer />

      <div className="w-full max-w-[100%] px-4 md:px-8 py-8">
        {loading ? (
          <p className="text-gray-400 text-center text-lg">Loading your watchlist...</p>
        ) : watchlist.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">Your watchlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((movie) => {
              if (!movie) return null;
              const castArray = movie.cast ? movie.cast.split(',').map(c => c.trim()) : [];

              return (
                <TiltWrapper key={movie.id} containerHeight="340px" containerWidth="100%" scaleOnHover={1.05} rotateAmplitude={12} showTooltip={false}>
                  <div
                    className="flex bg-gray-900 rounded-xl shadow-lg overflow-hidden w-full"
                    style={{ minHeight: '340px' }}
                  >
                    <img
                      src={movie.posterUrl || '/placeholder-poster.png'}
                      alt={movie.title || 'Untitled Movie'}
                      className="w-[180px] h-full object-cover"
                      style={{ flexShrink: 0 }}
                    />
                    <div className="flex flex-col justify-between p-4 flex-grow">
                      <div>
                        <h2 className="text-xl font-bold text-green-400 mb-2">
                          {movie.title || 'Untitled'}
                        </h2>
                        <p className="text-gray-300 text-sm mb-3 whitespace-pre-line">
                          {movie.synopsis || 'No synopsis available.'}
                        </p>

                        <p className="text-sm text-gray-400">
                          <span className="text-green-500 font-semibold">Rating:</span> {movie.rating ?? 'N/A'}
                        </p>
                        <p className="text-sm text-gray-400">
                          <span className="text-green-500 font-semibold">Genre:</span> {movie.genre || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-400">
                          <span className="text-green-500 font-semibold">Year:</span> {movie.releaseYear || 'N/A'}
                        </p>

                        {castArray.length > 0 && (
                          <p className="text-sm text-gray-400">
                            <span className="text-green-500 font-semibold">Cast:</span> {castArray.join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold text-sm"
                          onClick={() => toast.info('Watch Now feature not implemented.')}
                        >
                          Watch Now
                        </button>
                        <button
                          onClick={() => handleRemove(movie.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltWrapper>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
