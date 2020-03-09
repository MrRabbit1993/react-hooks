import { useState, useEffect } from 'react';

export default function useWinSize() {
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    const [height, setHighe] = useState(document.documentElement.clientWidth);
    useEffect(() => {
        window.addEventListener('resize', OnResize, false);
        return () => {
            window.removeEventListener('resize', OnResize, false);
        };
    }, []);
    const OnResize = () => {
        setWidth(document.documentElement.clientWidth);
        setHighe(document.documentElement.clientWidth);
    };
    return { width, height };
}
