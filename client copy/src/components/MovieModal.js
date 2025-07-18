import React from 'react';
import { Play, Plus } from 'lucide-react';
import { addToWatchlist } from '../api/watchlist';
import { toast } from 'react-toastify';

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(movie.id);
      toast.success('Added to your watchlist!');
    } catch (error) {
      toast.error('Failed to add to watchlist');
    }
  };

  console.log('Movie passed to modal:', movie);
  console.log('Trailer URL:', movie.trailerUrl);
  console.log('Poster URL:', movie.posterUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden max-w-4xl w-full shadow-lg">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-xl font-bold z-10"
          >
            ×
          </button>

          {movie.trailerUrl ? (
            <iframe
              width="100%"
              height="400"
              src={movie.trailerUrl}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full"
            />
          ) : (
            <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-white">
              No Trailer Available
            </div>
          )}

          <div className="flex gap-4 p-4 bg-gray-800">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              <Play size={20} /> Watch Now
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold"
              onClick={handleAddToWatchlist}
            >
              <Plus size={20} /> Add to My List
            </button>
          </div>
        </div>

        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          {movie.synopsis && <p className="mb-4 text-gray-300">{movie.synopsis}</p>}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear || 'N/A'}</p>
            <p><strong>Rating:⭐</strong> {movie.rating || 'N/A'}</p>
            <p><strong>Cast:</strong> {movie.cast || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}