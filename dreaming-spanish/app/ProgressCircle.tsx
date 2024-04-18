import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Ionicons } from '@expo/vector-icons';

type IconName = 'flag' | 'star' | 'heart' | 'home' | 'key' | 'push' | 'map' | 'filter' | 'at' | 'scale' | 'link' | 'search' | 'image' | 'text' | 'alert' | 'checkbox' | 'menu' | 'radio' | 'timer' | 'close' | 'book' | 'pause' | 'mail';

interface ProgressCircleProps {
  current: number;
  total: number;
  size: number;
  strokeWidth: number;
  color: string;
  icon: IconName;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  current,
  total,
  size,
  strokeWidth,
  color,
  icon,
}) => {
  const progress = (current / total) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E0E0E0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>{current}/{total} min</Text>
        <Ionicons name={icon} size={24} color={color} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    marginTop: 8,
  },
});

export default ProgressCircle;