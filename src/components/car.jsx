'use client'
import { useGLTF } from '@react-three/drei';
import React from 'react';

useGLTF.preload('/car.glb');

export default function Car() {
    const { nodes, materials } = useGLTF('/car.glb');
    return (
        <group dispose={null}>
        <mesh
            geometry={nodes.Car}
            material={materials['Material.001']}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.01, 0.01, 0.01]}
        />
        </group>
    );
}