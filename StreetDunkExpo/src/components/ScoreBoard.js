import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ScoreBoard = ({ score, combo }) => {
  return (
    <View style={styles.container}>
      {/* Main scoreboard like reference image */}
      <View style={styles.scoreBoard}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </View>
      
      {/* Combo indicator */}
      {combo > 0 && (
        <View style={styles.comboContainer}>
          <Text style={styles.comboText}>COMBO x{combo}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.3,
    right: SCREEN_WIDTH * 0.3,
    zIndex: 5,
    alignItems: 'center',
  },
  scoreBoard: {
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#F39C12',
    paddingHorizontal: 30,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#ECF0F1',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  scoreValue: {
    color: '#F39C12',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  comboContainer: {
    backgroundColor: '#E74C3C',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#C0392B',
  },
  comboText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ScoreBoard;