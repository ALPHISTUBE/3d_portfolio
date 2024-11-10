import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
const SpeedComponent = () => {
    const [speed, setSpeed] = useState(0);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'w' || event.key === 's') {
                setSpeed((prevSpeed) => Math.min(prevSpeed + 30, 30));
            } else if (event.key === 'a' || event.key === 'd') {
                setSpeed((prevSpeed) => prevSpeed);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        let animationFrameId;

        const updateSpeed = () => {
            setSpeed((prevSpeed) => Math.max(prevSpeed - 1, 0));
            animationFrameId = requestAnimationFrame(updateSpeed);
        };

        if (speed > 0) {
            animationFrameId = requestAnimationFrame(updateSpeed);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [speed, format]);

    return (
        <div className="top-2 left-2 bg-black bg-opacity-50 p-2 rounded text-white">
            <p>Speed: {speed}</p>
        </div>
    );
};

export default SpeedComponent;