import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavLinkItemProps {
    to: string;
    text: string;
    theme: 'light' | 'dark';
    isPhotographsPage: boolean;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, text, theme, isPhotographsPage }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => 
      `transition-opacity duration-500 whitespace-nowrap ${
        isActive 
          ? 'opacity-100'
          : 'opacity-50 hover:opacity-100'
      } ${
        isPhotographsPage ? 'text-black' : 'text-white'
      }`
    }
  >
    {text}
  </NavLink>
);

interface NavProps {
    theme: 'light' | 'dark';
}

const Nav: React.FC<NavProps> = ({ theme }) => {
    const location = useLocation();
    const isPhotographsPage = location.pathname === '/photographs';
    const [isBgVisible, setIsBgVisible] = useState(false);

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 160) {
                setIsBgVisible(true);
            } else {
                setIsBgVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset scroll position on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsBgVisible(false); // Reset background visibility on route change
    }, [location.pathname]);

    return (
        <div className="sticky top-0 z-10 px-4 pt-4 pb-6">
            {/* Background with fade-in effect */}
            <div className={`absolute inset-0 ${
                isPhotographsPage ? 'bg-white/80' : 'bg-black/80'
            } transition-opacity duration-500 delay-0 ${
                isBgVisible ? 'opacity-100' : 'opacity-0'
            }`}></div>

            {/* Nav links (always visible) */}
            <div className="relative z-10 flex flex-wrap justify-start gap-x-2 gap-y-0">
                <NavLinkItem to="/" text="Home," theme={theme} isPhotographsPage={isPhotographsPage} />
                <NavLinkItem to="/about" text="About," theme={theme} isPhotographsPage={isPhotographsPage} />
                <NavLinkItem to="/photographs" text="Photo," theme={theme} isPhotographsPage={isPhotographsPage} />
                <NavLinkItem to="/explore" text="Explore," theme={theme} isPhotographsPage={isPhotographsPage} />
                <a 
                    href="mailto:taylor@taylorpemberton.com" 
                    className={`transition-opacity duration-500 whitespace-nowrap ${
                        isPhotographsPage ? 'text-black opacity-50 hover:opacity-100' : 'text-white opacity-50 hover:opacity-100'
                    }`}
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Email
                </a>
                {/* Temporarily hidden
                <a 
                    href="https://instagram.com/pemberton" 
                    className={`transition-opacity duration-500 whitespace-nowrap ${
                        isPhotographsPage ? 'text-black opacity-50 hover:opacity-100' : 'text-white opacity-50 hover:opacity-100'
                    }`}
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Instagram,
                </a>
                <a 
                    href="https://twitter.com/pemberton" 
                    className={`transition-opacity duration-500 whitespace-nowrap ${
                        isPhotographsPage ? 'text-black opacity-50 hover:opacity-100' : 'text-white opacity-50 hover:opacity-100'
                    }`}
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Twitter
                </a>
                */}
            </div>
        </div>
    );
};

export default Nav;

export const experienceData = [
  {
    company: "Superset",
    role: "CEO & Co-Founder",
    duration: "2020 - Present",
    points: [
      "Building platform for 900,000+ online health/fitness professionals managing $40B/year",
      // ... other points
    ]
  },
  // ... other experience items
]; 