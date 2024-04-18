import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";

const Page = () => {
  const dailyGoal = 60;
  const currentLevel = 1;
  const totalInputTime = 8;
  const hoursToNextLevel = 42;
  const outsideHours = 0;
  const currentStreak = 1;
  const weeksInARow = 2;
  const hoursWatched = 7;
  const videosWatched = 82;
  const daysPracticed = 19;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Progress</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily goal</Text>
        <Text style={styles.goalText}>
          0/{dailyGoal}min
        </Text>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall progression</Text>
        <Text style={styles.levelText}>You are currently in</Text>
        <Text style={styles.levelValue}>Level {currentLevel}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(totalInputTime / 50) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Total input time: {totalInputTime} hrs
        </Text>
        <Text style={styles.progressText}>
          Hours to level {currentLevel + 1}: {hoursToNextLevel} hrs
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Outside hours</Text>
        <Text style={styles.outsideHoursText}>{outsideHours} hours outside the platform</Text>
        <TouchableOpacity style={styles.outsideHoursButton}>
          <Text style={styles.outsideHoursButtonText}>View hours outside the platform</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outsideHoursButton}>
          <Text style={styles.outsideHoursButtonText}>Add hours outside the platform</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your activity</Text>
        <Text style={styles.activityText}>Current streak: {currentStreak}</Text>
        <Text style={styles.activityText}>
          Reach a max streak of 7 by practicing every day.
        </Text>
        <Text style={styles.activityText}>
          {currentStreak}/7
        </Text>
        <Text style={styles.activityText}>Weeks in a row: {weeksInARow}</Text>
      </View>

      {/* Add the calendar component here */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.statisticText}>
          {hoursWatched} hours watched
        </Text>
        <Text style={styles.statisticText}>
          {videosWatched} watched videos
        </Text>
        <Text style={styles.statisticText}>
          {daysPracticed} days you practiced
        </Text>
      </View>

      {/* Add the levels section here */}

      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.learnMoreButtonText}>Learn more about our method</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  changeButton: {
    backgroundColor: "#FF6400",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  changeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  levelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  levelValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6400",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 5,
  },
  outsideHoursText: {
    fontSize: 16,
    marginBottom: 10,
  },
  outsideHoursButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  outsideHoursButtonText: {
    fontSize: 14,
  },
  activityText: {
    fontSize: 16,
    marginBottom: 5,
  },
  statisticText: {
    fontSize: 16,
    marginBottom: 5,
  },
  learnMoreButton: {
    backgroundColor: "#FF6400",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  learnMoreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});