import React from 'react';
import { Icon } from '@iconify/react';
import Spline from '@splinetool/react-spline/next';

const Scene = () => {
    return (
        <div className="relative w-screen h-screen">
            <Spline
                scene="https://prod.spline.design/PBcOzeNKKp5lmiCW/scene.splinecode" 
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded text-white flex flex-col gap-1">
                <div className=' bg-black bg-opacity-50'>
                    <div className="flex items-center"><Icon icon="mdi:keyboard-w" /> W</div>
                    <div className="flex items-center"><Icon icon="mdi:keyboard-s" /> S</div>
                    <div className="flex items-center"><Icon icon="mdi:keyboard-a" /> A</div>
                    <div className="flex items-center"><Icon icon="mdi:keyboard-d" /> D</div>
                    <div className="flex items-center"><Icon icon="mdi:space-invaders" /> Space</div>
                </div>
                <div className="top-2 left-2 bg-black bg-opacity-50 p-2 rounded text-white">
                    Speed: 0
                </div>
            </div>
        </div>
    );
};

export default Scene;