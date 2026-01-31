import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ScoreBoard = ({ score, combo }) => {
  // Format score to look like timer display (0:0 format)
  const formatScore = (score) => {
    const minutes = Math.floor(score / 100);
    const seconds = score % 100;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Digital scoreboard like reference */}
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>{formatScore(score)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.02,
    left: SCREEN_WIDTH * 0.4,
    right: SCREEN_WIDTH * 0.4,
    zIndex: 5,
    alignItems: 'center',
  },
  scoreBoard: {
    backgroundColor: '#2E4A8B',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#1A2E5B',
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreText: {
    color: '#00FF00',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});

export default ScoreBoard;