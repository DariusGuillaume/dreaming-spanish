import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  viewedAt: Date;
}

const LibraryPage = () => {
  const [watchLaterVideos, setWatchLaterVideos] = useState<Video[]>([]);
  const [historyVideos, setHistoryVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchWatchLaterVideos = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet',
              maxResults: 10,
              playlistId: 'YOUR_WATCH_LATER_PLAYLIST_ID',
              key: 'YOUR_API_KEY',
            },
          }
        );

        const fetchedVideos: Video[] = response.data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          viewedAt: new Date(),
        }));

        setWatchLaterVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching watch later videos:', error);
      }
    };

    const fetchHistoryVideos = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet',
              maxResults: 10,
              playlistId: 'YOUR_HISTORY_PLAYLIST_ID',
              key: 'YOUR_API_KEY',
            },
          }
        );

        const fetchedVideos: Video[] = response.data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          viewedAt: new Date(),
        }));

        setHistoryVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching history videos:', error);
      }
    };

    fetchWatchLaterVideos();
    fetchHistoryVideos();
  }, []);

  const SECTIONS = [
    {
      title: 'Watch Later',
      horizontal: true,
      data: watchLaterVideos,
    },
    {
      title: 'History',
      horizontal: true,
      data: historyVideos,
    },
  ];

  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity style={styles.videoItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Library</Text>
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        stickySectionHeadersEnabled={false}
        sections={SECTIONS}
        renderSectionHeader={({ section }) => (
          <>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.horizontal ? (
              <FlatList
                horizontal
                data={section.data}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
              />
            ) : null}
          </>
        )}
        renderItem={({ item, section }) => {
          if (section.horizontal) {
            return null;
          }
          return renderVideoItem({ item });
        }}
      />
    </SafeAreaView>
  );
};

export default LibraryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoItem: {
    margin: 10,
  },
  thumbnail: {
    width: 200,
    height: 120,
    marginBottom: 5,
  },
  videoTitle: {
    fontSize: 14,
  },
});