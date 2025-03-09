import React, { useState } from 'react';
import Section, { SectionBody, SectionBodyText } from '../components/Section';
import BackToTop from '../components/BackToTop';
import { SectionImage } from '../components/Section';
import LocationLink from '../components/LocationLink';

interface HomeProps {
    theme: 'light' | 'dark';
}

const Home: React.FC<HomeProps> = ({ theme }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    return (
        <div className={`max-w-[652px] text-white ${theme === 'light' ? 'bg-white' : ''}`}>
            <Section id="home" title={undefined}>
                <SectionBody>
                    <SectionBodyText>
                        I'm a designer, startup founder, and creative director living in New York City since 2011.
                    </SectionBodyText>
                    <SectionBodyText>
                        I'm currently co-founder & CEO of <a href="https://supersetapp.com" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">Superset</a>, the world's best platform for fitness coaches and personal trainers.
                    </SectionBodyText>
                    <SectionBodyText>
                        I'm passionate about new media and paradigms that combine art, technology, commerce, and software.
                    </SectionBodyText>
                    <div className="my-6">
                        <div className="relative">
                            {!iframeLoaded && (
                                <div className="absolute inset-0 bg-neutral-800 bg-opacity-90 flex items-center justify-center rounded-lg">
                                    <span className="text-gray-500">Loading…</span>
                                </div>
                            )}
                            <div className="w-full h-[615px] lg:aspect-auto lg:h-[620px]">
                                {/* Commented out LinkedIn embed */}
                                {/* <div className="linkedin-embed">
                                    <script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
                                    <script type="IN/Share" data-url="https://www.linkedin.com/in/taylorpemberton"></script>
                                </div> */}
                                {/* Replace with image */}
                                <img
                                    src="/assets/1740866357585.jpeg"
                                    alt="LinkedIn Profile"
                                    className="w-full h-full object-cover rounded-lg"
                                    onLoad={() => setIframeLoaded(true)}
                                />
                                {/* Add LocationLink */}
                                <div className="mt-2 text-sm text-gray-500">
                                    <LocationLink
                                        location="Superset HQ — Soho, New York City"
                                        coordinates="40.7233,-74.0030"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionBody>
            </Section>

            <Section id="2019" title="Dec 2019">
                <SectionBody>
                    <SectionBodyText>
                        I just finished a big project with Spotify, helping design software products for artists and labels. Due to NDA, I cannot show any work, but please view my <a href="https://www.instagram.com/p/B6Go1MsJojG/?img_index=1" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">Instagram post</a> or <a href="mailto:taylor@taylorpemberton.com" className="text-lime-500 hover:text-lime-400 transition-colors">email me</a> to learn more.
                    </SectionBodyText>
                </SectionBody>
            </Section>

            <Section id="2018" title="May 2018">
                <SectionBody>
                    <SectionBodyText>
                        After a stint in LA & Chicago, I moved back to NYC 🗽
                    </SectionBodyText>
                    <SectionBodyText>
                        <a href="https://pmbr.tn" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">Pemberton</a>, my design consultancy, is accepting projects on a very limited basis. If you'd like to discuss new projects, opportunities, or partnerships, please send me a note at <a href="mailto=taylor@taylorpemberton.com" className="text-lime-500 hover:text-lime-400 transition-colors">taylor@taylorpemberton.com</a>.
                    </SectionBodyText>
                    {/* <SectionBodyText>
                        <span className="text-lime-500">!</span> Most of our work from 2015 onward is private under NDA. Please reach out if you'd like to learn more details.
                    </SectionBodyText> */}
                    <div className="relative">
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center w-full h-full rounded-lg">
                                <span className="text-gray-500">Loading…</span>
                            </div>
                        )}
                        <img
                            src="/assets/keyboard-bling.jpg"
                            alt="Keyboard bling"
                            className={`w-full h-auto rounded-lg my-6 ${imageLoaded ? 'block' : 'invisible'}`}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                </SectionBody>
            </Section>

            <Section id="2015" title="Mar 2015">
                <SectionBody>
                    <SectionBodyText>
                        This was the start of my extended travel, now 15 months nomadic. I set off alone to travel and photograph Peru, Bolivia, China, Thailand, Laos, Cambodia, Vietnam, North Korea, Myanmar, South Korea, North Korea, Philippines, Singapore, Brunei, Indonesia, Malaysia, Cuba, Colombia, Mexico, Sweden, and Germany. The outcome is an ongoing body of work called Contrateur, where I retroactively post excerpts and stories.
                    </SectionBodyText>
                    <SectionImage
                        src="/assets/1500x500.jpeg"
                        alt="Travel journey"
                        height="350px"
                        className="rounded-lg"
                        caption={
                            <LocationLink 
                                location="Yading Nature Reserve, China (Tibetan Prefecture)" 
                                coordinates="28.4372,100.3258" 
                            />
                        }
                    />
                    <SectionBodyText>
                        My work was featured on <a href="https://www.bbc.com/news/newsbeat-34021128" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">BBC</a>, Huffington Post, <a href="https://www.dazeddigital.com/photography/article/26043/1/this-photographer-is-instagramming-from-inside-north-korea" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">DAZED Magazine</a>, and <a href="https://qz.com/485636/humans-of-north-korea-an-ordinary-american-tourists-photos-from-inside-the-hermit-kingdom" className="text-lime-500 hover:text-lime-400 transition-colors" target="_blank" rel="noopener noreferrer">Quartz</a>.
                    </SectionBodyText>
                </SectionBody>
            </Section>

            <BackToTop theme={theme} />
        </div>
    );
};

export default Home; 