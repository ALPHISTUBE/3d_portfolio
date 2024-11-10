'use client'
import React, { useState, useEffect } from 'react';
import letter_a from '../../public/letter-a.png';
import letter_d from '../../public/letter-d.png';
import letter_s from '../../public/letter-s.png';
import letter_w from '../../public/letter-w.png';
import space from '../../public/space.png';
import Image from 'next/image';
import Spline from '@splinetool/react-spline/next';
const Scene = () => {
    return (
        <div className="relative w-screen h-screen">
            <Spline
                scene="https://prod.spline.design/PBcOzeNKKp5lmiCW/scene.splinecode" 
            />
            <div className="absolute top-1/2 left-[5rem] transform -translate-x-1/2 -translate-y-1/2 p-2 rounded text-white flex flex-col gap-1 ml-10">
                <div className=' bg-black bg-opacity-50 px-1 py-2 shadow-sm shadow-stone-950'>
                    <div className="flex justify-end items-center w-[100%] px-5"><p className="text-sm font-bold">FORWARD</p><Image className='w-8 h-8 filter invert ml-3' src={letter_w} alt="W" /></div>
                    <div className="flex justify-end items-center w-[100%] px-5"><p className="text-sm font-bold">BACKWARD</p><Image className='w-8 h-8 filter invert ml-3' src={letter_s} alt="S" /></div>
                    <div className="flex justify-end items-center w-[100%] px-5"><p className="text-sm font-bold">LEFT</p><Image className='w-8 h-8 filter invert ml-3' src={letter_a} alt="A" /></div>
                    <div className="flex justify-end items-center w-[100%] px-5"><p className="text-sm font-bold">RIGHT</p><Image className='w-8 h-8 filter invert ml-3' src={letter_d} alt="D" /></div>
                    <div className="flex justify-end items-center w-[100%] px-5"><p className="text-sm font-bold">JUMP</p><Image className='w-12 h-10 filter invert ml-3' src={space} alt="Space" /></div>
                </div>
            </div>
        </div>
    );
};

export default Scene;