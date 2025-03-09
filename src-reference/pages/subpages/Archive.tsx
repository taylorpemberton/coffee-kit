import React from 'react';
import Section, { SectionBody, SectionBodyText, SectionHeading } from '../../components/Section';
import BackToTop from '../../components/BackToTop';
import { Link } from 'react-router-dom';

interface ArchiveProps {
    theme: string;
}

interface ArchiveItem {
    title: string;
    path: string;
    date: string;
    category: string;
}

const archiveItems: ArchiveItem[] = [
    {
        title: "GSL",
        path: "/explore/gsl",
        date: "May 15, 2023",
        category: "Travel"
    },
    {
        title: "Espresso",
        path: "/explore/espresso",
        date: "June 10, 2023",
        category: "Coffee"
    },
    {
        title: "2Runner SR5",
        path: "/2runner",
        date: "August 5, 2023",
        category: "Automotive"
    },
    /* Temporarily hidden
    {
        title: "Rimowa Cabin Comparison",
        path: "/explore/rimowa-comparison",
        date: "September 18, 2023",
        category: "Travel"
    },
    {
        title: "On Travel",
        path: "/explore/on-travel",
        date: "October 15, 2023",
        category: "Travel"
    }
    */
];

const Archive: React.FC<ArchiveProps> = ({ theme }) => {
    // Sort items by date (newest first)
    const sortedItems = [...archiveItems].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div>
            <Section id="archive">
                <SectionBody>
                    
                    <div className="mt-0">
                        <div className="space-y-0">
                            {sortedItems.map(item => (
                                <div key={item.title} className="pb-0">
                                    <Link 
                                        to={item.path}
                                        className="block group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-white group-hover:text-lime-500 transition-colors text-base">
                                                {item.title}
                                            </h4>
                                            <span className="text-gray-400 text-sm">{item.date}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionBody>
            </Section>
            <BackToTop theme={theme} />
        </div>
    );
};

export default Archive; 