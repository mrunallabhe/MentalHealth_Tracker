import React from 'react';

function Banner() {
  return (
    <div className="max-w-screen-2xl w-full mx-auto md:px-20 px-4 flex my-16 mt-24">
      <div className="w-full md:w-1/2">
        <div className="space-y-12">
          <h1 className="text-4xl font-bold px-3 py-4">
            Hello, Welcome here to learn something{" "}
            <span className="text-pink-500">new Everyday!!</span>
          </h1>
          <p className="text-xl font-normal">
            Our app helps monitor and support children's mental health. It
            provides regular check-ups through fun activities and tracks
            behavior to spot any issues early.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img src="/banner.jpg" className="h-96 w-full object-cover mt-6" alt="Banner" />
      </div>
    </div>
  );
}

export default Banner;
