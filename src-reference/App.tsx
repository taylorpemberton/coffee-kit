import React, { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Photographs from './pages/Photographs';
import Explore from './pages/Explore';
import GSL from './pages/subpages/GSL';
import Espresso from './pages/subpages/Espresso';
import TwoRunner from './pages/subpages/2runner';
import Archive from './pages/subpages/Archive';
import RimowaComparison from './pages/subpages/RimowaComparison';
import OnTravel from './pages/subpages/OnTravel';
import NotFound from './pages/NotFound';

interface PageContentWrapperProps {
    children: ReactNode;
    theme: 'light' | 'dark';
}

const PageContentWrapper: React.FC<PageContentWrapperProps> = ({ children, theme }) => {
    return (
        <div className={`${theme === 'light' ? 'bg-white' : ''}`}>
            {children}
        </div>
    );
};

interface AppContentProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

const AppContent: React.FC<AppContentProps> = ({ theme, setTheme }) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const getPageTheme = (pathname: string): 'light' | 'dark' => {
        if (pathname === '/photographs') return 'light';
        if (pathname === '/explore/gsl') return 'dark';
        if (pathname === '/explore/archive') return 'dark';
        if (pathname === '/explore/rimowa-comparison') return 'dark';
        return theme;
    };

    const themeClasses = theme === 'light' ? 'bg-white text-black' : 'bg-black text-white';
    const currentTheme = getPageTheme(location.pathname);

    useEffect(() => {
        if (location.pathname === '/news') {
            navigate('/', { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <div className={`min-h-screen ${themeClasses} main-content ${currentTheme === 'dark' ? 'dark-theme-container' : ''}`}>
            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-50">
                <div className={`p-4 bg-white ${theme === 'light' ? 'border-white' : 'border-white'}`}>
                    <Link to="/" className={theme === 'light' ? 'text-black' : 'text-black'}>
                        Taylor Pemberton
                    </Link>
                </div>
                
                <div className={theme === 'light' ? 'bg-white bg-opacity-5' : 'bg-black bg-opacity-5'}>
                    <Nav theme={theme} />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className={`hidden md:block fixed inset-y-0 left-0 w-[288px] z-10 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
                <Sidebar theme={theme} />
            </div>

            {/* Main Content */}
            <main className={`md:pl-[288px] ${themeClasses} relative z-5`}>
                {/* Desktop Nav */}
                <div className="hidden md:block sticky top-0 z-40">
                    <Nav theme={theme} />
                </div>

                {/* Page Content */}
                <div className={`w-full ${currentTheme === 'light' ? 'bg-white' : ''}`}>
                    <div className="px-4 pt-28 -mt-24 md:pt-32 pb-20 max-w-[652px]">
                        <Routes>
                            <Route path="/" element={<Home theme={getPageTheme('/')} />} />
                            <Route path="/about" element={<About theme={getPageTheme('/about')} />} />
                            <Route path="/photographs" element={<Photographs theme={getPageTheme('/photographs')} />} />
                            <Route path="/explore" element={<Explore theme={getPageTheme('/explore')} />} />
                            <Route path="/explore/gsl" element={<GSL theme={getPageTheme('/explore/gsl')} />} />
                            <Route path="/explore/espresso" element={<Espresso theme={getPageTheme('/explore/espresso')} />} />
                            <Route path="/explore/archive" element={<Archive theme={getPageTheme('/explore/archive')} />} />
                            <Route path="/explore/rimowa-comparison" element={<RimowaComparison theme={getPageTheme('/explore/rimowa-comparison')} />} />
                            <Route path="/explore/on-travel" element={<OnTravel theme={getPageTheme('/explore/on-travel')} />} />
                            <Route path="/explore/condo-renovation" element={<GSL theme={getPageTheme('/explore/gsl')} />} />
                            <Route path="/2runner" element={<TwoRunner theme={getPageTheme('/explore/2runner')} />} />
                            <Route path="/news" element={<NewsRedirect />} />
                            <Route path="*" element={<NotFound theme={getPageTheme('/')} />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
};

const NewsRedirect: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/', { replace: true });
    }, [navigate]);

    return <p>Redirecting...</p>;
};

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    return (
        <div className="main-content">
            <BrowserRouter>
                <AppContent theme={theme} setTheme={setTheme} />
            </BrowserRouter>
        </div>
    );
};

export default App; 