import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameControls = ({ onMoveLeft, onMoveRight, onDunk, onLayup, onDribble, onShoot, gameState, isMoving, stopMovement, nearHoop }) => {
  return (
    <View style={styles.container}>
      {/* Top control bar like reference */}
      <View style={styles.topControlBar}>
        {/* Left movement */}
        <TouchableOpacity 
          style={[
            styles.moveButton,
            styles.leftButton,
            isMoving === 'left' && styles.activeButton
          ]}
          onPressIn={onMoveLeft}
          onPressOut={stopMovement}
        >
          <Text style={styles.moveButtonText}>⬅</Text>
          <Text style={styles.moveLabel}>STREET</Text>
        </TouchableOpacity>
        
        {/* Center dribble */}
        <TouchableOpacity 
          style={[
            styles.dribbleButton,
            gameState === 'dribbling' && styles.dribbleActive
          ]}
          onPress={onDribble}
          disabled={gameState === 'dunking' || gameState === 'layup' || gameState === 'shooting'}
        >
          <Text style={styles.dribbleText}>
            {gameState === 'dribbling' ? '🏀' : 'DRIBBLE'}
          </Text>
        </TouchableOpacity>
        
        {/* Right movement */}
        <TouchableOpacity 
          style={[
            styles.moveButton,
            styles.rightButton,
            isMoving === 'right' && styles.activeButton
          ]}
          onPressIn={onMoveRight}
          onPressOut={stopMovement}
        >
          <Text style={styles.moveButtonText}>➡</Text>
          <Text style={styles.moveLabel}>BALL</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main action button like reference */}
      <View style={styles.actionContainer}>
        {nearHoop ? (
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[
                styles.actionButton,
                styles.layupButton,
                gameState === 'layup' && styles.actionActive
              ]}
              onPress={onLayup}
              disabled={gameState !== 'ready' && gameState !== 'dribbling'}
            >
              <Text style={styles.actionButtonText}>LAYUP</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.actionButton,
                styles.dunkButton,
                gameState === 'dunking' && styles.actionActive
              ]}
              onPress={onDunk}
              disabled={gameState !== 'ready' && gameState !== 'dribbling'}
            >
              <Text style={styles.actionButtonText}>DUNK</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={[
              styles.shootButton,
              gameState === 'shooting' && styles.shootActive
            ]}
            onPress={onShoot}
            disabled={gameState !== 'ready' && gameState !== 'dribbling'}
          >
            <Text style={styles.shootButtonText}>
              {gameState === 'shooting' ? '🏀 SHOOTING! 🏀' : '🎯 SHOOT 🎯'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Instruction text like reference */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          {nearHoop 
            ? "Move with ⬅️➡️ • Near hoop: DUNK or LAYUP to score!" 
            : "Move with ⬅️➡️ • Away from hoop: SHOOT for points!"
          }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    paddingBottom: 20,
  },
  topControlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(52, 73, 94, 0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  moveButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  leftButton: {
    backgroundColor: '#9B59B6',
  },
  rightButton: {
    backgroundColor: '#9B59B6',
  },
  dribbleButton: {
    backgroundColor: '#F39C12',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  activeButton: {
    backgroundColor: '#27AE60',
    transform: [{ scale: 1.1 }],
  },
  dribbleActive: {
    backgroundColor: '#E67E22',
    transform: [{ scale: 1.05 }],
  },
  moveButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  moveLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
  dribbleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  layupButton: {
    backgroundColor: '#3498DB',
  },
  dunkButton: {
    backgroundColor: '#E74C3C',
  },
  shootButton: {
    backgroundColor: '#8E44AD',
    paddingVertical: 20,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  actionActive: {
    transform: [{ scale: 1.05 }],
  },
  shootActive: {
    backgroundColor: '#6C3483',
    transform: [{ scale: 1.02 }],
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shootButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default GameControls;