import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  viewedAt: Date;
}

const LibraryPage = () => {
  const videos: Video[] = [
    { id: "1", title: "Video 1", thumbnail: "https://example.com/thumbnail1.jpg", viewedAt: new Date("2023-06-01") },
    { id: "2", title: "Video 2", thumbnail: "https://example.com/thumbnail2.jpg", viewedAt: new Date("2023-06-02") },
    { id: "3", title: "Video 3", thumbnail: "https://example.com/thumbnail3.jpg", viewedAt: new Date("2023-06-03") },
    { id: "4", title: "Video 4", thumbnail: "https://example.com/thumbnail4.jpg", viewedAt: new Date() },
    { id: "5", title: "Video 5", thumbnail: "https://example.com/thumbnail5.jpg", viewedAt: new Date() },
    { id: "6", title: "Video 6", thumbnail: "https://example.com/thumbnail6.jpg", viewedAt: new Date() },
    { id: "7", title: "Video 7", thumbnail: "https://example.com/thumbnail7.jpg", viewedAt: new Date() },
    { id: "8", title: "Video 8", thumbnail: "https://example.com/thumbnail8.jpg", viewedAt: new Date() },
  ];

  // Sort videos based on viewedAt date in descending order
  const sortedVideos = videos.sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime());

  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity style={styles.videoItem}>
      <View style={styles.thumbnailContainer}>
        {/* thumbnail */}
        <View style={styles.thumbnail} />
      </View>
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Library</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History</Text>
        <FlatList
          data={sortedVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.videoSlider}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Watch Later</Text>
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.videoSlider}
        />
      </View>
    </View>
  );
};

export default LibraryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  videoSlider: {
    paddingVertical: 10,
  },
  videoItem: {
    width: width * 0.4, 
    marginRight: 10,
  },
  thumbnailContainer: {
    width: "100%", 
    height: 120,
    marginBottom: 5,
  },
  thumbnail: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  videoTitle: {
    fontSize: 14,
  },
});