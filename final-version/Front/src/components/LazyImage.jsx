// src/components/LazyImage.jsx
import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, ...rest }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (imageRef.current) {
            observer.observe(imageRef.current);
        }
        return () => {
            if (imageRef.current) observer.unobserve(imageRef.current);
        };
    }, []);

    return (
        <img
            ref={imageRef}
            src={isVisible ? src : ''}
            alt={alt}
            {...rest}
            style={{ minHeight: '200px', backgroundColor: '#f0f0f0' }}
        />
    );
};

export default LazyImage;
