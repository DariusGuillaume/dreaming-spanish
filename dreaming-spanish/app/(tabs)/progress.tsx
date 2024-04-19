import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from "react-native";
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

  const handleGoalChange = () => {
    const goal = selectedGoal > 0 ? selectedGoal : parseInt(customGoal);

    if (isNaN(goal) || goal <= 0) {
      Alert.alert("Error", "Please select a goal or enter a valid custom goal.");
      return;
    }
    if (goal > 1440) {
      Alert.alert("Error", "The goal cannot exceed the number of minutes in a day (1440 minutes).");
      return;
    }
    onGoalChange(goal);
    onClose();
  };

  const handleClose = () => {
    setSelectedGoal(0);
    setCustomGoal("");
    onClose();
  };

  return (
    <View style={styles.goalMenu}>
      <TouchableOpacity style={styles.backButton} onPress={handleClose}>
        <Feather name="arrow-left" size={24} color="#999" />
      </TouchableOpacity>
      <View style={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.black }]}>Select a goal</Text>
          <TouchableOpacity
            style={[styles.goalOption, selectedGoal === 15 && styles.selectedGoalOption]}
            onPress={() => setSelectedGoal(15)}
          >
            <View style={[styles.selector, selectedGoal === 15 && styles.selectedSelector]} />
            <View style={styles.goalOptionTextContainer}>
              <Text style={styles.goalOptionTitle}>Casual</Text>
              <Text style={styles.goalOptionSubtitle}>Keeping your skills fresh</Text>
            </View>
            <Text style={styles.goalOptionValue}>15 min/day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.goalOption, selectedGoal === 30 && styles.selectedGoalOption]}
            onPress={() => setSelectedGoal(30)}
          >
            <View style={[styles.selector, selectedGoal === 30 && styles.selectedSelector]} />
            <View style={styles.goalOptionTextContainer}>
              <Text style={styles.goalOptionTitle}>Learner</Text>
              <Text style={styles.goalOptionSubtitle}>Making progress every day</Text>
            </View>
            <Text style={styles.goalOptionValue}>30 min/day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.goalOption, selectedGoal === 60 && styles.selectedGoalOption]}
            onPress={() => setSelectedGoal(60)}
          >
            <View style={[styles.selector, selectedGoal === 60 && styles.selectedSelector]} />
            <View style={styles.goalOptionTextContainer}>
              <Text style={styles.goalOptionTitle}>Serious</Text>
              <Text style={styles.goalOptionSubtitle}>Making progress very quickly</Text>
            </View>
            <Text style={styles.goalOptionValue}>60 min/day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.goalOption, selectedGoal === -1 && styles.selectedGoalOption]}
            onPress={() => setSelectedGoal(-1)}
          >
            <View style={[styles.selector, selectedGoal === -1 && styles.selectedSelector]} />
            <View style={styles.goalOptionTextContainer}>
              <Text style={styles.goalOptionTitle}>Choose your own goal</Text>
              <Text style={styles.goalOptionSubtitle}>Write your goal in minutes</Text>
              <View style={styles.customGoalContainer}>
                <TextInput
                  style={styles.customGoalInput}
                  value={customGoal}
                  onChangeText={setCustomGoal}
                  keyboardType="numeric"
                  placeholder="Enter goal"
                />
                <Text style={styles.customGoalUnit}>min/day</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.setGoalButton}
          onPress={handleGoalChange}
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

  const handleLearnMorePress = () => {
    Alert.alert(
      'Leave App',
      'Do you want to leave the app and learn more about our method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => Linking.openURL('https://www.dreamingspanish.com/method'),
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <ScrollView style={styles.container}>
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
          <View style={styles.progressBarContainer}>
            {[...Array(7)].map((_, index) => {
              const level = index + 1;
              return (
                <View key={level} style={[styles.progressBarLevel, { height: `${(100 / 7) * level}%` }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: currentLevel >= level ? colors.primary : "#E0E0E0" }]} />
                  <Text style={styles.progressBarLevelLabel}>Level {level}</Text>
                </View>
              );
            })}
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

      <TouchableOpacity style={styles.learnMoreButton} onPress={handleLearnMorePress}>
  <Text style={styles.learnMoreButtonText}>Learn more about our method</Text>
</TouchableOpacity>
      <GoalMenu visible={isMenuVisible} onClose={toggleMenu} onGoalChange={handleGoalChange} />
    </ScrollView>
  );
};

export default Page;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 0,
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
    paddingHorizontal: 24,
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
    marginBottom: 24,
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
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 24,
  },
  goalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  goalOptionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  goalOptionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  goalOptionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  goalOptionValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customGoalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  customGoalInput: {
    height: 40,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    flex: 1,
  },
  customGoalUnit: {
    fontSize: 16,
    fontWeight: "bold",
  },
  setGoalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 24,
  },
  setGoalButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    padding: 8,
    zIndex: 1,
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
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  progressBarLevel: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  progressBarFill: {
  width: "100%",
  backgroundColor: "#E0E0E0",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  height: "100%",
  },
  progressBarLevelLabel: {
  fontSize: 12,
  fontWeight: "500",
  marginTop: 4,
  position: "absolute",
  bottom: -20,
  },
  });