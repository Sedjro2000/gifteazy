import React from 'react';

const Page: React.FC = () => {
  return (
    <div
      className="bg-blue-950 w-full h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(test.jpg)' }}
    >
      <div className="relative p-8 max-w-md mx-auto mt-10 bg-blue-300/10 backdrop-blur-sm rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-red-400 mb-4">Glass Effect Card</h2>
        <p className="text-white">
          This is an example of a card with a glass effect. It combines background blur, color opacity, and rounded corners.
        </p>
      </div>
    </div>
  );
};

export default Page;
