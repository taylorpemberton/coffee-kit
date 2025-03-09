import React from 'react';
import Section, { SectionBody, SectionBodyText, SectionHeading } from '../components/Section';
import BackToTop from '../components/BackToTop';
import { Link } from 'react-router-dom';

interface ExploreProps {
    theme: 'light' | 'dark';
}

const Explore: React.FC<ExploreProps> = ({ theme }) => {
    // Choose one of these quotes by uncommenting it and commenting out the others
    const quixoteQuote = 
        // "When life itself seems lunatic, who knows where madness lies? Perhaps to be too practical is madness. To surrender dreams — this may be madness. Too much sanity may be madness — and maddest of all: to see life as it is, and not as it should be."
        // "There is no book so bad that it does not have something good in it."
        // "The greatest madness a man can commit is to let himself die, just like that, without anybody killing him or any other hands ending his life except those of melancholy."
        "In order to attain the impossible, one must attempt the absurd."
        // "Destiny guides our fortunes more favorably than we could have expected. Look there, Sancho Panza, my friend, and see those thirty or so wild giants, with whom I intend to do battle and kill each and all of them."
    ;

    return (
        <div className="max-w-[652px]">
            <Section id="exploration">
                <SectionHeading title="Ongoing hobbies, writings, projects, etc." />
                <SectionBody>
                
                    
                    <div className="max-w-full overflow-hidden rounded-lg shadow-lg mt-6">
                        <img 
                            src="/assets/GiZQy7OWIBYwStc.jpeg" 
                            alt="Exploration visual"
                            className="w-full h-auto object-cover"
                            style={{ maxHeight: '600px' }}
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/fallback.jpg';
                            }}
                        />
                    </div>
                    
                   
                </SectionBody>
            </Section>

            <BackToTop theme={theme} />
        </div>
    );
};

export default Explore; 