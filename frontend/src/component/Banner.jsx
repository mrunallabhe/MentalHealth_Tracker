import React from 'react';

function Banner() {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to <span className="text-pink-500">Daily Learning</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Our app helps monitor and support children's mental health. It
              provides regular check-ups through fun activities and tracks
              behavior to spot any issues early.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/banner.jpg" 
              className="rounded-lg shadow-xl w-full h-auto object-cover" 
              alt="Children learning" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
