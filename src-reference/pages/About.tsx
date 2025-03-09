import React, { JSX } from 'react';
import Section, { SectionBody, SectionBodyText } from '../components/Section';
import BackToTop from '../components/BackToTop';

interface ExperienceItemProps {
    company: string;
    role: string;
    duration: string;
    points: (string | JSX.Element)[];
}

interface Region {
    title: string;
    countries: {
        flag: string;
        name: string;
        subdivisions?: { flag: string; name: string }[];
    }[];
}

interface AboutProps {
    theme: 'light' | 'dark';
}

const cities = [
    "New York", "Los Angeles", "Chicago", "San Francisco", 
    "Yangon", "Bangkok", "Taipei", "Bogotá", "Mexico City", 
];

const experienceData: ExperienceItemProps[] = [
  {
    company: "Superset",
    role: "CEO & Co-Founder",
    duration: "2020 - Now",
    points: [
      "Building for 900,000+ online health/fitness professionals and $40B/year transfer of value",
      "Regarded as the best platform amongst modern coaches and personal trainers",
      <a href="https://supersetapp.com" 
         className="text-gray-500 hover:text-lime-500 hover:underline transition-colors duration-200"
         target="_blank" 
         rel="noopener noreferrer">
         https://supersetapp.com
      </a>
    ]
  },
  {
    company: "Spotify",
    role: "Product Design Lead - Creator Monetization",
    duration: "2018 - 2020",
    points: [
      "Led design for artist-facing monetization tools",
      "Shipped React/Typescript code directly via PRs",
      "Pioneered cross-functional collaboration between design, engineering, and data teams"
    ]
  },
  {
    company: "Airbnb",
    role: "Product Designer - Trips & Experiences",
    duration: "2015 - 2016",
    points: [
      "Designed initial concepts for Airbnb Experiences (originally 'Magical Trips')",
      "Created modular itinerary system for trip planning",
      "Developed navigation framework for multi-day experiences"
    ]
  },
  {
    company: "Google",
    role: "Product Design Lead - Primer",
    duration: "2013 - 2015",
    points: [
      "Mobile-first education app for digital marketing skills",
      "Featured in TechCrunch, 9to5Mac, and Apple App Store"
    ]
  },
  {
    company: "Pemberton",
    role: "Founder & Principal Designer",
    duration: "2013 - 2015",
    points: [
      "Built and led a team of 5 in downtown Manhattan",
      "Award-winning product studio working with Fortune 500 clients",
      "Shipped products for Google, Airbnb, Spotify, and Tumblr",
      <a href="https://pmbr.tn" 
         className="text-gray-500 hover:text-lime-500 hover:underline transition-colors duration-200"
         target="_blank" 
         rel="noopener noreferrer">
         Portfolio archive
      </a>
    ]
  }
];

