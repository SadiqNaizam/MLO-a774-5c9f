import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import ContentHeader from '@/components/ContentHeader';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Button } from "@/components/ui/button";
import { Heart, ListPlus } from 'lucide-react';

// Placeholder data - in a real app, this would be fetched
const albumsData: { [key: string]: any } = {
  'dora-soundtrack-vol1': {
    id: 'dora-soundtrack-vol1',
    title: 'Doraemon Soundtrack Vol. 1',
    artist: 'Various Artists',
    imageUrl: 'https://via.placeholder.com/300/007BFF/FFFFFF?Text=Album+Art+Dora',
    type: 'Album',
    itemCount: 5,
    releaseDate: '2023-01-15',
    songs: [
      { id: 's1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', duration: "3:45", albumArtUrl: 'https://via.placeholder.com/40/007BFF/FFFFFF?Text=DS1' },
      { id: 's2', title: 'Doraemon Ekaki Uta', artist: 'Nobuyo Ōyama', duration: "2:10", albumArtUrl: 'https://via.placeholder.com/40/007BFF/FFFFFF?Text=DS2' },
      { id: 's3', title: 'Aoi Sora wa Pocket sa', artist: 'Kumiko Osugi', duration: "3:05", albumArtUrl: 'https://via.placeholder.com/40/007BFF/FFFFFF?Text=DS3' },
      { id: 's4', title: 'Boku Doraemon', artist: 'Koorogi \'73', duration: "2:50", albumArtUrl: 'https://via.placeholder.com/40/007BFF/FFFFFF?Text=DS4' },
      { id: 's5', title: 'Tomodachi Dakara', artist: 'Nobuyo Ōyama', duration: "3:30", albumArtUrl: 'https://via.placeholder.com/40/007BFF/FFFFFF?Text=DS5' },
    ]
  },
   'another-album': {
    id: 'another-album',
    title: 'Nobita\'s Adventure Mix',
    artist: 'Film Soundtrack',
    imageUrl: 'https://via.placeholder.com/300/FFD700/000000?Text=Nobita+Mix',
    type: 'Album',
    itemCount: 3,
    releaseDate: '2024-03-10',
    songs: [
      { id: 'n1', title: 'Journey to the Future', artist: 'Soundtrack Band', duration: "4:02", albumArtUrl: 'https://via.placeholder.com/40/FFD700/000000?Text=NS1' },
      { id: 'n2', title: 'Gadget March', artist: 'Orchestra', duration: "2:55", albumArtUrl: 'https://via.placeholder.com/40/FFD700/000000?Text=NS2' },
      { id: 'n3', title: 'Friendship Power', artist: 'Chorus Group', duration: "3:15", albumArtUrl: 'https://via.placeholder.com/40/FFD700/000000?Text=NS3' },
    ]
  }
};

const AlbumDetailPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumDetails, setAlbumDetails] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  useEffect(() => {
    console.log('AlbumDetailPage loaded for albumId:', albumId);
    if (albumId && albumsData[albumId]) {
      setAlbumDetails(albumsData[albumId]);
      // Optionally set the first song as current for player initial state (without playing)
      // setCurrentSong({ ...albumsData[albumId].songs[0], audioSrc: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3` });
    } else {
      console.error("Album not found for ID:", albumId);
      // Handle album not found, e.g., redirect to a 404 page or show a message
    }
  }, [albumId]);

  const playSong = (song: any) => {
    const songToPlay = {
        ...song,
        albumArtUrl: albumDetails?.imageUrl || song.albumArtUrl, // Use main album art if song-specific isn't available
        audioSrc: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.ceil(Math.random()*5)}.mp3` // Placeholder audio
    };
    setCurrentSong(songToPlay);
    setPlayingSongId(song.id);
    console.log("Playing song:", song.title);
  };

  const handlePlayAll = () => {
    if (albumDetails && albumDetails.songs.length > 0) {
      playSong(albumDetails.songs[0]);
      // Here you might want to queue up the rest of the album
      console.log("Playing all songs from album:", albumDetails.title);
    }
  };
  
  if (!albumDetails) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar className="shadow-lg" />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-xl text-gray-600">Loading album details or album not found...</p>
        </div>
        <MusicPlayerControls currentSong={null} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar className="shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-28"> {/* No horizontal padding here, ContentHeader handles it */}
          <ContentHeader
            title={albumDetails.title}
            subtitle={albumDetails.artist}
            imageUrl={albumDetails.imageUrl}
            type={albumDetails.type}
            itemCount={albumDetails.itemCount}
            releaseDate={albumDetails.releaseDate}
            onPlayAll={handlePlayAll}
            onShufflePlay={() => console.log("Shuffle play album:", albumDetails.title)}
            onAddToLibrary={() => console.log("Add to library:", albumDetails.title)}
            className="rounded-b-xl"
          />
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-start items-center space-x-3 mb-6">
                <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full">
                    <Heart className="mr-2 h-4 w-4" /> Favorite Album
                </Button>
                 <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-full">
                    <ListPlus className="mr-2 h-4 w-4" /> Add to Playlist
                </Button>
            </div>
            <div className="space-y-1 bg-white p-4 rounded-lg shadow">
              {albumDetails.songs.map((song: any, index: number) => (
                <SongListItem
                  key={song.id}
                  songTitle={`${index + 1}. ${song.title}`}
                  artistName={albumDetails.artist} // Album artist for all songs
                  albumArtUrl={song.albumArtUrl}
                  duration={song.duration}
                  isPlaying={playingSongId === song.id}
                  onPlayClick={() => playSong(song)}
                  onMenuClick={() => console.log(`Menu for song: ${song.title}`)}
                  className="hover:bg-blue-50 even:bg-gray-50/50 rounded-md"
                />
              ))}
            </div>
          </div>
        </main>
        <MusicPlayerControls currentSong={currentSong} className="shadow-top-lg" />
      </div>
    </div>
  );
};

export default AlbumDetailPage;