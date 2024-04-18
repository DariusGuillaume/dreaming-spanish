import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import ProgressCircle from "../ProgressCircle";

interface GoalMenuProps {
  visible: boolean;
  onClose: () => void;
  onGoalChange: (goal: number) => void;
}

const GoalMenu: React.FC<GoalMenuProps> = ({ visible, onClose, onGoalChange }) => {
  const [customGoal, setCustomGoal] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(0);

  if (!visible) return null;

  const handleGoalChange = (goal: number) => {
    if (goal > 1440) {
      Alert.alert("Error", "The goal cannot exceed the number of minutes in a day (1440 minutes).");
      return;
    }
    setSelectedGoal(goal);
    onGoalChange(goal);
    onClose();
  };

  return (
    <View style={styles.goalMenu}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.goalOption, selectedGoal === 15 && styles.selectedGoalOption]}
        onPress={() => handleGoalChange(15)}
      >
        <View style={[styles.selector, selectedGoal === 15 && styles.selectedSelector]} />
        <Text style={styles.goalOptionTitle}>Casual</Text>
        <Text style={styles.goalOptionSubtitle}>Keeping your skills fresh</Text>
        <Text style={styles.goalOptionValue}>15 min/day</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.goalOption, selectedGoal === 30 && styles.selectedGoalOption]}
        onPress={() => handleGoalChange(30)}
      >
        <View style={[styles.selector, selectedGoal === 30 && styles.selectedSelector]} />
        <Text style={styles.goalOptionTitle}>Learner</Text>
        <Text style={styles.goalOptionSubtitle}>Making progress every day</Text>
        <Text style={styles.goalOptionValue}>30 min/day</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.goalOption, selectedGoal === 60 && styles.selectedGoalOption]}
        onPress={() => handleGoalChange(60)}
      >
        <View style={[styles.selector, selectedGoal === 60 && styles.selectedSelector]} />
        <Text style={styles.goalOptionTitle}>Serious</Text>
        <Text style={styles.goalOptionSubtitle}>Making progress very quickly</Text>
        <Text style={styles.goalOptionValue}>60 min/day</Text>
      </TouchableOpacity>
      <View style={styles.goalOption}>
        <Text style={styles.goalOptionTitle}>Choose your own goal!</Text>
        <Text style={styles.goalOptionSubtitle}>Write your goal in minutes</Text>
        <TextInput
          style={styles.goalInput}
          value={customGoal}
          onChangeText={setCustomGoal}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.setGoalButton}
          onPress={() => handleGoalChange(parseInt(customGoal))}
        >
          <Text style={styles.setGoalButtonText}>Set Goal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Page = () => {
  const [dailyGoal, setDailyGoal] = useState(60);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const currentLevel = 1;
  const totalInputTime = 8;
  const hoursToNextLevel = 42;
  const outsideHours = 0;
  const currentStreak = 1;
  const weeksInARow = 2;
  const hoursWatched = 7;
  const videosWatched = 82;
  const daysPracticed = 19;

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleGoalChange = (goal: number) => {
    setDailyGoal(goal);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Progress</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily goal</Text>
        <ProgressCircle
          current={12}
          total={dailyGoal}
          size={150}
          strokeWidth={15}
          color="#FF6400"
          icon="flag"
        />
        <Text style={styles.goalText}>12/{dailyGoal} min</Text>
        <TouchableOpacity style={styles.changeButton} onPress={toggleMenu}>
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

      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.learnMoreButtonText}>Learn more about our method</Text>
      </TouchableOpacity>

      <GoalMenu visible={isMenuVisible} onClose={toggleMenu} onGoalChange={handleGoalChange} />
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
  goalMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 20,
  },
  goalOption: {
    marginBottom: 20,
  },
  goalOptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  goalOptionSubtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  goalOptionValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  goalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  setGoalButton: {
    backgroundColor: "#FF6400",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  setGoalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  selector: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
  },
  selectedSelector: {
    backgroundColor: "orange",
  },
  selectedGoalOption: {
    backgroundColor: "lightgray",
  },
});