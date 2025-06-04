import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import ContentHeader from '@/components/ContentHeader';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls from '@/components/MusicPlayerControls';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Radio } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Placeholder data
const artistsData: { [key: string]: any } = {
  'mao': {
    id: 'mao',
    name: 'MAO',
    imageUrl: 'https://via.placeholder.com/300/FF1493/FFFFFF?Text=MAO',
    type: 'Artist',
    bio: 'MAO is a popular Japanese singer known for her work on anime theme songs, including "Yume wo Kanaete Doraemon".',
    topTracks: [
      { id: 's1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', albumArtUrl: 'https://via.placeholder.com/40/FF1493/FFFFFF?Text=DSong', duration: "3:45" },
      { id: 's6', title: 'Another Hit Song', artist: 'MAO', albumArtUrl: 'https://via.placeholder.com/40/FF1493/FFFFFF?Text=AHS', duration: "4:02" },
    ],
    albums: [
      { id: 'album1', title: 'Doraemon Themes', imageUrl: 'https://via.placeholder.com/150/007BFF/FFFFFF?Text=DT', artist: 'MAO' },
      { id: 'album2', title: 'J-Pop Collection', imageUrl: 'https://via.placeholder.com/150/32CD32/FFFFFF?Text=JPop', artist: 'MAO' },
    ]
  },
  'motohiro-hata': {
    id: 'motohiro-hata',
    name: 'Motohiro Hata',
    imageUrl: 'https://via.placeholder.com/300/8A2BE2/FFFFFF?Text=Hata',
    type: 'Artist',
    bio: 'Motohiro Hata is a Japanese singer-songwriter known for his heartfelt ballads and acoustic performances, including "Himawari no Yakusoku".',
    topTracks: [
      { id: 's2', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', albumArtUrl: 'https://via.placeholder.com/40/8A2BE2/FFFFFF?Text=StdByMe', duration: "4:12" },
      { id: 's7', title: 'Uroko', artist: 'Motohiro Hata', albumArtUrl: 'https://via.placeholder.com/40/8A2BE2/FFFFFF?Text=Uroko', duration: "3:55" },
    ],
    albums: [
      { id: 'album3', title: 'Signed POP', imageUrl: 'https://via.placeholder.com/150/FFD700/000000?Text=SignedPOP', artist: 'Motohiro Hata' },
      { id: 'album4', title: 'Contrast', imageUrl: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?Text=Contrast', artist: 'Motohiro Hata' },
    ]
  }
};

const ArtistDetailPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artistDetails, setArtistDetails] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  useEffect(() => {
    console.log('ArtistDetailPage loaded for artistId:', artistId);
    if (artistId && artistsData[artistId]) {
      setArtistDetails(artistsData[artistId]);
    } else {
      console.error("Artist not found for ID:", artistId);
    }
  }, [artistId]);

  const playSong = (song: any) => {
     const songToPlay = {
        ...song,
        albumArtUrl: song.albumArtUrl || artistDetails?.imageUrl, // Fallback to artist image
        audioSrc: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.ceil(Math.random()*5)}.mp3`
    };
    setCurrentSong(songToPlay);
    setPlayingSongId(song.id);
    console.log("Playing song:", song.title);
  };

  if (!artistDetails) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <Sidebar className="shadow-lg" />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-xl text-gray-600">Loading artist details or artist not found...</p>
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
            title={artistDetails.name}
            subtitle={artistDetails.bio.substring(0,100) + "..."} // Short bio
            imageUrl={artistDetails.imageUrl}
            type={artistDetails.type}
            itemCount={artistDetails.topTracks.length} // e.g. top tracks count
            onPlayAll={() => artistDetails.topTracks.length > 0 && playSong(artistDetails.topTracks[0])}
            onShufflePlay={() => console.log("Shuffle play artist:", artistDetails.name)}
            className="rounded-b-xl"
          />
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-2.5">
                    <UserPlus className="mr-2 h-5 w-5" /> Follow
                </Button>
                <Button variant="outline" className="rounded-full px-5 py-2.5">
                    <Radio className="mr-2 h-5 w-5" /> Start Radio
                </Button>
            </div>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Top Tracks</h3>
              <div className="space-y-1 bg-white p-4 rounded-lg shadow">
                {artistDetails.topTracks.map((song: any, index: number) => (
                  <SongListItem
                    key={song.id}
                    songTitle={`${index + 1}. ${song.title}`}
                    artistName={artistDetails.name}
                    albumArtUrl={song.albumArtUrl}
                    duration={song.duration}
                    isPlaying={playingSongId === song.id}
                    onPlayClick={() => playSong(song)}
                    className="hover:bg-blue-50 even:bg-gray-50/50 rounded-md"
                  />
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Albums</h3>
              <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <div className="flex space-x-4 pb-4">
                    {artistDetails.albums.map((album: any) => (
                    <Card key={album.id} className="w-48 min-w-[180px] shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden cursor-pointer" onClick={() => console.log(`Navigate to album: /album/${album.id}`)}>
                        <img src={album.imageUrl} alt={album.title} className="w-full h-32 object-cover"/>
                        <CardHeader className="p-2">
                        <CardTitle className="text-sm font-medium truncate">{album.title}</CardTitle>
                        <CardDescription className="text-xs truncate">{artistDetails.name}</CardDescription>
                        </CardHeader>
                    </Card>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>
          </div>
        </main>
        <MusicPlayerControls currentSong={currentSong} className="shadow-top-lg" />
      </div>
    </div>
  );
};

export default ArtistDetailPage;