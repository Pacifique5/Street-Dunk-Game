import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GameControls = ({ onMoveLeft, onMoveRight, onDunk, onLayup, onDribble, gameState, isMoving, stopMovement }) => {
  return (
    <View style={styles.container}>
      {/* Movement Controls */}
      <View style={styles.movementRow}>
        <TouchableOpacity 
          style={[
            styles.moveButton,
            styles.leftButton,
            isMoving === 'left' && styles.activeButton
          ]}
          onPressIn={onMoveLeft}
          onPressOut={stopMovement}
        >
          <Text style={styles.moveButtonText}>⬅️</Text>
        </TouchableOpacity>
        
        <View style={styles.centerControls}>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              styles.dribbleButton,
              gameState === 'dribbling' && styles.activeButton
            ]}
            onPress={onDribble}
            disabled={gameState === 'dunking' || gameState === 'layup'}
          >
            <Text style={styles.actionButtonText}>
              {gameState === 'dribbling' ? '🏀' : 'DRIBBLE'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.moveButton,
            styles.rightButton,
            isMoving === 'right' && styles.activeButton
          ]}
          onPressIn={onMoveRight}
          onPressOut={stopMovement}
        >
          <Text style={styles.moveButtonText}>➡️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Action Controls */}
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[
            styles.actionButton,
            styles.layupButton,
            gameState === 'layup' && styles.activeButton
          ]}
          onPress={onLayup}
          disabled={gameState !== 'ready'}
        >
          <Text style={styles.actionButtonText}>
            {gameState === 'layup' ? 'LAYUP!' : 'LAYUP'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.dunkButton,
            gameState === 'dunking' && styles.dunkButtonActive
          ]}
          onPress={onDunk}
          disabled={gameState !== 'ready'}
        >
          <Text style={styles.dunkButtonText}>
            {gameState === 'dunking' ? '🔥 SLAM! 🔥' : '💥 DUNK 💥'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Move with ⬅️➡️ • Dribble to the hoop • DUNK or LAYUP to score!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  movementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  centerControls: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  moveButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  leftButton: {
    backgroundColor: '#9b59b6',
  },
  rightButton: {
    backgroundColor: '#9b59b6',
  },
  actionButton: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dribbleButton: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  layupButton: {
    backgroundColor: '#3498db',
  },
  dunkButton: {
    backgroundColor: '#e74c3c',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#27ae60',
    transform: [{ scale: 1.1 }],
  },
  dunkButtonActive: {
    backgroundColor: '#c0392b',
    transform: [{ scale: 1.05 }],
  },
  moveButtonText: {
    fontSize: 24,
  },
  actionButtonText: {
    color: '#ecf0f1',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dunkButtonText: {
    color: '#ecf0f1',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  instructionText: {
    color: '#ecf0f1',
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default GameControls;