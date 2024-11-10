import React from 'react'
import { useEffect } from 'react';
import { Icon } from '@iconify/react';

const scene = () => {
    return (
        <div>
            <iframe
                src='https://my.spline.design/untitled-c770ba90b346dbaa6acd05774da67158/'
                frameBorder='0'
                width='100%'
                height='100%'
            ></iframe>
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