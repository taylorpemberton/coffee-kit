import React, { useEffect, useState, useCallback } from 'react';
import BackToTop from '../components/BackToTop';

interface PhotographsProps {
    theme: 'light' | 'dark';
}

const Photographs: React.FC<PhotographsProps> = ({ theme }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const imageCount = 61;
    const asia35mm = Array.from({ length: imageCount }, (_, i) => `/images/asia-35mm-optimized/${i + 1}.jpg`);

    const scrollToImage = useCallback((index: number) => {
        const newIndex = Math.max(0, Math.min(index, imageCount - 1));
        setCurrentIndex(newIndex);
        
        const target = document.querySelector(`#image-${newIndex}`);
        if (target) {
            const offset = 140;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, [imageCount]);

    const scrollToTop = useCallback(() => {
        setCurrentIndex(-1);
        const element = document.getElementById('se-asia-35mm');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.altKey || e.metaKey) && e.key.toLowerCase() === 't') {
            e.preventDefault();
            scrollToTop();
            return;
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const newIndex = currentIndex === -1 ? 0 : currentIndex + 1;
            if (newIndex < imageCount) {
                scrollToImage(newIndex);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentIndex <= 0) {
                scrollToTop();
            } else {
                scrollToImage(currentIndex - 1);
            }
        }
    }, [currentIndex, imageCount, scrollToImage, scrollToTop]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="bg-white">
            <div className="space-y-12">
                <section id="se-asia-35mm">
                    <h2 className="mb-6 text-gray-500">
                        🚧 More soon…{' '}
                        <span className="hidden md:inline">use keyboard arrows or scroll to view</span>
                        <span className="md:hidden">scroll to view</span>
                    </h2>
                    <div className="space-y-4">
                        {asia35mm.map((image, index) => (
                            <img
                                id={`image-${index}`}
                                key={index}
                                src={image}
                                alt={`SE Asia 35mm - ${index + 1}`}
                                className="w-full h-auto max-w-[652px] focus:ring-2 focus:ring-white focus:outline-none transition-all duration-200"
                                loading="lazy"
                                tabIndex={0}
                                onFocus={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </section>
            </div>
            
            <BackToTop theme={theme} />
        </div>
    );
};

export default Photographs; 