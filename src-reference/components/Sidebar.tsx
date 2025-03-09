import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
    theme: 'light' | 'dark';
}

const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        const headerOffset = 156;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        window.history.replaceState(null, '', `#${targetId}`);
    }
};

const Sidebar: React.FC<SidebarProps> = ({ theme }) => {
    const location = useLocation();
    const isAboutPage = location.pathname === '/about';
    const isPhotographsPage = location.pathname === '/photographs';
    const isExplorePage = location.pathname === '/explore';
    const isGSLPage = location.pathname === '/explore/gsl';
    const isEspressoPage = location.pathname === '/explore/espresso';
    const isArchivePage = location.pathname === '/explore/archive';
    const isOnTravelPage = location.pathname === '/explore/on-travel';
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [forceActive, setForceActive] = useState(false);

    useEffect(() => {
        let sections: string[] = [];
        if (isAboutPage) {
            sections = ['experience', 'countries', 'cities'];
        } else if (isPhotographsPage) {
            sections = [];
        } else {
            sections = ['home', '2019', '2018', '2015'];
        }

        const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        
        const handleScroll = () => {
            if (forceActive) return;
            
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            const active = sectionElements.reduce((closest, section) => {
                const box = section.getBoundingClientRect();
                const sectionTop = box.top + window.pageYOffset;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    if (!closest || section.offsetHeight > closest.offsetHeight) {
                        return section;
                    }
                }
                return closest;
            }, null as HTMLElement | null);

            if (active) setActiveSection(active.id);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !forceActive) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { 
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0.2
            }
        );

        sectionElements.forEach(element => observer.observe(element));
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAboutPage, isPhotographsPage, forceActive]);

    const handleClick = (section: string) => {
        setForceActive(true);
        setActiveSection(section);
        setTimeout(() => setForceActive(false), 1000);
    };

    const getLinkClass = (sectionId: string) => 
        `sidebar-item text-gray-400 hover:text-black transition-colors duration-500 
        ${activeSection === sectionId ? '!text-black' : ''}`;

    return (
        <nav className="h-screen bg-white p-4 md:px-6 flex flex-col z-0">
            {/* Fixed Header */}
            <div className="sticky top-0 bg-white pb-0 z-10">
                <div className="text-right">
                    <Link to="/" className="text-black bg-white md:bg-transparent px-2 py-1 rounded-md">
                        Taylor Pemberton
                    </Link>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pt-14">
                {isAboutPage ? (
                    <>
                        <div className="text-right">
                        </div>
                        <div className="flex flex-col text-right">
                            <Link 
                                to="#experience"
                                onClick={(e) => {
                                    handleSmoothScroll(e, 'experience');
                                    handleClick('experience');
                                }}
                                className={getLinkClass('experience')}
                            >
                                Experience
                            </Link>
                            <Link 
                                to="#countries"
                                onClick={(e) => {
                                    handleSmoothScroll(e, 'countries');
                                    handleClick('countries');
                                }}
                                className={getLinkClass('countries')}
                            >
                                Countries
                            </Link>
                            <Link 
                                to="#cities"
                                onClick={(e) => {
                                    handleSmoothScroll(e, 'cities');
                                    handleClick('cities');
                                }}
                                className={getLinkClass('cities')}
                            >
                                Cities
                            </Link>
                        </div>
                    </>
                ) : isPhotographsPage ? (
                    <>
                        <div className="text-right">
                        </div>
                        <div className="flex flex-col text-right">
                            {/* Hide "Photographs" link for now */}
                            {/* <Link 
                                to="#photographs"
                                onClick={(e) => {
                                    handleSmoothScroll(e, 'photographs');
                                    handleClick('photographs');
                                }}
                                className={getLinkClass('photographs')}
                            >
                                Photographs
                            </Link> */}
                        </div>
                    </>
                ) : isGSLPage || isExplorePage || isEspressoPage || isArchivePage || isOnTravelPage ? (
                    <>
                        <div className="text-right">
                        </div>
                        <div className="flex flex-col text-right">
                            <Link 
                                to="/explore/gsl" 
                                className={getLinkClass('gsl')}
                            >
                                GSL
                            </Link>
                            <Link 
                                to="/explore/espresso" 
                                className={getLinkClass('espresso')}
                            >
                                Espresso
                            </Link>
                            {/* Temporarily hidden
                            <Link 
                                to="/explore/on-travel" 
                                className={getLinkClass('on-travel')}
                            >
                                On Travel
                            </Link>
                            */}
                            <Link 
                                to="/explore/archive" 
                                className={getLinkClass('archive')}
                            >
                                Archive
                            </Link>
                            {/* <Link 
                                to="/explore/4runner-log" 
                                className={getLinkClass('4runner-log')}
                            >
                                2Runner SR5
                            </Link> */}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-right">
                        </div>
                        <div className="flex flex-col text-right">
                            <Link 
                                to="#home"
                                onClick={(e) => {
                                    handleSmoothScroll(e, 'home');
                                    handleClick('home');
                                }}
                                className={getLinkClass('home')}
                            >
                                ∞
                            </Link>
                            <Link 
                                to="#2019"
                                onClick={(e) => {
                                    handleSmoothScroll(e, '2019');
                                    handleClick('2019');
                                }}
                                className={getLinkClass('2019')}
                            >
                                2019
                            </Link>
                            <Link 
                                to="#2018"
                                onClick={(e) => {
                                    handleSmoothScroll(e, '2018');
                                    handleClick('2018');
                                }}
                                className={getLinkClass('2018')}
                            >
                                2018
                            </Link>
                            <Link 
                                to="#2015"
                                onClick={(e) => {
                                    handleSmoothScroll(e, '2015');
                                    handleClick('2015');
                                }}
                                className={getLinkClass('2015')}
                            >
                                2015
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Sidebar;