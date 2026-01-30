import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreBoard = ({ score, combo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>SCORE</Text>
        <Text style={styles.scoreValue}>{score.toLocaleString()}</Text>
      </View>
      
      {combo > 0 && (
        <View style={styles.comboContainer}>
          <Text style={styles.comboLabel}>COMBO</Text>
          <Text style={styles.comboValue}>x{combo}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  scoreContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#ecf0f1',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreValue: {
    color: '#f39c12',
    fontSize: 24,
    fontWeight: 'bold',
  },
  comboContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  comboLabel: {
    color: '#ecf0f1',
    fontSize: 12,
    fontWeight: 'bold',
  },
  comboValue: {
    color: '#ecf0f1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ScoreBoard;