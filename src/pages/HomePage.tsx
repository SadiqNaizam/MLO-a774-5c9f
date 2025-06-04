import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import GenreCard from '@/components/GenreCard';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // For horizontal scroll of cards

// Placeholder data for MusicPlayerControls
const initialSong = {
  id: 'dora-theme-1',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  albumArtUrl: 'https://via.placeholder.com/150/007BFF/FFFFFF?Text=Doraemon+Song',
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Replace with actual or placeholder audio
};

// Placeholder data for featured content
const featuredPlaylists = [
  { id: 'fp1', title: 'Doraemon\'s Favorites', description: 'Upbeat and fun!', items: 12, imageUrl: 'https://via.placeholder.com/200/007BFF/FFFFFF?Text=Playlist+1' },
  { id: 'fp2', title: 'Nobita\'s Study Mix', description: 'Focus and calm.', items: 8, imageUrl: 'https://via.placeholder.com/200/FFD700/000000?Text=Playlist+2' },
  { id: 'fp3', title: 'Shizuka\'s Violin Classics', description: 'Elegant melodies.', items: 15, imageUrl: 'https://via.placeholder.com/200/FFC0CB/000000?Text=Playlist+3' },
];

const genres = [
  { name: 'Anime Soundtracks', imageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?Text=Anime', color: 'bg-red-500' },
  { name: 'J-Pop Hits', imageUrl: 'https://via.placeholder.com/150/00FA9A/FFFFFF?Text=J-Pop', color: 'bg-green-400' },
  { name: 'Kids Singalong', imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=Kids', color: 'bg-yellow-400' },
  { name: 'Relaxing Instrumentals', imageUrl: 'https://via.placeholder.com/150/87CEEB/FFFFFF?Text=Relax', color: 'bg-sky-400' },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const [currentSong, setCurrentSong] = useState<any>(initialSong); // Using 'any' for placeholder simplicity

  const handleGenreSelect = (genreName: string) => {
    console.log(`Genre selected: ${genreName}`);
    // Potentially update currentSong or navigate
    setCurrentSong({
      id: `genre-${genreName.toLowerCase()}`,
      title: `${genreName} Mix`,
      artist: "Various Artists",
      albumArtUrl: `https://via.placeholder.com/150/6A5ACD/FFFFFF?Text=${genreName.substring(0,3)}`,
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    });
  };

  const handlePlaylistPlay = (playlistTitle: string) => {
     console.log(`Playing playlist: ${playlistTitle}`);
     setCurrentSong({
      id: `playlist-${playlistTitle.toLowerCase().replace(' ','-')}`,
      title: `First song from ${playlistTitle}`,
      artist: "Playlist Artist",
      albumArtUrl: `https://via.placeholder.com/150/DB7093/FFFFFF?Text=${playlistTitle.substring(0,3)}`,
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar className="shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-28"> {/* pb-28 for MusicPlayerControls height */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
            <p className="text-gray-600">Discover new music, browse genres, or listen to your favorite playlists.</p>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Featured Playlists</h3>
            <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <div className="flex space-x-4 pb-4">
                {featuredPlaylists.map((playlist) => (
                  <Card key={playlist.id} className="w-64 h-auto min-w-[250px] shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden cursor-pointer" onClick={() => handlePlaylistPlay(playlist.title)}>
                    <img src={playlist.imageUrl} alt={playlist.title} className="w-full h-32 object-cover"/>
                    <CardHeader>
                      <CardTitle className="text-lg truncate">{playlist.title}</CardTitle>
                      <CardDescription className="text-sm truncate">{playlist.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-500">{playlist.items} songs</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Browse Genres</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {genres.map((genre) => (
                <GenreCard
                  key={genre.name}
                  genreName={genre.name}
                  imageUrl={genre.imageUrl}
                  color={genre.color}
                  onGenreSelect={handleGenreSelect}
                />
              ))}
            </div>
          </section>
        </main>
        <MusicPlayerControls currentSong={currentSong} className="shadow-top-lg" />
      </div>
    </div>
  );
};

export default HomePage;