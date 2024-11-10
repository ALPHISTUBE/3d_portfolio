'use client'
import React, { useState, useEffect } from 'react';
import letter_a from '../../public/letter-a.png';
import letter_d from '../../public/letter-d.png';
import letter_s from '../../public/letter-s.png';
import letter_w from '../../public/letter-w.png';
import space from '../../public/space.png';
import SpeedComponent from './speed';
import Image from 'next/image';
import Spline from '@splinetool/react-spline/next';
const Scene = () => {
    return (
        <div className="relative w-screen h-screen">
            <Spline
                scene="https://prod.spline.design/PBcOzeNKKp5lmiCW/scene.splinecode" 
            />
            <div className="absolute top-1/2 left-[5rem] transform -translate-x-1/2 -translate-y-1/2 p-2 rounded text-white flex flex-col gap-1 ml-5">
                <div className=' bg-black bg-opacity-50 px-3 py-2 text-right'>
                    <div className="flex items-center w-[100%] px-5"><Image className='w-8 h-8 filter invert' src={letter_w} alt="W" /><p className="ml-2 text-base font-bold">W</p></div>
                    <div className="flex items-center w-[100%] px-5"><Image className='w-8 h-8 filter invert' src={letter_s} alt="S" /><p className="ml-2 text-base font-bold">S</p></div>
                    <div className="flex items-center w-[100%] px-5"><Image className='w-8 h-8 filter invert' src={letter_a} alt="A" /><p className="ml-2 text-base font-bold">A</p></div>
                    <div className="flex items-center w-[100%] px-5"><Image className='w-8 h-8 filter invert' src={letter_d} alt="D" /><p className="ml-2 text-base font-bold">D</p></div>
                    <div className="flex items-center w-[100%] px-5"><Image className='w-12 h-10 filter invert' src={space} alt="Space" /><p className="ml-2 text-base font-bold">SPACE</p></div>
                </div>
                <SpeedComponent />
            </div>
        </div>
    );
};

export default Scene;