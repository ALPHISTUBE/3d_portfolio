'use client'
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { useBox, usePlane } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import Wheel from './wheel';
useGLTF.preload('/chassis.gltf');

function Car() {
    const { nodes } = useGLTF('/chassis.gltf');
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 1, 0],
        args: [2, 1, 4],
        material: { friction: 0.01 }
    }));
    const { camera } = useThree();
    const carDirection = new Vector3();

    const carController = (e) => {
        const cameraDirection = new Vector3();
        camera.getWorldDirection(cameraDirection);
        switch (e.key) {
            case 's':
                api.applyForce([cameraDirection.x * -150, 0, cameraDirection.z * -150], [0, 0, 0]);
                break;
            case 'w':
                api.applyForce([cameraDirection.x * 150, 0, cameraDirection.z * 150], [0, 0, 0]);
                break;
            case 'a':
                api.applyTorque([0, 150, 0]);
                break;
            case 'd':
                api.applyTorque([0, -150, 0]);
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', carController);
        return () => window.removeEventListener('keydown', carController);
    }, []);

    useEffect(() => {
        const unsubscribe = api.position.subscribe((position) => {
            const carPosition = new Vector3(...position);
            ref.current.getWorldDirection(carDirection);
            camera.position.set(carPosition.x - carDirection.x * 10, carPosition.y + 5, carPosition.z - carDirection.z * 10);
            camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
        });
        return () => unsubscribe();
    }, [api, camera, carDirection]);

    return (
        <group ref={ref} dispose={null}>
            {Object.keys(nodes).map((key) => (
                <mesh
                    key={key}
                    geometry={nodes[key].geometry}
                    material={nodes[key].material}
                    scale={[.01, .01, .01]}
                    position={nodes[key].position}
                    rotation={nodes[key].rotation}
                />
            ))}
            <Wheel position={[.72, .23, -1.11]} />
            <Wheel position={[-.72, .23, -1.11]} />
            <Wheel position={[.72, .23, 1.21]} />
            <Wheel position={[-.72, .23, 1.15]} />
        </group>
    );
}

export default function Scene() {
    const Ground = () => {
        const [ref] = usePlane(() => ({
            position: [0, -1, 0], 
            rotation: [-Math.PI / 2, 0, 0],
            material: { friction: 1 }
        }));
      
        return (
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="green" />
            </mesh>
        );
    };

    return (
        <div className='h-[100vh]'>
            <Canvas>
                {/* <OrbitControls /> */}
                <ambientLight intensity={2} />
                <directionalLight position={[10, 10, 10]} intensity={10} />
                <Physics>
                    <Suspense>
                        <Car/>
                    </Suspense>
                    <Ground />  
                </Physics>
            </Canvas>
        </div>
    );
}