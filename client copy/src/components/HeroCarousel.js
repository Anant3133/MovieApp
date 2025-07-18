import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Heart } from 'lucide-react';
import { fetchHeroCarousel } from '../api/hero'; // 

export default function HeroCarousel() {
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselMovies.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const loadCarousel = async () => {
      try {
        const data = await fetchHeroCarousel();
        setCarouselMovies(data);
      } catch (err) {
        console.error('Failed to fetch hero carousel:', err);
      }
    };

    loadCarousel();
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, 10000);
    return () => clearInterval(timer);
  }, [carouselMovies]);

  if (carouselMovies.length === 0) return null;

  const current = carouselMovies[currentIndex];

  return (
    <div className="relative w-full h-[66vh] overflow-hidden">
      <img
        src={current.posterUrl}
        alt={current.title}
        className="w-full h-full object-cover"
        style={{ objectPosition: 'center top' }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white max-w-2xl z-10">
        <h2 className="text-4xl font-bold mb-4">{current.title}</h2>
        <p className="text-lg text-gray-300 mb-6">{current.synopsis}</p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
            <Play size={20} /> Watch Now
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold">
            <Plus size={20} /> Add to My List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold">
            <Heart size={20} /> Like
          </button>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full z-20"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full z-20"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
