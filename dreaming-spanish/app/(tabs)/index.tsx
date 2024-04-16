import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Page = () => {
  const minutesWatched = 20; // Replace with actual minutes watched
  const maxDailyGoal = 60; // Replace with actual maximum daily goal

  const progressPercentage = (minutesWatched / maxDailyGoal) * 100;

  return (
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
          <View style={styles.progressContainer}>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>
                Watched: <Text style={styles.boldText}>{minutesWatched} min</Text>
              </Text>
              <Text style={styles.progressText}>
                Daily goal: <Text style={styles.boldText}>{maxDailyGoal} min</Text>
              </Text>
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
        ),
      }}
    />
  );
};

export default Page;

const styles = StyleSheet.create({
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
  progressContainer: {
    marginRight: 20,
    marginTop: 10,
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
});