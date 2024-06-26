import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  viewedAt: Date;
}

const Page = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const minutesWatched = 20; // Replace with actual minutes watched
  const maxDailyGoal = 25; // Replace with actual maximum daily goal
  const progressPercentage = (minutesWatched / maxDailyGoal) * 100;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              maxResults: 10,
              channelId: "UCQZlXrjP8_5YlUx0sevTX9w",
              type: "video",
              key: "YOUR_API_KEY",
            },
          }
        );

        const fetchedVideos: Video[] = response.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          viewedAt: new Date(),
        }));

        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity style={styles.videoItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={styles.headerLeft}>
              <Image
                source={require("../../assets/images/home-logo.png")}
                style={styles.logoImage}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.progressWrapper}>
              <View style={styles.progressContainer}>
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>
                    Watched: <Text style={styles.boldText}>{minutesWatched} min</Text>
                  </Text>
                  <View style={styles.dailyGoalContainer}>
                    <Text style={styles.progressText}>
                      Daily goal: <Text style={styles.boldText}>{maxDailyGoal} min</Text>
                    </Text>
                    <TouchableOpacity onPress={() => console.log("Edit daily goal clicked")}>
                      <Ionicons name="pencil" size={16} color="#FF6400" style={styles.pencilIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${progressPercentage}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
          ),
        }}
      >
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.videoList}
        />
      </Stack.Screen>
      <View style={styles.categoriesContainer}>
        <View style={styles.bubbleContainer}>
        <TouchableOpacity style={styles.bubble}>
  <Ionicons name="school" size={20} color="#FF6400" />
  <Text style={styles.bubbleText}>Super Beg.</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.bubble}>
  <Ionicons name="book" size={20} color="#FF6400" />
  <Text style={styles.bubbleText}>Beginner</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.bubble}>
  <Ionicons name="star" size={20} color="#FF6400" />
  <Text style={styles.bubbleText}>Interm.</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.bubble}>
  <Ionicons name="trophy" size={20} color="#FF6400" />
  <Text style={styles.bubbleText}>Advanced</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.optionsBubble}>
  <Ionicons name="options" size={32} color="#000000" />
</TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  progressWrapper: {
    height: 100, // Adjust the height as needed to accommodate the progress text and bar
    justifyContent: 'center',
  },
  progressContainer: {
    marginRight: 40, // Adjust this value to move the progress bar horizontally
    marginTop: 95, // Adjust this value to move the progress bar vertically
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  headerLeft: {
    marginLeft: 20,
    marginTop: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  dailyGoalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pencilIcon: {
    marginLeft: 5,
  },
  progressTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressText: {
    fontSize: 12,
    color: "#27283A",
    marginRight: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  progressBarContainer: {
    alignItems: "center",
  },
  progressBar: {
    width: 300,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6400",
  },
  videoList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  videoItem: {
    marginBottom: 16,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  categoriesContainer: {
    alignItems: 'center',
    marginTop: -350,
  },
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  bubble: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 70,
  },
  bubbleText: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  optionsBubble: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6400',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 50,
  },
});