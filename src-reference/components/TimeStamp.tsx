import React from 'react';

interface TimeStampProps {
    className?: string;
    lastSaved?: string; // Optional prop for custom last saved date
}

const TimeStamp: React.FC<TimeStampProps> = ({ className = '', lastSaved }) => {
    return (
        <div className={`inline-flex items-center text-gray-400 text-sm ${className}`}>
            Updated {lastSaved}
        </div>
    );
};

export default TimeStamp; 