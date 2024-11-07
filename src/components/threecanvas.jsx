'use client'
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'; 
import { useThree } from '@react-three/fiber';
import { Physics, useBox, usePlane } from '@react-three/cannon';

useGLTF.preload('/car.glb');

const Car = React.forwardRef((props, ref) => {
  const { nodes } = useGLTF('/car.glb');
  const [carRef, api] = useBox(() => ({
    mass: 1,
    position: [3, 1, 0],
    args: [2, 1.35, 1], 
  }));

  // Attach the ref for external control
  if (ref) ref.current = { carRef, api };

  return (
    <group ref={carRef} dispose={null}>
      {Object.keys(nodes).map((key) => (
        <mesh
          key={key}
          geometry={nodes[key].geometry}
          material={nodes[key].material}
          scale={[0.5, 0.5, 0.5]} 
        />
      ))}
    </group>
  );
});

const CameraFollow = ({ carRef }) => {
  const { camera } = useThree();
  const distance = 5;
  const height = 2;

  useFrame(() => {
    if (carRef && carRef.current && carRef.current.carRef.current) {
      const carPosition = carRef.current.carRef.current.position;
      camera.position.x = carPosition.x + distance;
      camera.position.y = carPosition.y + height;
      camera.position.z = carPosition.z;
      camera.lookAt(carPosition);
    }
  });

  return null;
};

const Ground = () => {
  const [ref] = usePlane(() => ({
    position: [0, -1, 0], 
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const CarControls = ({ api }) => {
  const [forward, setForward] = useState(false);
  const [backward, setBackward] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  const speed = 10;
  const turnSpeed = 0.1;

  // Handle keydown and keyup for movement
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        setForward(true);
        break;
      case 's':
      case 'ArrowDown':
        setBackward(true);
        break;
      case 'a':
      case 'ArrowLeft':
        setLeft(true);
        break;
      case 'd':
      case 'ArrowRight':
        setRight(true);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        setForward(false);
        break;
      case 's':
      case 'ArrowDown':
        setBackward(false);
        break;
      case 'a':
      case 'ArrowLeft':
        setLeft(false);
        break;
      case 'd':
      case 'ArrowRight':
        setRight(false);
        break;
      default:
        break;
    }
  };

  // Apply force or torque based on key states
  useFrame(() => {
    if (!api) return;

    if (forward) {
      api.applyLocalForce([0, 0, -speed], [0, 0, 0]);
    }
    if (backward) {
      api.applyLocalForce([0, 0, speed], [0, 0, 0]);
    }
    if (left) {
      api.applyLocalTorque([0, turnSpeed, 0]);
    }
    if (right) {
      api.applyLocalTorque([0, -turnSpeed, 0]);
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return null;
};

const ThreeCanvas = () => {
  const carRef = useRef();

  return (
    <div style={{ height: '100vh' }}>
      <Canvas>
        <Physics>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Stars />
          <OrbitControls />
          <Suspense fallback={null}>
            <Car ref={carRef} />
          </Suspense>
          <CameraFollow carRef={carRef} />
          <Ground />
          {carRef.current && <CarControls api={carRef.current.api} />}
        </Physics>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
