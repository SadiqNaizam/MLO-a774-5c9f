import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, MoreHorizontal, Heart } from 'lucide-react';

interface SongListItemProps {
  songTitle: string;
  artistName: string;
  albumArtUrl?: string; // Optional album art
  duration?: string; // Optional song duration e.g., "3:45"
  isPlaying?: boolean; // Is this song currently playing?
  isFavorited?: boolean;
  onPlayClick: () => void;
  onFavoriteClick?: () => void;
  onMenuClick?: () => void; // For a context menu
  className?: string;
}

const SongListItem: React.FC<SongListItemProps> = ({
  songTitle,
  artistName,
  albumArtUrl,
  duration,
  isPlaying = false,
  isFavorited = false,
  onPlayClick,
  onFavoriteClick,
  onMenuClick,
  className,
}) => {
  console.log("Rendering SongListItem:", songTitle);

  // Doraemon theme: subtle highlights, rounded elements
  const activeColor = "text-blue-500"; // Doraemon blue for active/playing
  const hoverBgColor = "hover:bg-blue-50";

  return (
    <div
      className={`flex items-center p-3 space-x-4 rounded-lg transition-colors duration-150 ${hoverBgColor} ${isPlaying ? 'bg-blue-50' : ''} ${className}`}
    >
      {albumArtUrl ? (
        <img src={albumArtUrl} alt={songTitle} className="w-10 h-10 rounded object-cover" />
      ) : (
        <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
          <PlayCircle className="w-5 h-5 text-gray-400" /> {/* Placeholder icon */}
        </div>
      )}
      <div className="flex-grow">
        <h4 className={`font-medium text-sm truncate ${isPlaying ? activeColor : 'text-gray-800'}`}>{songTitle}</h4>
        <p className="text-xs text-gray-500 truncate">{artistName}</p>
      </div>
      {duration && <span className="text-xs text-gray-500 w-12 text-right">{duration}</span>}
      {onFavoriteClick && (
        <Button variant="ghost" size="icon" onClick={onFavoriteClick} className={`text-gray-400 hover:text-red-500 ${isFavorited ? 'text-red-500' : ''}`}>
          <Heart className="h-5 w-5" />
        </Button>
      )}
      <Button variant="ghost" size="icon" onClick={onPlayClick} className={`${isPlaying ? activeColor : 'text-gray-600'} hover:${activeColor}`}>
        {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
      </Button>
      {onMenuClick && (
         <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-gray-400 hover:text-gray-700">
            <MoreHorizontal className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
export default SongListItem;