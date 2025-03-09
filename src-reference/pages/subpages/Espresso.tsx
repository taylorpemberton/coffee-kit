import React, { useEffect, useState } from 'react';
import Section, { SectionBody, SectionBodyText, SectionHeading } from '../../components/Section';
import BackToTop from '../../components/BackToTop';
import { espressoEquipment, totalPrice } from '../../data/espressoEquipment';
import TimeStamp from '../../components/TimeStamp';

interface EspressoProps {
    theme: string;
}

const Espresso: React.FC<EspressoProps> = ({ theme }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleItems = showAll ? espressoEquipment : espressoEquipment.slice(0, 7);

    const lastUpdated = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    useEffect(() => {
        const handleAnchorClick = (event: MouseEvent) => {
            const target = event.target as HTMLAnchorElement;
            if (target.tagName === 'A' && target.hash) {
                event.preventDefault();
                const element = document.querySelector(target.hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);

    const handleShowMore = () => {
        const wasShowingAll = showAll;
        setShowAll(!showAll);
        
        setTimeout(() => {
            if (!wasShowingAll) {
                const firstNewItem = document.querySelector('.espresso-table tr:nth-child(7)');
                if (firstNewItem) {
                    firstNewItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }, 0);
    };

    return (
        <div>
            <Section id="espresso">
                <SectionHeading title="Espresso kit list" />
                <SectionBody>
                    <SectionBodyText>
                        First and foremost, I chose the mighty Gaggia Classic Pro for my first machine. This is by no means an end game set up, but a setup I enjoy a lot these days.
                    </SectionBodyText>
                    <SectionHeading title="Full list:" />
                    
                    {/* <SectionBodyText>
                    After 15 years as a coffee enthusiast, I finally took the plunge into home espresso. Why now? A mix of practicality and curiosity.
                    </SectionBodyText>
                    <ul className="list-disc list-inside">
                    <li>Less liquid per day = fewer bathroom trips</li>
                    <li>A shared hobby with my mom</li>
                    <li>Teeth whitening and enamel preservation</li>
                    <li>A humbling learning curve and skill</li>
                    <li>A daily ritual</li>
                    </ul>
                    <SectionBodyText>    
                        As many espresso fanatics will tell you, this hobby has become more of an obsession at this point. I would go as far to say it has challenged most of what I believed about coffee before; that coffee shouldn't be fancy or overly contrived. It's a shame that I considered anyone who dabbled in fancy coffee lame (more below on coffee that I believe is still <a href="#hits-diff" className="text-lime-500 hover:text-lime-500 transition-colors duration-200">not worth drinking</a> and to balance that out, coffee that just plainly hits different). Anyone who has reached the end of the bell curve will tell you enlightenment is a full circle exercise.
                    </SectionBodyText> */}
                    
                    <div className="mt-6 relative overflow-x-auto -mx-4 px-4">
                        <table className="w-full espresso-table" style={{ tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '75%' }} className="md:w-4/5" />
                                <col style={{ width: '25%' }} className="md:w-1/5" />
                            </colgroup>
                            <tbody>
                                {visibleItems.map((item, index) => (
                                    <tr key={index} className="group hover:bg-white/10 transition-colors cursor-pointer relative rounded-lg overflow-hidden">
                                        <td className="pl-0 md: py-2 pl-2 pr-2">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-8 h-8 md:w-9 md:h-9 bg-gray-600 rounded-[12px] overflow-hidden flex-shrink-0 ${item.name.includes("Apexstone") ? "opacity-40" : ""}`}>
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className={`w-full h-full object-cover ${item.name.includes("Apexstone") ? "opacity-60" : ""}`}
                                                        />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <a href={item.link} 
                                                       target="_blank" 
                                                       rel="noopener noreferrer"
                                                       className={`transition-colors truncate block overflow-hidden ${item.name.includes("Apexstone") ? "line-through text-gray-600 group-hover:text-gray-500" : "text-white group-hover:text-lime-500"}`}>
                                                        {item.name.length > 35 ? `${item.name.substring(0, 35)}...` : item.name}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 pl-0 md:pl-2 pr-0 text-right relative z-10">
                                            <span className={`transition-colors inline-block w-full text-right ${item.name.includes("Apexstone") ? "line-through text-gray-600 group-hover:text-gray-500" : "text-white group-hover:text-lime-500"}`}>
                                                {item.price ? item.price.replace(/\s+/g, '') : ''}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {espressoEquipment.length > 7 && (
                            <>
                                {!showAll && (
                                    <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                                )}
                                <div className="relative z-10">
                                    <button
                                        onClick={handleShowMore}
                                        className="mt-2 mb-6 ml-0 text-left text-lime-500 hover:text-lime-400 transition-colors"
                                    >
                                        {showAll ? 'Show less' : `See more (${espressoEquipment.length - 7})`}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <Section id="hits-diff">
                        <div></div>
                        {/* <SectionBody>
                            <SectionBodyText>
                                Coffee that is not worth drinking:
                            </SectionBodyText>
                            <ul className="list-disc list-inside text-gray-300 mt-2">
                                <li>Keurig</li>
                                <li>Starbucks</li>
                                <li>Blue Bottle (owned by Nestle)</li>
                                <li>MoccaMaster</li>
                            </ul>
                        </SectionBody> */}
                    </Section>
                    
                    <div className="mt-6">
                        <SectionBodyText>
                            Coffee that gives you XP (s/o <a href="https://abilioazevedo.com.br/en" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-lime-300 transition-colors">Abilio</a>):
                        </SectionBodyText>
                        <ul className="list-disc list-inside text-gray-300 mt-2">
                            <li>Coffee with a loved one</li>
                            <li>Coffee in bed</li>
                            <li>Airport lounge coffee</li>
                            <li>Cowboy coffee on campfire</li>
                            <li>Instant coffee in a hostel</li>
                        </ul>
                    </div>
                </SectionBody>
            </Section>
            
            <Section id="torque">
                <SectionHeading title="Torque:" />
                <SectionBody>
                    <SectionBodyText>
                        I found this Gaggiia Classic Pro torque diagram online. This is important b/c proper torque is essential when working with a machine like this. Whether you're adjusting the OPV (Over Pressure Valve) or maintaining the boiler, using the correct torque settings ensures optimal performance and prevents damage to components.
                    </SectionBodyText>
                    
                    <div className="mt-6">
                        <img 
                            src="/assets/gaggia-torque.jpg" 
                            alt="Gaggia Classic Pro Torque Settings" 
                            className="w-full"
                        />
                        <p className="mt-2 text-sm text-gray-400">Torque settings for various components of the Gaggia Classic Pro</p>
                    </div>
                </SectionBody>
            </Section>

            {/* Add TimeStamp at the bottom */}
            {/* <div className="mt-8">
                <TimeStamp />
            </div> */}

            <BackToTop theme={theme} />
        </div>
    );
};

export default Espresso; 