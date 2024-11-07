'use client'
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import Wheel from './wheel';
useGLTF.preload('/chassis.gltf');
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

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
        switch (e.key) {
            case 'w':
                api.velocity.set(carDirection.x * -5, 0, carDirection.z * -5);
                break;
            case 's':
                api.velocity.set(carDirection.x * 5, 0, carDirection.z * 5);
                break;
            case 'a':
                api.angularVelocity.set(0, 15, 0);
                break;
            case 'd':
                api.angularVelocity.set(0, -15, 0);
                break;
            default:
                break;
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', carController);
        return () => window.removeEventListener('keydown', carController);
    }, []);

    useFrame(() => {
        ref.current.getWorldDirection(carDirection);
        const carPosition = ref.current.position;
        camera.position.copy(carPosition);
        camera.lookAt(carPosition);
        if (ref.current) {
        }
    });

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

export default Car;