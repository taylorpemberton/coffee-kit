import React from 'react';
import Section from './Section';
import BackToTop from './BackToTop';

interface ExploreSubPageProps {
    theme: string;
    children: React.ReactNode;
}

const ExploreSubPage: React.FC<ExploreSubPageProps> = ({ theme, children }) => {
    const lastUpdated = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div className="max-w-[652px]">
            <Section id="exploration">
                <div className="text-white mb-4">
                    ← Choose your own adventure
                </div>
                <div className="text-gray-400 text-sm mb-4">
                    Last updated {lastUpdated}
                </div>
                {children}
            </Section>
            <BackToTop theme={theme} />
        </div>
    );
};

export default ExploreSubPage; 