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
          <View style={styles.comboBar}>
            <View 
              style={[
                styles.comboFill, 
                { width: `${Math.min(combo * 10, 100)}%` }
              ]} 
            />
          </View>
        </View>
      )}
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>🏀</Text>
          <Text style={styles.statValue}>STREET</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>🔥</Text>
          <Text style={styles.statValue}>BALL</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 3,
  },
  scoreContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f39c12',
  },
  scoreLabel: {
    color: '#ecf0f1',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  scoreValue: {
    color: '#f39c12',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  comboContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
  comboLabel: {
    color: '#ecf0f1',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  comboValue: {
    color: '#ecf0f1',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  comboBar: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginTop: 5,
    overflow: 'hidden',
  },
  comboFill: {
    height: '100%',
    backgroundColor: '#f1c40f',
    borderRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: 'rgba(52, 73, 94, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statLabel: {
    fontSize: 16,
    marginBottom: 2,
  },
  statValue: {
    color: '#ecf0f1',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ScoreBoard;