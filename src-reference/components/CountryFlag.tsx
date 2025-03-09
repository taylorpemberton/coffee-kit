import React from 'react';

interface CountryFlagProps {
    countryCode: string;
    onClick: () => void;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, onClick }) => {
    return (
        <img
            src={`https://flagcdn.com/${countryCode}.svg`}
            alt={`${countryCode} flag`}
            className="w-6 h-6 cursor-pointer"
            onClick={onClick}
        />
    );
};

export default CountryFlag; 