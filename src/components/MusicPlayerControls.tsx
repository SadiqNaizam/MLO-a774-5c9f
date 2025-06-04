import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress'; // For seek bar
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  audioSrc: string; // URL to the audio file
}

interface MusicPlayerControlsProps {
  currentSong: Song | null;
  // Callbacks for play, pause, next, prev, volume change, seek
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onVolumeChange?: (volume: number) => void;
  onSeek?: (time: number) => void;
  className?: string;
}

const MusicPlayerControls: React.FC<MusicPlayerControlsProps> = ({
  currentSong,
  // onPlayPause, onNext, onPrevious, onVolumeChange, onSeek,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // 0 to 1
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [duration, setDuration] = useState(0); // in seconds
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("Rendering MusicPlayerControls for song:", currentSong?.title);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      if (isPlaying) {
        audio.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
        setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        // onNext?.(); // Autoplay next song
      };
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', updateProgress); // Get duration
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', updateProgress);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSong /*, onNext */]);

  const togglePlayPause = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
    // onPlayPause?.();
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0] / 100);
  };

  const handleSeek = (newProgress: number[]) => {
    if (audioRef.current && currentSong && duration > 0) {
      const newTime = (newProgress[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress[0]);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Doraemon theme: Rounded, playful, primary colors blue/red/yellow
  const doraBlueBg = "bg-blue-600";
  const doraRedAccent = "text-red-500";
  const doraYellowAccent = "text-yellow-400";

  if (!currentSong) {
    return (
        <div className={`fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex items-center justify-center text-gray-500 rounded-t-xl shadow-top ${className}`}>
            No song selected.
        </div>
    );
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-gray-200 p-4 flex items-center justify-between space-x-4 rounded-t-xl shadow-top ${className}`}>
      {currentSong.audioSrc && <audio ref={audioRef} src={currentSong.audioSrc} />}
      {/* Left: Album Art & Song Info */}
      <div className="flex items-center space-x-3 w-1/3">
        <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-200">
          {currentSong.albumArtUrl ? (
            <img src={currentSong.albumArtUrl} alt={currentSong.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100">
              <Music className="w-6 h-6 text-blue-500" />
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-800 truncate">{currentSong.title}</h4>
          <p className="text-xs text-gray-500 truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Center: Playback Controls & Seek Bar */}
      <div className="flex flex-col items-center justify-center flex-grow w-1/3">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => console.log("Prev clicked") /* onPrevious?.() */} className="text-gray-600 hover:text-blue-600">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={togglePlayPause}
            className={`${doraBlueBg} text-white rounded-full w-10 h-10 hover:${doraBlueBg}/90`}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => console.log("Next clicked") /* onNext?.() */} className="text-gray-600 hover:text-blue-600">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="w-full flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-500 w-8 text-right">{formatTime(currentTime)}</span>
            <Slider
                defaultValue={[0]}
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleSeek}
                className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-blue-500"
            />
            {/* <Progress value={progress} className="w-full h-1.5 [&>div]:bg-blue-500" /> */}
            <span className="text-xs text-gray-500 w-8 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center space-x-3 w-1/3 justify-end">
        <div className="flex items-center space-x-1 w-28">
          <Button variant="ghost" size="icon" onClick={() => setVolume(volume > 0 ? 0 : 0.5)} className="text-gray-600 hover:text-blue-600">
            {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            defaultValue={[50]}
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-blue-500"
          />
        </div>
        {/* <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
          <Maximize2 className="h-5 w-5" />
        </Button> */}
      </div>
    </div>
  );
}
export default MusicPlayerControls;