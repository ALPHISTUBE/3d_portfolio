import React from 'react'
import { Icon } from '@iconify/react';
import Spline from '@splinetool/react-spline/next';
const scene = () => {
    return (
        <div>
            <Spline
                scene="https://prod.spline.design/PBcOzeNKKp5lmiCW/scene.splinecode" 
            />
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Icon icon="mdi:keyboard-w" /> W
                <Icon icon="mdi:keyboard-s" /> S
                <Icon icon="mdi:keyboard-a" /> A
                <Icon icon="mdi:keyboard-d" /> D
                <Icon icon="mdi:space-invaders" /> Space
                
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                Speed: 0
            </div>
        </div>
    );
};

export default scene;