import React from 'react';
import { Link } from 'react-router-dom';
import Section, { SectionBody, SectionBodyText } from '../components/Section';

interface NotFoundProps {
    theme: 'light' | 'dark';
}

const NotFound: React.FC<NotFoundProps> = ({ theme }) => {
    return (
        <div className={`max-w-[652px] text-white ${theme === 'light' ? 'bg-white' : ''}`}>
            <Section id="404" title={undefined}>
                <SectionBody>
                    <SectionBodyText>
                        Page not found.
                    </SectionBodyText>
                    <SectionBodyText>
                        The page you're looking for doesn't exist. Head back to the <Link to="/" className="text-lime-500 hover:text-lime-400 transition-colors">home page</Link>.
                    </SectionBodyText>
                </SectionBody>
            </Section>
        </div>
    );
};

export default NotFound; 