import React from 'react';
import Section, { SectionBody, SectionBodyText, SectionHeading } from '../../components/Section';
import BackToTop from '../../components/BackToTop';

interface OnTravelProps {
  theme: string;
}

function OnTravel({ theme }: OnTravelProps) {
  return (
    <div>
      <Section id="contrateur">
        <SectionHeading title="CONTRATEUR" />
        <SectionBody>
          <SectionBodyText>
            People & PLACES that challenge the status quo
          </SectionBodyText>
          
          <SectionBodyText>
            Photographs and stories carry the innate power to bring people together—crossing foreign borders, language, religion, and political constructs.
          </SectionBodyText>
          
          <SectionBodyText>
            In a world of glossified social media, our project exists to earnestly document and capture the cultural depth that extends beyond mainstream travel.
          </SectionBodyText>

          <SectionBodyText>
            We look at travel within a few key themes:
          </SectionBodyText>
          
          <ul className="list-disc pl-6 mb-4">
            <li>True travel mustn't be expensive or elaborate.</li>
            <li>Self-discovery is painful, but worth the headache.</li>
            <li>Immersion takes time—the greatest luxury of all.</li>
            <li>Relationships are the currency of our well-being.</li>
            <li>Foreign language is hard-earned, yet necessary.</li>
            <li>Fear is a facade, often waiting to be dissolved.</li>
          </ul>

          <SectionBodyText>
            Since 2014, we've covered 23 countries and 4 continents over a total travel span of 12 months. Extended travel can be arduous, and so our project remains open-ended to support our preference of slow and virtuous travel.
          </SectionBodyText>
          
          <SectionBodyText>
            Unus pro omnibus, omnes pro uno.
          </SectionBodyText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <SectionBodyText>2015 — 2017</SectionBodyText>
              <ul className="list-disc pl-6">
                <li>Peru</li>
                <li>Bolivia</li>
                <li>Hong Kong</li>
                <li>Macau</li>
                <li>China</li>
                <li>Thailand</li>
                <li>Laos</li>
                <li>Cambodia</li>
                <li>Vietnam</li>
                <li>North Korea</li>
                <li>Myanmar</li>
                <li>Sweden</li>
                <li>Germany</li>
                <li>Denmark</li>
                <li>South Korea</li>
                <li>Taiwan</li>
                <li>Philippines</li>
                <li>Singapore</li>
                <li>Malaysia</li>
                <li>Brunei</li>
                <li>Indonesia</li>
                <li>Cuba</li>
                <li>Mexico</li>
                <li>Colombia</li>
              </ul>
            </div>

            <div>
              <SectionBodyText>2018 — ???</SectionBodyText>
              <ul className="list-disc pl-6">
                <li>Russia</li>
                <li>Greenland</li>
                <li>Morocco</li>
                <li>Lebanon</li>
                <li>Jordan</li>
                <li>Oman</li>
                <li>Iran</li>
                <li>Bangladesh</li>
                <li>Sri Lanka</li>
                <li>Bhutan</li>
                <li>Mongolia</li>
                <li>India</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <SectionBodyText>Contrateur is:</SectionBodyText>
              <ul className="list-disc pl-6">
                <li>a slowly evolving, lifelong body of work.</li>
                <li>photography as a medium for storytelling.</li>
                <li>existentialism for western-style stereotypes.</li>
                <li>a metaphorical bridge for cultural paranoia.</li>
                <li>eventual, open-sourced documentarianism.</li>
              </ul>
            </div>

            <div>
              <SectionBodyText>Contrateur is not:</SectionBodyText>
              <ul className="list-disc pl-6">
                <li>sponsored by corporate interests or motives.</li>
                <li>banal, opulent, wasteful, or irresponsible.</li>
                <li>clickbait; or even worse, a lifestyle blog.</li>
                <li>in support of irreverant digital nomadism.</li>
                <li>perfect, nor close-minded to change.</li>
              </ul>
            </div>
          </div>

          <SectionBodyText>
            Created by Taylor Pemberton. All content is original. Copyright © 2018 All Rights Reserved.
          </SectionBodyText>
        </SectionBody>
      </Section>
      <BackToTop theme={theme} />
    </div>
  );
}

export default OnTravel; 