const ExperienceItem: React.FC<ExperienceItemProps> = ({ company, duration, role, points }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-[12px] overflow-hidden ${
                company.toLowerCase() === 'superset' ? 'border-2 border-gray-800' : ''
            }`}>
                <img 
                    src={`/logos/${company.toLowerCase()}.svg`}
                    alt={`${company} logo`}
                    className="w-full h-full"
                />
            </div>
        </div>
        <div className="flex-grow min-w-0">
            <div className="flex flex-wrap justify-between items-baseline gap-2">
                <h3 className="text-white font-normal">{company}</h3>
                <span className="text-gray-500 whitespace-nowrap">{duration}</span>
            </div>
            <p className="text-gray-500 pb-2">{role}</p>
            <ul>
                {points.map((point, i) => (
                    <li key={i} className="flex">
                        <span className="mr-2">•</span>
                        <div className="flex-1 text-gray-300">
                            {typeof point === 'string' ? point : 
                                React.cloneElement(point, {
                                    className: 'text-gray-500 hover:text-lime-500 hover:underline transition-colors duration-200'
                                })
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const regions: Record<string, Region> = {
    asia: {
        title: "Asia",
        countries: [
            { flag: "🇧🇳", name: "Brunei" },
            { flag: "🇰🇭", name: "Cambodia" },
            { flag: "🇨🇳", name: "China mainland" },
            { flag: "🇭🇰", name: "Hong Kong" },
            { flag: "🇲🇴", name: "Macao" },
            { flag: "🇮🇩", name: "Indonesia" },
            { flag: "🇯🇵", name: "Japan" },
            { flag: "🇱🇦", name: "Laos" },
            { flag: "🇲🇾", name: "Malaysia" },
            { flag: "🇲🇲", name: "Myanmar (Burma)" },
            { flag: "🇰🇵", name: "North Korea" },
            { flag: "🇵🇭", name: "Philippines" },
            { flag: "🇸🇬", name: "Singapore" },
            { flag: "🇰🇷", name: "South Korea" },
            { flag: "🇹🇼", name: "Taiwan" },
            { flag: "🇹🇭", name: "Thailand" },
            { flag: "🇹🇷", name: "Türkiye" },
            { flag: "🇻🇳", name: "Vietnam" }
        ]
    },
    europe: {
        title: "Europe",
        countries: [
            { flag: "🇩🇰", name: "Denmark" },
            { flag: "🇫🇷", name: "France" },
            { flag: "🇩🇪", name: "Germany" },
            { flag: "🇸🇪", name: "Sweden" },
            { flag: "🇹🇷", name: "Türkiye" },
            { flag: "🇬🇧", name: "United Kingdom", 
                subdivisions: [
                    { flag: "🇰🇾", name: "Cayman Islands" },
                    { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "England" },
                    { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", name: "Scotland" }
                ]
            }
        ]
    },
    northAmerica: {
        title: "North America",
        countries: [
            { flag: "🇧🇸", name: "Bahamas" },
            { flag: "🇨🇦", name: "Canada" },
            { flag: "🇨🇺", name: "Cuba" },
            { flag: "🇩🇴", name: "Dominican Republic" },
            { flag: "🇬🇹", name: "Guatemala" },
            { flag: "🇲🇽", name: "Mexico" },
            { flag: "🇺🇸", name: "United States" }
        ]
    },
    southAmerica: {
        title: "South America",
        countries: [
            { flag: "🇧🇴", name: "Bolivia" },
            { flag: "🇧🇷", name: "Brazil" },
            { flag: "🇨🇴", name: "Colombia" },
            { flag: "🇵🇪", name: "Peru" }
        ]
    }
};

const About: React.FC<AboutProps> = ({ theme }) => {
    return (
        <div className={`max-w-[652px] ${theme === 'light' ? 'bg-white' : ''}`}>
            {/* Profile Image */}
            <div className="flex justify-left mb-8">
                <img
                    src="/assets/pic-taylorPemberton-optimized.jpg"
                    alt="Taylor Pemberton"
                    className="w-[240px] h-[300px] rounded-lg object-cover object-top"
                />
            </div>

            {/* Main content */}
            <Section id="experience">
                <SectionBody>
                    <div className="space-y-8">
                        {experienceData.map((exp, index) => (
                            <ExperienceItem key={index} {...exp} />
                        ))}
                    </div>
                    <SectionBodyText>In 2012 I was named a Young Gun by the ICFF and Top 25 Designer to watch by Complex Magazine.</SectionBodyText>
                    <SectionBodyText>
                        In 2013 I was named a <a href="https://www.nowness.com/story/icff-studio-young-guns" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">Young Gun by the ICFF</a> and <a href="https://www.complex.com/style/a/kathryn-henderson/25-young-designers-to-watch" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">Top 25 Designer to watch by Complex Magazine</a>.
                    </SectionBodyText>
                    <SectionBodyText>
                        I received multiple scholarships to attend the Savannah College of Art and Design, including Men's Golf, Standout Portfolio, and the prestigious <a href="https://archive.tdc.org/scholarship/" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">Type Director's Club</a>.
                    </SectionBodyText>
                    <SectionBodyText>
                        <a href="https://www.linkedin.com/in/taylorpemberton/" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">See full LinkedIn &rarr;</a>
                    </SectionBodyText>
                </SectionBody>
            </Section>
            <div className="border-b border-gray-700 my-16"></div> {/* 1px line break */}
            <Section id="countries">
                <SectionBody>
                    <div className="group relative inline-block">
                        <h3 className="text-white cursor-default">
                            Countries traveled
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm text-black bg-gray-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                                4 weeks or longer
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-400"></div>
                            </span>
                        </h3>
                    </div>
                    <div className="space-y-6">
                        {Object.values(regions).map((region) => (
                            <div key={region.title} className="space-y-0">
                                <h4 className="text-gray-400 mb-2">
                                    {region.title} <span className="text-gray-500">({region.countries.length} countries)</span>
                                </h4>
                                <div className="space-y-0">
                                    {region.countries.map((country) => (
                                        <div key={country.name} className="space-y-0">
                                            <div className="text-gray-300 flex items-center">
                                                <span className="mr-2">{country.flag}</span>
                                                {country.name}
                                            </div>
                                            {country.subdivisions && (
                                                <div className="pl-6 space-y-0">
                                                    {country.subdivisions.map((subdivision) => (
                                                        <div key={subdivision.name} className="text-gray-300 flex items-center">
                                                            <span className="mr-2">{subdivision.flag}</span>
                                                            {subdivision.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionBody>
            </Section>

            <Section id="cities">
                <SectionBody>
                    <div className="group relative inline-block">
                        <h3 className="text-white mb-0 cursor-default">
                            Cities lived
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm text-black bg-lime-500 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                                4 weeks or longer
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-lime-500"></div>
                            </span>
                        </h3>
                    </div>
                    <div className="space-y-0">
                        {cities.map((city, index) => (
                            <div key={index} className="text-gray-300 flex">
                                <span className="mr-2">•</span>
                                {city}
                            </div>
                        ))}
                    </div>
                </SectionBody>
            </Section>

            <BackToTop theme={theme} />
        </div>
    );
};

export default About;