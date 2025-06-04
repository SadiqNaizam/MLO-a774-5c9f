import React from 'react';
import { Button } from '@/components/ui/button'; // Example for action buttons
import { Play, Shuffle, PlusCircle } from 'lucide-react'; // Example icons

interface ContentHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string; // e.g., Album art, Artist image
  type?: string; // e.g., "Album", "Artist", "Playlist"
  itemCount?: number; // e.g., number of songs
  releaseDate?: string; // e.g. for albums
  onPlayAll?: () => void;
  onShufflePlay?: () => void;
  onAddToLibrary?: () => void;
  className?: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  subtitle,
  imageUrl,
  type,
  itemCount,
  releaseDate,
  onPlayAll,
  onShufflePlay,
  onAddToLibrary,
  className,
}) => {
  console.log("Rendering ContentHeader for:", title);

  // Doraemon theme hints: rounded, blue accents
  const doraPrimaryColor = "text-blue-600";
  const doraButtonClass = "bg-blue-500 hover:bg-blue-600 text-white rounded-lg";

  return (
    <div className={`p-6 md:p-8 rounded-xl bg-gradient-to-b from-blue-100 via-white to-white mb-6 shadow ${className}`}>
      <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
        {imageUrl && (
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0 bg-gray-200">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-grow text-center md:text-left">
          {type && <p className={`text-xs font-semibold uppercase ${doraPrimaryColor} tracking-wider mb-1`}>{type}</p>}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 truncate">{title}</h1>
          {subtitle && <p className="text-md text-gray-600 mt-1 truncate">{subtitle}</p>}
          <div className="text-xs text-gray-500 mt-2 flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1">
            {itemCount !== undefined && <span>{itemCount} songs</span>}
            {itemCount !== undefined && releaseDate && <span>•</span>}
            {releaseDate && <span>Released: {releaseDate}</span>}
          </div>
        </div>
      </div>

      {(onPlayAll || onShufflePlay || onAddToLibrary) && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
          {onPlayAll && (
            <Button onClick={onPlayAll} className={`${doraButtonClass} px-6 py-3`}>
              <Play className="mr-2 h-5 w-5" /> Play All
            </Button>
          )}
          {onShufflePlay && (
            <Button variant="outline" onClick={onShufflePlay} className="rounded-lg px-6 py-3 border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600">
              <Shuffle className="mr-2 h-5 w-5" /> Shuffle
            </Button>
          )}
          {onAddToLibrary && (
            <Button variant="ghost" onClick={onAddToLibrary} className="rounded-lg text-gray-600 hover:text-blue-600">
              <PlusCircle className="mr-2 h-5 w-5" /> Add to Library
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
export default ContentHeader;