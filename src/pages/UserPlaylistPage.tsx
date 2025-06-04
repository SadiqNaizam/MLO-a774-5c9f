import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import ContentHeader from '@/components/ContentHeader';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Edit3, Share2, Trash2, PlusCircle, MoreVertical } from 'lucide-react';

// Placeholder data
const playlistsData: { [key: string]: any } = {
  'my-dora-jams': {
    id: 'my-dora-jams',
    title: 'My Doraemon Jams',
    creator: 'User123 (You)',
    imageUrl: 'https://via.placeholder.com/300/FF69B4/FFFFFF?Text=DoraJams',
    type: 'Playlist',
    itemCount: 3,
    isOwned: true, // Assume user owns this playlist
    songs: [
      { id: 's1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', duration: "3:45", albumArtUrl: 'https://via.placeholder.com/40/FF69B4/FFFFFF?Text=DJ1' },
      { id: 's3', title: 'Boku Doraemon', artist: 'Koorogi \'73', duration: "2:50", albumArtUrl: 'https://via.placeholder.com/40/FF69B4/FFFFFF?Text=DJ2' },
      { id: 's8', title: 'Doramiちゃんのえかきうた', artist: 'Yokozawa Keiko', duration: "2:15", albumArtUrl: 'https://via.placeholder.com/40/FF69B4/FFFFFF?Text=DJ3' },
    ]
  },
  'chill-vibes': {
    id: 'chill-vibes',
    title: 'Chill Evening Vibes',
    creator: 'MusicGuru',
    imageUrl: 'https://via.placeholder.com/300/6495ED/FFFFFF?Text=ChillVibes',
    type: 'Playlist',
    itemCount: 2,
    isOwned: false,
    songs: [
      { id: 's9', title: 'Ocean Breath', artist: 'Relaxing Sounds', duration: "5:00", albumArtUrl: 'https://via.placeholder.com/40/6495ED/FFFFFF?Text=CV1' },
      { id: 's10', title: 'Starlight Lullaby', artist: 'Night Sky Ensemble', duration: "4:30", albumArtUrl: 'https://via.placeholder.com/40/6495ED/FFFFFF?Text=CV2' },
    ]
  }
};


const UserPlaylistPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [playlistDetails, setPlaylistDetails] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  useEffect(() => {
    console.log('UserPlaylistPage loaded for playlistId:', playlistId);
    if (playlistId && playlistsData[playlistId]) {
      setPlaylistDetails(playlistsData[playlistId]);
    } else {
      console.error("Playlist not found for ID:", playlistId);
    }
  }, [playlistId]);

  const playSong = (song: any) => {
    const songToPlay = {
        ...song,
        albumArtUrl: song.albumArtUrl || playlistDetails?.imageUrl,
        audioSrc: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.ceil(Math.random()*5)}.mp3`
    };
    setCurrentSong(songToPlay);
    setPlayingSongId(song.id);
    console.log("Playing song:", song.title);
  };

  const handlePlayAll = () => {
    if (playlistDetails && playlistDetails.songs.length > 0) {
      playSong(playlistDetails.songs[0]);
      console.log("Playing all songs from playlist:", playlistDetails.title);
    }
  };

  const handleRemoveSong = (songId: string) => {
    console.log(`Removing song ${songId} from playlist ${playlistDetails?.title}`);
    // Add logic to update playlistDetails state
    if (playlistDetails) {
        setPlaylistDetails({
            ...playlistDetails,
            songs: playlistDetails.songs.filter((s:any) => s.id !== songId),
            itemCount: playlistDetails.itemCount - 1,
        });
    }
  };

  if (!playlistDetails) {
     return (
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar className="shadow-lg" />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-xl text-gray-600">Loading playlist details or playlist not found...</p>
        </div>
         <MusicPlayerControls currentSong={null} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar className="shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-28">
          <ContentHeader
            title={playlistDetails.title}
            subtitle={`Created by ${playlistDetails.creator} • ${playlistDetails.songs.length} songs`}
            imageUrl={playlistDetails.imageUrl}
            type={playlistDetails.type}
            onPlayAll={handlePlayAll}
            onShufflePlay={() => console.log("Shuffle play playlist:", playlistDetails.title)}
            className="rounded-b-xl"
          />
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
                {playlistDetails.isOwned && (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                        <Edit3 className="mr-2 h-4 w-4" /> Edit Playlist
                    </Button>
                )}
                <Button variant="outline" className="rounded-full">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                 {!playlistDetails.isOwned && (
                    <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 rounded-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Follow Playlist
                    </Button>
                 )}
            </div>

            <div className="space-y-1 bg-white p-4 rounded-lg shadow">
              {playlistDetails.songs.map((song: any, index: number) => (
                <SongListItem
                  key={song.id}
                  songTitle={`${index + 1}. ${song.title}`}
                  artistName={song.artist}
                  albumArtUrl={song.albumArtUrl}
                  duration={song.duration}
                  isPlaying={playingSongId === song.id}
                  onPlayClick={() => playSong(song)}
                  onMenuClick={() => console.log(`Menu for: ${song.title}`)} // Placeholder for actual DropdownMenu trigger
                  className="hover:bg-blue-50 even:bg-gray-50/50 rounded-md pr-0" // pr-0 to give space for dropdown
                >
                 {playlistDetails.isOwned && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-auto text-gray-500 hover:text-blue-500">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log(`Add ${song.title} to queue`)}>
                                Add to Queue
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log(`Go to artist: ${song.artist}`)}>
                                Go to Artist
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log(`Go to album for ${song.title}`)}>
                                Go to Album
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleRemoveSong(song.id)} className="text-red-600 hover:!text-red-600 hover:!bg-red-50">
                                <Trash2 className="mr-2 h-4 w-4" /> Remove from Playlist
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 )}
                </SongListItem>
              ))}
              {playlistDetails.songs.length === 0 && (
                <p className="text-gray-500 text-center py-4">This playlist is empty. Add some songs!</p>
              )}
            </div>
          </div>
        </main>
        <MusicPlayerControls currentSong={currentSong} className="shadow-top-lg" />
      </div>
    </div>
  );
};

export default UserPlaylistPage;