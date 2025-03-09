import React from 'react';
import Section, { SectionBody, SectionBodyText, SectionHeading } from '../../components/Section';
import BackToTop from '../../components/BackToTop';
import TimeStamp from '../../components/TimeStamp';

interface GSLProps {
    theme: string;
}

const GSL: React.FC<GSLProps> = ({ theme }) => {
    return (
        <div>
            <Section id="gsl">
                <SectionHeading title="Page under construction, ironically" />
                {/* <TimeStamp lastSaved="Mar 2, 2025 · 5:24 PM" /> */}
                <SectionBody>
                    <SectionBodyText>
                        In May 2015, I purchased and renovated a loft-space in Chicago's developing neighborhood, West Loop.
                    </SectionBodyText>

                    <img src="/assets/1.IMG_0678.jpg" alt="GSL Renovation" className="mb-4" />

                    <SectionBodyText>
                        Project summary: My brother and I worked together over 12 months to design, plan, and oversee a complete gut renovation. We collaborated on all aspects of design—first eliminating all existing walls and appliances—and then transforming the space through a custom ground-up build-out. The unit is currently rented but interest for future occupancy is always welcome. <a href="mailto:taylor@taylorpemberton.com" className="text-lime-500 hover:text-lime-400 transition-colors">Email me to get in touch.</a>
                    </SectionBodyText>

                    {Array.from({ length: 23 }, (_, i) => i + 2).map((num) => (
                        <img key={num} src={`/assets/${num}.IMG_0699-${num - 1}.jpg`} alt={`GSL Renovation ${num}`} className="mb-4" />
                    ))}

                    <div className="text-gray-300">
                        <h2 className="text-lime-500 font-normal mb-2">Amenities:</h2>
                        <ul className="list-disc list-inside">
                            <li>1 block from the UIC-Halsted Blue Line Stop</li>
                            <li>4 blocks from Whole Foods and Mariano's</li>
                            <li>6 blocks from Soho House and Randolph</li>
                            <li>Custom plywood base-cabinets/shelving</li>
                            <li>Bosch appliances and Kohler plumbing</li>
                            <li>8 large factory windows</li>
                            <li>Dimmable lights</li>
                            <li>Laundry in-unit</li>
                        </ul>
                    </div>

                    <SectionBodyText>
                        Questions? Email <a href="mailto:taylor@taylorpemberton.com" className="text-lime-500 hover:text-lime-400 transition-colors">taylor@taylorpemberton.com</a>
                    </SectionBodyText>
                </SectionBody>
            </Section>

            <BackToTop theme={theme} />
        </div>
    );
};

export default GSL; 