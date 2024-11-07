'use client'
import React from 'react';
import { useGLTF } from '@react-three/drei';

useGLTF.preload('/wheel.gltf');

function Wheel({ position }) {
    const { nodes } = useGLTF('/wheel.gltf');
    return (
        <group dispose={null}>
            {Object.keys(nodes).map((key) => (
                <mesh
                    key={key}
                    geometry={nodes[key].geometry}
                    material={nodes[key].material}
                    position={position}
                    scale={[1, 1, 1]}
                />
            ))}
        </group>
    );
}

export default Wheel;