import React, { useState } from 'react';
import Section, { SectionBody, SectionBodyText, SectionHeading } from '../../components/Section';
import BackToTop from '../../components/BackToTop';
import { twoRunnerMods, totalPrice, getModsByCategory } from '../../data/2runnerMods';
import TimeStamp from '../../components/TimeStamp';

interface TwoRunnerProps {
    theme: string;
}

const TwoRunner: React.FC<TwoRunnerProps> = ({ theme }) => {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const modsByCategory = getModsByCategory();
    const categories = Object.keys(modsByCategory).sort();
    
    const lastUpdated = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div>
            <div className="text-gray-400 text-sm mb-4">
                Last updated {lastUpdated}
            </div>
            
            <Section id="2runner">
                <SectionHeading title="Toyota 4Runner SR5 Build" />
                <SectionBody>
                    <SectionBodyText>
                        My 2019 Toyota 4Runner SR5 has been transformed from a stock SUV into a capable overlanding and off-road vehicle. This page documents the modifications, upgrades, and adventures with this incredibly versatile platform.
                    </SectionBodyText>
                    
                    <div className="max-w-full overflow-hidden rounded-lg shadow-lg mt-6">
                        <img 
                            src="/assets/4runner-main.jpg" 
                            alt="Toyota 4Runner SR5 Build"
                            className="w-full h-auto object-cover"
                            style={{ maxHeight: '600px' }}
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/fallback.jpg';
                            }}
                        />
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b border-white/20 mt-8 overflow-x-auto">
                        <button 
                            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button 
                            className={`px-4 py-2 font-medium ${activeTab === 'build' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('build')}
                        >
                            Build Details
                        </button>
                        <button 
                            className={`px-4 py-2 font-medium ${activeTab === 'adventures' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('adventures')}
                        >
                            Adventures
                        </button>
                        <button 
                            className={`px-4 py-2 font-medium ${activeTab === 'maintenance' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('maintenance')}
                        >
                            Maintenance
                        </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="mt-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h3 className="text-white text-lg mb-2">Vehicle Specs</h3>
                                        <ul className="space-y-2 text-gray-300">
                                            <li><span className="text-white font-medium">Year/Model:</span> 2019 Toyota 4Runner SR5 4x4</li>
                                            <li><span className="text-white font-medium">Engine:</span> 4.0L V6 (270hp, 278 lb-ft)</li>
                                            <li><span className="text-white font-medium">Transmission:</span> 5-speed automatic</li>
                                            <li><span className="text-white font-medium">Transfer Case:</span> Part-time 4WD with 2-speed</li>
                                            <li><span className="text-white font-medium">Color:</span> Magnetic Gray Metallic</li>
                                            <li><span className="text-white font-medium">Current Mileage:</span> 48,500</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <h3 className="text-white text-lg mb-2">Build Summary</h3>
                                        <ul className="space-y-2 text-gray-300">
                                            <li><span className="text-white font-medium">Lift Height:</span> 2.5" front / 2" rear</li>
                                            <li><span className="text-white font-medium">Tire Size:</span> 275/70R17 (33" equivalent)</li>
                                            <li><span className="text-white font-medium">Wheels:</span> Method MR701 17x8.5 -10mm offset</li>
                                            <li><span className="text-white font-medium">Front Bumper:</span> C4 Fabrication Lo Pro</li>
                                            <li><span className="text-white font-medium">Recovery:</span> Warn VR EVO 10-S Winch</li>
                                            <li><span className="text-white font-medium">Total Investment:</span> ${totalPrice}</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <h3 className="text-white text-lg mb-4">Build Philosophy</h3>
                                    <SectionBodyText>
                                        My 4Runner build focuses on creating a reliable, capable vehicle for weekend adventures and extended overlanding trips while maintaining daily drivability. The modifications strike a balance between off-road performance and on-road comfort, with an emphasis on practical upgrades that enhance the vehicle's capabilities without sacrificing reliability.
                                    </SectionBodyText>
                                    <SectionBodyText>
                                        Rather than chasing extreme modifications, I've focused on addressing the platform's limitations while enhancing its inherent strengths. The result is a vehicle that can handle challenging trails, carry all necessary camping gear, and still serve as a comfortable daily driver.
                                    </SectionBodyText>
                                </div>
                                
                                <div>
                                    <h3 className="text-white text-lg mb-4">Why the 4Runner?</h3>
                                    <SectionBodyText>
                                        I chose the 5th generation 4Runner for its proven reliability, excellent off-road capabilities, and strong aftermarket support. Toyota's reputation for building vehicles that last hundreds of thousands of miles with proper maintenance was a major factor in my decision.
                                    </SectionBodyText>
                                    <SectionBodyText>
                                        While newer competitors offer more modern interiors and better fuel economy, the 4Runner's body-on-frame construction, solid rear axle, and mechanical simplicity make it an ideal platform for modification and long-term ownership. The large cargo area and optional third row also provide flexibility for different uses.
                                    </SectionBodyText>
                                </div>
                            </div>
                        )}
                        
                        {/* Build Details Tab */}
                        {activeTab === 'build' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-white text-lg mb-4">Modification Details</h3>
                                    <SectionBodyText>
                                        Below is a comprehensive list of all modifications grouped by category. Each component was selected to work harmoniously with the others, creating a balanced build that performs well in various conditions.
                                    </SectionBodyText>
                                </div>
                                
                                <div className="space-y-8">
                                    {categories.map(category => (
                                        <div key={category} className="border border-white/10 rounded-lg overflow-hidden">
                                            <div className="bg-white/10 p-4">
                                                <h3 className="text-white text-lg">{category}</h3>
                                            </div>
                                            <div className="p-4">
                                                <div className="space-y-4">
                                                    {modsByCategory[category].map((mod: { link: string; name: string; price: string; description?: string }, index: number) => (
                                                        <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                                                            <div className="flex justify-between items-baseline">
                                                                <a 
                                                                    href={mod.link} 
                                                   target="_blank" 
                                                   rel="noopener noreferrer"
                                                                    className="text-white hover:text-lime-500 transition-colors font-medium"
                                                                >
                                                                    {mod.name}
                                                                </a>
                                                                <span className="text-white">{mod.price}</span>
                                                            </div>
                                                            {mod.description && (
                                                                <p className="text-gray-400 text-sm mt-1">{mod.description}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-8 p-4 bg-white/5 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white text-lg">Total Investment</h3>
                                        <span className="text-white text-xl font-bold">${totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Adventures Tab */}
                        {activeTab === 'adventures' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-white text-lg mb-4">Notable Adventures</h3>
                                    <SectionBodyText>
                                        The 4Runner has been my trusty companion on numerous adventures across various terrains and conditions. Here are some of the most memorable trips and the challenges we've overcome together.
                                    </SectionBodyText>
                                </div>
                                
                                <div className="space-y-8">
                                    <div className="border border-white/10 rounded-lg overflow-hidden">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img 
                                                src="/assets/moab-trip.jpg" 
                                                alt="Moab, Utah Trip"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/fallback.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-white text-xl mb-2">Moab, Utah - April 2023</h4>
                                            <p className="text-gray-300 mb-4">
                                                A week-long expedition tackling some of Moab's iconic trails including Fins & Things, Hell's Revenge, and parts of the White Rim Trail. The 4Runner's suspension and clearance were put to the test on the slickrock terrain.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Slickrock</span>
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Technical Terrain</span>
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Desert Camping</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border border-white/10 rounded-lg overflow-hidden">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img 
                                                src="/assets/colorado-trip.jpg" 
                                                alt="Colorado Backcountry Trip"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/fallback.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-white text-xl mb-2">Colorado Backcountry - August 2023</h4>
                                            <p className="text-gray-300 mb-4">
                                                Explored the San Juan Mountains via the Alpine Loop, connecting Silverton, Ouray, and Lake City. Navigated challenging passes including Engineer, Cinnamon, and Imogene, reaching elevations over 13,000 feet.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">High Altitude</span>
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Mountain Passes</span>
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Dispersed Camping</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border border-white/10 rounded-lg overflow-hidden">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img 
                                                src="/assets/winter-trip.jpg" 
                                                alt="Winter Expedition"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/fallback.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-white text-xl mb-2">Winter Expedition - January 2024</h4>
                                            <p className="text-gray-300 mb-4">
                                                A challenging winter trip through the Wasatch Mountains during heavy snowfall. The Falken Wildpeak tires proved their worth in deep snow, and the auxiliary lighting was essential during the short winter days.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Snow Wheeling</span>
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Winter Camping</span>
                                                <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">Recovery Operations</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Maintenance Tab */}
                        {activeTab === 'maintenance' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-white text-lg mb-4">Maintenance Schedule & History</h3>
                                    <SectionBodyText>
                                        Proper maintenance is crucial for reliability, especially with a modified vehicle. Below is my maintenance schedule and history for the 4Runner.
                                    </SectionBodyText>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white/10">
                                                <th className="p-3 text-left text-white">Service</th>
                                                <th className="p-3 text-left text-white">Interval</th>
                                                <th className="p-3 text-left text-white">Last Done</th>
                                                <th className="p-3 text-left text-white">Next Due</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-white/10">
                                                <td className="p-3 text-gray-300">Oil & Filter Change</td>
                                                <td className="p-3 text-gray-300">5,000 miles</td>
                                                <td className="p-3 text-gray-300">45,000 miles</td>
                                                <td className="p-3 text-gray-300">50,000 miles</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <td className="p-3 text-gray-300">Differential Fluid</td>
                                                <td className="p-3 text-gray-300">30,000 miles</td>
                                                <td className="p-3 text-gray-300">30,000 miles</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <td className="p-3 text-gray-300">Transfer Case Fluid</td>
                                                <td className="p-3 text-gray-300">30,000 miles</td>
                                                <td className="p-3 text-gray-300">30,000 miles</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <td className="p-3 text-gray-300">Transmission Fluid</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                                <td className="p-3 text-gray-300">Not yet</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <td className="p-3 text-gray-300">Air Filter</td>
                                                <td className="p-3 text-gray-300">15,000 miles</td>
                                                <td className="p-3 text-gray-300">45,000 miles</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <td className="p-3 text-gray-300">Spark Plugs</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                                <td className="p-3 text-gray-300">Not yet</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                            </tr>
                                            <tr className="border-b border-white/10">
                                                <td className="p-3 text-gray-300">Brake Fluid</td>
                                                <td className="p-3 text-gray-300">30,000 miles</td>
                                                <td className="p-3 text-gray-300">30,000 miles</td>
                                                <td className="p-3 text-gray-300">60,000 miles</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 text-gray-300">Suspension Check</td>
                                                <td className="p-3 text-gray-300">After hard use</td>
                                                <td className="p-3 text-gray-300">After Moab trip</td>
                                                <td className="p-3 text-gray-300">After next trip</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                                
                                <div className="mt-8">
                                    <h3 className="text-white text-lg mb-4">Maintenance Tips</h3>
                                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                                        <li>Use Toyota Genuine or OEM equivalent parts for critical components</li>
                                        <li>Inspect undercarriage after off-road trips for damage</li>
                                        <li>Check all bolts and connections after rough terrain</li>
                                        <li>Clean air filter more frequently when driving in dusty conditions</li>
                                        <li>Rotate tires every 5,000 miles for even wear</li>
                                        <li>Keep detailed maintenance records for future reference and resale value</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </SectionBody>
            </Section>

            {/* <div className="mt-8">
                <TimeStamp />
            </div> */}

            <BackToTop theme={theme} />
        </div>
    );
};

export default TwoRunner; 
