import React, { ReactNode, useState } from 'react';
import TimeStamp from './TimeStamp';

interface SectionProps {
    id: string;
    title?: string;
    children: ReactNode;
}

interface SectionImageProps {
    src: string;
    alt: string;
    height?: string;
    width?: string;
    caption?: string | React.ReactNode;
    className?: string;
}

interface SectionHeadingProps {
    title: string;
    lastSaved?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
    return (
        <section id={id} className="mb-16">
            {title && <h2 className="text-sm text-gray-500 mb-1">{title}</h2>}
            {children}
        </section>
    );
};

export const SectionImage: React.FC<SectionImageProps> = ({ 
    src, 
    alt, 
    height = 'auto', 
    width = 'auto', 
    caption,
    className = '' 
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="my-6">
            <div className={`relative overflow-hidden aspect-[7/5] ${className}`}>
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-neutral-800 bg-opacity-90 flex items-center justify-center">
                        <span className="text-gray-500">Loading…</span>
                    </div>
                )}
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            {caption && (
                <div className="text-gray-500 text-[10pt] mt-1">
                    {caption}
                </div>
            )}
        </div>
    );
};

export const SectionBody: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="space-y-4">{children}</div>;
};

export const SectionBodyText: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <p className="text-white">{children}</p>;
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, lastSaved }) => {
    return (
        <div className="mb-4">
            <div className="text-base">
                {title}
            </div>
            {/* <TimeStamp className="mt-1" lastSaved={lastSaved} /> */}
        </div>
    );
};

export default Section; 