import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import ProgressCircle from "../ProgressCircle";
import { Feather } from '@expo/vector-icons';

const colors = {
  primary: '#FF7F36',
  bg: '#F4F4F4',
  black: '#27283a',
  white: '#FFFFFF',
};

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
    if (goal === 0) {
      Alert.alert("Error", "Please add a valid goal above 0.");
      return;
    }
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
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.black }]}>Select a goal</Text>
        <View style={styles.sectionBody}>
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
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.black }]}>Custom goal</Text>
        <View style={styles.sectionBody}>
          <TextInput
            style={styles.goalInput}
            value={customGoal}
            onChangeText={setCustomGoal}
            keyboardType="numeric"
            placeholder="Enter your goal in minutes"
          />
          <TouchableOpacity
            style={styles.setGoalButton}
            onPress={() => handleGoalChange(parseInt(customGoal))}
          >
            <Text style={styles.setGoalButtonText}>Set Goal</Text>
          </TouchableOpacity>
        </View>
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
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.black }]}>Progress</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.black }]}>Daily goal</Text>
        <View style={styles.sectionBody}>
          <ProgressCircle
            current={12}
            total={dailyGoal}
            size={150}
            strokeWidth={15}
            color={colors.primary}
            icon="flag"
          />
          <Text style={styles.goalText}>12/{dailyGoal} min</Text>
          <TouchableOpacity style={styles.changeButton} onPress={toggleMenu}>
            <Text style={styles.changeButtonText}>Change Goal</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.black }]}>Overall progression</Text>
        <View style={styles.sectionBody}>
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
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.black }]}>Outside hours</Text>
        <View style={styles.sectionBody}>
          <Text style={styles.outsideHoursText}>{outsideHours} hours outside the platform</Text>
          <TouchableOpacity style={styles.outsideHoursButton}>
            <Text style={styles.outsideHoursButtonText}>View hours outside the platform</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outsideHoursButton}>
            <Text style={styles.outsideHoursButtonText}>Add hours outside the platform</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.black }]}>Your activity</Text>
        <View style={styles.sectionBody}>
          <Text style={styles.activityText}>Current streak: {currentStreak}</Text>
          <Text style={styles.activityText}>
            Reach a max streak of 7 by practicing every day.
          </Text>
          <Text style={styles.activityText}>
            {currentStreak}/7
          </Text>
          <Text style={styles.activityText}>Weeks in a row: {weeksInARow}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.black }]}>Statistics</Text>
        <View style={styles.sectionBody}>
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
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: colors.bg,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 6,
  },
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    alignItems: "center",
    paddingVertical: 16,
  },
  goalText: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 5,
  },
  changeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  changeButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  levelText: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 5,
  },
  levelValue: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 10,
    width: "80%",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
  },
  outsideHoursText: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 10,
  },
  outsideHoursButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  outsideHoursButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  activityText: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 5,
  },
  statisticText: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 5,
  },
  learnMoreButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 24,
  },
  learnMoreButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  goalMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    padding: 24,
  },
  goalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  goalOptionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 12,
  },
  goalOptionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
  goalOptionValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  goalInput: {
    height: 40,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: "100%",
  },
  setGoalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
  },
  setGoalButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#999",
  },
  selector: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  selectedSelector: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectedGoalOption: {
    backgroundColor: "#f0f0f0",
  },
});