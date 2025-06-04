import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search as SearchIcon } from 'lucide-react';

// Placeholder data
const initialSong = {
  id: 'search-placeholder',
  title: 'Search for a song...',
  artist: 'Your Music App',
  albumArtUrl: 'https://via.placeholder.com/150/4682B4/FFFFFF?Text=Search',
  audioSrc: '',
};

const sampleSongs = [
  { id: 's1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', albumArtUrl: 'https://via.placeholder.com/100/007BFF/FFFFFF?Text=DSong', duration: "3:45", isFavorited: true },
  { id: 's2', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', albumArtUrl: 'https://via.placeholder.com/100/FFD700/000000?Text=StdByMe', duration: "4:12", isFavorited: false },
  { id: 's3', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', albumArtUrl: 'https://via.placeholder.com/100/FF6347/FFFFFF?Text=BokuDora', duration: "2:50", isFavorited: true },
];

const sampleAlbums = [
    { id: 'a1', name: 'Doraemon Movie Themes', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150/1E90FF/FFFFFF?Text=Movie' },
    { id: 'a2', name: 'Anime Hits Collection', artist: 'Various Artists', imageUrl: 'https://via.placeholder.com/150/32CD32/FFFFFF?Text=AnimeHits' },
];

const sampleArtists = [
    { id: 'ar1', name: 'MAO', imageUrl: 'https://via.placeholder.com/150/FF1493/FFFFFF?Text=MAO' },
    { id: 'ar2', name: 'Motohiro Hata', imageUrl: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?Text=Hata' },
];


const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSong, setCurrentSong] = useState<any>(initialSong);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    // Implement actual search logic here
  };

  const playSong = (song: typeof sampleSongs[0]) => {
    setCurrentSong({ ...song, audioSrc: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.ceil(Math.random()*3)}.mp3` }); // Placeholder audio
    setPlayingSongId(song.id);
    console.log("Playing song:", song.title);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar className="shadow-lg" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-28">
          <section className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for songs, artists, albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
              />
            </form>
          </section>

          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="mb-4 bg-blue-100 rounded-lg p-1">
              <TabsTrigger value="songs" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-4 py-1.5">Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-4 py-1.5">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-4 py-1.5">Artists</TabsTrigger>
            </TabsList>

            <TabsContent value="songs">
              <div className="space-y-2">
                {sampleSongs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase())).map((song) => (
                  <SongListItem
                    key={song.id}
                    songTitle={song.title}
                    artistName={song.artist}
                    albumArtUrl={song.albumArtUrl}
                    duration={song.duration}
                    isPlaying={playingSongId === song.id}
                    isFavorited={song.isFavorited}
                    onPlayClick={() => playSong(song)}
                    onFavoriteClick={() => console.log(`Toggled favorite for ${song.title}`)}
                    onMenuClick={() => console.log(`Menu for ${song.title}`)}
                    className="bg-white rounded-lg shadow-sm hover:bg-blue-50"
                  />
                ))}
                 {sampleSongs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && searchTerm && (
                    <p className="text-gray-500 text-center py-4">No songs found for "{searchTerm}".</p>
                 )}
              </div>
            </TabsContent>

            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sampleAlbums.filter(album => album.name.toLowerCase().includes(searchTerm.toLowerCase()) || album.artist.toLowerCase().includes(searchTerm.toLowerCase())).map((album) => (
                  <Card key={album.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => console.log(`View album: ${album.name}`)}>
                    <img src={album.imageUrl} alt={album.name} className="w-full h-32 object-cover"/>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-semibold truncate">{album.name}</CardTitle>
                      <p className="text-xs text-gray-500 truncate">{album.artist}</p>
                    </CardHeader>
                  </Card>
                ))}
                {sampleAlbums.filter(album => album.name.toLowerCase().includes(searchTerm.toLowerCase()) || album.artist.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && searchTerm && (
                    <p className="text-gray-500 text-center py-4 col-span-full">No albums found for "{searchTerm}".</p>
                 )}
              </div>
            </TabsContent>

            <TabsContent value="artists">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {sampleArtists.filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase())).map((artist) => (
                    <Card key={artist.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center" onClick={() => console.log(`View artist: ${artist.name}`)}>
                        <img src={artist.imageUrl} alt={artist.name} className="w-24 h-24 object-cover rounded-full mx-auto mt-3 border-2 border-blue-300"/>
                        <CardContent className="p-3">
                        <CardTitle className="text-sm font-semibold truncate">{artist.name}</CardTitle>
                        </CardContent>
                    </Card>
                    ))}
                     {sampleArtists.filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && searchTerm && (
                        <p className="text-gray-500 text-center py-4 col-span-full">No artists found for "{searchTerm}".</p>
                    )}
                </div>
            </TabsContent>
          </Tabs>
        </main>
        <MusicPlayerControls currentSong={currentSong} className="shadow-top-lg" />
      </div>
    </div>
  );
};

export default SearchPage;