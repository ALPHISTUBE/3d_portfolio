import React from 'react';
import ThreeCanvas from '@/components/threecanvas'; // Importing the ThreeCanvas component
import Scene from '@/components/scene';

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-4xl text-white bg-black p-5">My 3D Project</h1>
      
      {/* Rendering the Three.js canvas */}
      <Scene /> 
    </div>
  );
};

export default Home;
