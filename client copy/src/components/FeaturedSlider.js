// File: components/FeaturedSlider.jsx
import React, { useRef, useState, useEffect } from 'react';
import TiltedCard from '../components/TiltedCard'; // adjust path if needed

export default function FeaturedSlider({ movies, onSelect }) {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (el) {
        setShowArrows(el.scrollWidth > el.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [movies]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="w-full text-center text-gray-400 py-6 text-lg">
        No featured movies yet.
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 py-4 overflow-visible z-10">
      {showArrows && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-60 hover:bg-opacity-90 text-white px-3 py-2 rounded-l-md"
        >
          &#8592;
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-visible scroll-smooth scrollbar-hide hide-scrollbar relative z-0"
      >
        {movies.map(movie => (
          <div
            key={movie.id}
            className="flex-shrink-0 z-10 relative"
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
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="text-white font-semibold">{movie.title}</p>
              }
            />
          </div>
        ))}
      </div>

      {showArrows && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-60 hover:bg-opacity-90 text-white px-3 py-2 rounded-r-md"
        >
          &#8594;
        </button>
      )}
    </div>
  );
}