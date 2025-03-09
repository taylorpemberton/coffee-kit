import React, { useState } from 'react';
import Section, { SectionBody, SectionBodyText, SectionHeading, SectionImage } from '../../components/Section';
import BackToTop from '../../components/BackToTop';

interface RimowaComparisonProps {
    theme: string;
}

interface LuggageItem {
    name: string;
    image?: string;
    price: string;
    link: string;
    dimensions: string;
    weight: string;
    volume: string;
    material: string;
    features: string[];
}

const rimowaModels: LuggageItem[] = [
    {
        name: "Rimowa Original Cabin",
        image: "/rimowa-original-cabin.jpg",
        price: "$1,400",
        link: "https://www.rimowa.com/us/en/luggage/cabin/original-cabin/92553004.html",
        dimensions: "21.7 × 15.8 × 9.1 in",
        weight: "9.5 lbs",
        volume: "37 L",
        material: "Anodized aluminum",
        features: [
            "TSA-approved locks",
            "Multi-wheel system",
            "Telescopic handle",
            "Flex divider",
            "Lifetime guarantee",
            "Iconic grooved design",
            "High-end aluminum construction"
        ]
    },
    {
        name: "Rimowa Classic Cabin",
        image: "/rimowa-classic-cabin.jpg",
        price: "$1,500",
        link: "https://www.rimowa.com/us/en/luggage/cabin/classic-cabin/97253004.html",
        dimensions: "21.7 × 15.8 × 9.1 in",
        weight: "9.9 lbs",
        volume: "36 L",
        material: "Anodized aluminum with leather handles",
        features: [
            "TSA-approved locks",
            "Multi-wheel system",
            "Telescopic handle",
            "Flex divider",
            "Lifetime guarantee",
            "Premium leather handles",
            "Vintage-inspired design",
            "Handcrafted in Germany"
        ]
    },
    {
        name: "Rimowa Essential Cabin Plus",
        image: "/rimowa-essential-cabin-plus.jpg",
        price: "$875",
        link: "https://www.rimowa.com/us/en/luggage/cabin/essential-cabin-plus/82357004.html",
        dimensions: "22.7 × 17.7 × 9.1 in",
        weight: "8.2 lbs",
        volume: "49 L",
        material: "Polycarbonate",
        features: [
            "TSA-approved locks",
            "Multi-wheel system",
            "Telescopic handle",
            "Flex divider",
            "5-year guarantee",
            "Lightweight design",
            "Impact-resistant",
            "Slightly larger than standard cabin size"
        ]
    }
];

const RimowaComparison: React.FC<RimowaComparisonProps> = ({ theme }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleItems = rimowaModels;

    const handleShowMore = () => {
        setShowAll(!showAll);
    };

    return (
        <div>
            <Section id="rimowa-comparison">
                <SectionHeading title="Rimowa Cabin Comparison" />
                <SectionBody>
                    <SectionBodyText>
                        After years of traveling with various luggage brands, I've settled on Rimowa as my preferred choice for durability, design, and functionality. Here's a detailed comparison of their cabin models: Original, Classic, and Essential Plus.
                    </SectionBodyText>

                    <div className="pt-8">
                        <h3 className="text-white text-lg mb-4">Key Differences</h3>
                        <ul className="list-disc pl-5 text-white space-y-2">
                            <li><strong>Original vs Classic:</strong> The Classic adds premium leather handles and has a more vintage-inspired design, while the Original maintains the iconic modern look.</li>
                            <li><strong>Aluminum vs Polycarbonate:</strong> The Original and Classic are made from aluminum, making them more durable but heavier, while the Essential Plus uses polycarbonate, making it lighter but less durable.</li>
                            <li><strong>Size Variations:</strong> The Essential Plus is slightly larger than the standard cabin size, offering more packing space but potentially exceeding some airlines' size restrictions.</li>
                            <li><strong>Price Point:</strong> The Classic is the premium option, followed by the Original, with the Essential Plus being the most affordable entry point.</li>
                        </ul>
                    </div>

                    <div className="my-8 relative overflow-x-auto">
                        <table className="w-full espresso-table" style={{ tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '80%' }} />
                                <col style={{ width: '20%' }} />
                            </colgroup>
                            <tbody>
                                {visibleItems.map((item, index) => (
                                    <tr key={index} className="group hover:bg-white/10 transition-colors cursor-pointer">
                                        <td className="py-2 px-2">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-9 h-9 bg-gray-600 rounded-[12px] overflow-hidden flex-shrink-0">
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <a href={item.link} 
                                                       target="_blank" 
                                                       rel="noopener noreferrer"
                                                       className="text-white group-hover:text-lime-500 transition-colors truncate block overflow-hidden">
                                                        {item.name}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-2 text-right whitespace-nowrap">
                                            <span className="text-white group-hover:text-lime-500 transition-colors inline-block min-w-[60px]">
                                                {item.price ? item.price.replace(/\s+/g, '') : ''}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-white text-lg mb-4">Detailed Comparison</h3>
                        
                        <div className="space-y-8">
                            {rimowaModels.map((model, index) => (
                                <div key={index} className="border border-white/10 rounded-lg p-4">
                                    <h4 className="text-white text-base mb-2">{model.name}</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">Dimensions: <span className="text-white">{model.dimensions}</span></p>
                                            <p className="text-gray-400 text-sm mb-1">Weight: <span className="text-white">{model.weight}</span></p>
                                            <p className="text-gray-400 text-sm mb-1">Volume: <span className="text-white">{model.volume}</span></p>
                                            <p className="text-gray-400 text-sm mb-1">Material: <span className="text-white">{model.material}</span></p>
                                            <p className="text-gray-400 text-sm mb-1">Price: <span className="text-white">{model.price}</span></p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">Features:</p>
                                            <ul className="list-disc pl-5 text-white text-sm">
                                                {model.features.map((feature, i) => (
                                                    <li key={i}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-white text-lg mb-4">My Recommendation</h3>
                        <SectionBodyText>
                            After extensive research and personal experience, I recommend the Rimowa Original Cabin for most travelers. It strikes the perfect balance between durability, weight, and iconic design. The aluminum construction provides exceptional protection for your belongings, while the distinctive grooved design makes it instantly recognizable.
                        </SectionBodyText>
                        <SectionBodyText>
                            For those who prioritize weight savings or have a tighter budget, the Essential Cabin Plus is an excellent alternative. The polycarbonate construction is still very durable while being significantly lighter and more affordable.
                        </SectionBodyText>
                        <SectionBodyText>
                            The Classic is best suited for travelers who appreciate the vintage aesthetic and premium details like the leather handles, and don't mind paying a premium for these refinements.
                        </SectionBodyText>
                    </div>
                </SectionBody>
            </Section>
            <BackToTop theme={theme} />
        </div>
    );
};

export default RimowaComparison; 