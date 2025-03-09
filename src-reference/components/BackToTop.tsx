import React, { useState, useEffect } from 'react';

interface BackToTopProps {
    theme: string;
}

const BackToTop: React.FC<BackToTopProps> = ({ theme }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 px-4 py-2 rounded-full hover:bg-lime-500 transition-colors duration-500 ${
                theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'
            } ${isVisible ? 'opacity-100' : 'opacity-0'} text-[20px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4`}
        >
            Back to top
        </button>
    );
};

export default BackToTop; 