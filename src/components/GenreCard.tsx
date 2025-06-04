import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from 'lucide-react'; // Example icon

interface GenreCardProps {
  genreName: string;
  imageUrl?: string; // Optional image for the genre
  color?: string; // Optional background color (e.g., for Doraemon theme)
  onGenreSelect: (genreName: string) => void;
}

const GenreCard: React.FC<GenreCardProps> = ({
  genreName,
  imageUrl,
  color = 'bg-blue-500', // Default Doraemon blue
  onGenreSelect,
}) => {
  console.log("Rendering GenreCard:", genreName);

  // Doraemon theme: rounded corners, specific colors
  // Colors: blue, white, red, yellow
  // Example: use 'color' prop to vary, or randomize from a palette
  const cardStyle = `${color} text-white`;

  return (
    <Card
      className={`w-full h-36 md:h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer ${cardStyle}`}
      onClick={() => onGenreSelect(genreName)}
    >
      <CardContent className="p-4 flex flex-col justify-between h-full">
        {imageUrl ? (
          <img src={imageUrl} alt={genreName} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        ) : (
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <Music className="w-16 h-16" />
          </div>
        )}
        <div className="relative z-10">
            <h3 className="text-xl font-bold line-clamp-2">{genreName}</h3>
            {/* Could add number of songs or other small details */}
        </div>
        <div className="relative z-10 mt-auto text-right">
            {/* Placeholder for a play button or indicator */}
        </div>
      </CardContent>
    </Card>
  );
}

export default GenreCard;