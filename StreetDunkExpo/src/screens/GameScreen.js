import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Court from '../components/Court';
import Player from '../components/Player';
import Ball from '../components/Ball';
import ScoreBoard from '../components/ScoreBoard';
import GameControls from '../components/GameControls';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameState, setGameState] = useState('ready'); // ready, playing, dunking
  const [playerPosition, setPlayerPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT * 0.8 });
  const [ballPosition, setBallPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT * 0.75 });

  const handleDunk = () => {
    if (gameState === 'ready') {
      setGameState('dunking');
      // Trigger dunk animation and scoring
      setTimeout(() => {
        setScore(prev => prev + (100 * (combo + 1)));
        setCombo(prev => prev + 1);
        setGameState('ready');
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Court />
      <Player 
        position={playerPosition}
        gameState={gameState}
      />
      <Ball 
        position={ballPosition}
        gameState={gameState}
      />
      <ScoreBoard 
        score={score}
        combo={combo}
      />
      <GameControls 
        onDunk={handleDunk}
        gameState={gameState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
});

export default GameScreen;