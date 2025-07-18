import React from 'react';
import TiltedCard from '../components/TiltedCard';

export default function MovieGrid({ movies, onSelect }) {
  if (!Array.isArray(movies)) {
    console.error('Expected movies to be an array but got:', movies);
    return null;
  }

  return (
    <div className="px-4 mt-6">
      {movies.length === 0 ? (
        <>
          <p className="text-center text-gray-400 text-lg mb-4">
            No movies available yet. Stay tuned!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-48 bg-gray-700 rounded-md animate-pulse" />
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-4">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="cursor-pointer"
              onClick={() => onSelect(movie)}
            >
              <TiltedCard
                imageSrc={movie.posterUrl}
                altText={movie.title}
                captionText={movie.title}
                containerHeight="300px"
                containerWidth="200px"
                imageHeight="300px"
                imageWidth="200px"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <p className="text-white text-center text-sm font-medium">
                    {movie.title}
                  </p>
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}