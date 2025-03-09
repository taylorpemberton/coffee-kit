interface LocationLinkProps {
    location: string;
    coordinates: string; // Format: "latitude,longitude"
    className?: string;
}

const LocationLink: React.FC<LocationLinkProps> = ({ location, coordinates, className = '' }) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates)}`;

    return (
        <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm hover:text-lime-500 transition-colors ${className}`}
        >
            📍 {location}
        </a>
    );
};

export default LocationLink; 