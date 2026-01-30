import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GameControls = ({ onDunk, gameState }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.dunkButton,
          gameState === 'dunking' && styles.dunkButtonDisabled
        ]}
        onPress={onDunk}
        disabled={gameState === 'dunking'}
      >
        <Text style={styles.dunkButtonText}>
          {gameState === 'dunking' ? 'DUNKING!' : 'TAP TO DUNK'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Tap the button to perform epic dunks and build combos!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  dunkButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dunkButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  dunkButtonText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionContainer: {
    marginTop: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  instructionText: {
    color: '#ecf0f1',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default GameControls;