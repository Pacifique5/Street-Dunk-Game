import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import Court from '../components/Court';
import Player from '../components/Player';
import Ball from '../components/Ball';
import ScoreBoard from '../components/ScoreBoard';
import GameControls from '../components/GameControls';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameState, setGameState] = useState('ready'); // ready, running, dribbling, dunking, layup
  const [playerPosition, setPlayerPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT * 0.7 });
  const [ballPosition, setBallPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT * 0.65 });
  const [direction, setDirection] = useState('right');
  const [isMoving, setIsMoving] = useState(null);
  const [nearHoop, setNearHoop] = useState(null); // 'left', 'right', or null
  
  const moveIntervalRef = useRef(null);
  const playerPositionRef = useRef(playerPosition);

  // Update position ref when position changes
  useEffect(() => {
    playerPositionRef.current = playerPosition;
  }, [playerPosition]);

  // Check if player is near a hoop
  useEffect(() => {
    const leftHoopX = 83;
    const rightHoopX = SCREEN_WIDTH - 83;
    const hoopRange = 60;

    if (Math.abs(playerPosition.x - leftHoopX) < hoopRange) {
      setNearHoop('left');
    } else if (Math.abs(playerPosition.x - rightHoopX) < hoopRange) {
      setNearHoop('right');
    } else {
      setNearHoop(null);
    }
  }, [playerPosition]);

  const handleMoveLeft = () => {
    if (gameState !== 'ready' && gameState !== 'running' && gameState !== 'dribbling') return;
    
    setDirection('left');
    setIsMoving('left');
    
    if (gameState === 'ready') {
      setGameState('running');
    }

    moveIntervalRef.current = setInterval(() => {
      setPlayerPosition(prev => {
        const newX = Math.max(60, prev.x - 8);
        const newBallX = gameState === 'dribbling' ? newX : ballPosition.x;
        setBallPosition(prevBall => ({ ...prevBall, x: newBallX }));
        return { ...prev, x: newX };
      });
    }, 50);
  };

  const handleMoveRight = () => {
    if (gameState !== 'ready' && gameState !== 'running' && gameState !== 'dribbling') return;
    
    setDirection('right');
    setIsMoving('right');
    
    if (gameState === 'ready') {
      setGameState('running');
    }

    moveIntervalRef.current = setInterval(() => {
      setPlayerPosition(prev => {
        const newX = Math.min(SCREEN_WIDTH - 60, prev.x + 8);
        const newBallX = gameState === 'dribbling' ? newX : ballPosition.x;
        setBallPosition(prevBall => ({ ...prevBall, x: newBallX }));
        return { ...prev, x: newX };
      });
    }, 50);
  };

  const stopMovement = () => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
    setIsMoving(null);
    if (gameState === 'running') {
      setGameState('ready');
    }
  };

  // Stop movement when touch ends
  useEffect(() => {
    const handleTouchEnd = () => {
      stopMovement();
    };

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, []);

  const handleDribble = () => {
    if (gameState === 'ready' || gameState === 'running') {
      setGameState('dribbling');
      // Update ball position to follow player
      setBallPosition({ x: playerPosition.x, y: playerPosition.y - 5 });
      
      setTimeout(() => {
        if (gameState === 'dribbling') {
          setCombo(prev => prev + 0.5);
          setGameState('ready');
        }
      }, 2000);
    } else if (gameState === 'dribbling') {
      setGameState('ready');
    }
  };

  const handleDunk = () => {
    if (gameState === 'ready' && nearHoop) {
      setGameState('dunking');
      
      // Move ball to hoop position
      const hoopX = nearHoop === 'left' ? 83 : SCREEN_WIDTH - 83;
      setBallPosition({ x: hoopX, y: SCREEN_HEIGHT * 0.47 });
      
      setTimeout(() => {
        const dunkPoints = 300 * (combo + 1);
        setScore(prev => prev + dunkPoints);
        setCombo(prev => prev + 2);
        setGameState('ready');
        
        // Reset ball position
        setBallPosition({ x: playerPosition.x, y: playerPosition.y - 5 });
      }, 1600);
    }
  };

  const handleLayup = () => {
    if (gameState === 'ready' && nearHoop) {
      setGameState('layup');
      
      // Move ball to hoop position
      const hoopX = nearHoop === 'left' ? 83 : SCREEN_WIDTH - 83;
      setBallPosition({ x: hoopX, y: SCREEN_HEIGHT * 0.47 });
      
      setTimeout(() => {
        const layupPoints = 150 * (combo + 1);
        setScore(prev => prev + layupPoints);
        setCombo(prev => prev + 1);
        setGameState('ready');
        
        // Reset ball position
        setBallPosition({ x: playerPosition.x, y: playerPosition.y - 5 });
      }, 1000);
    }
  };

  // Reset combo after inactivity
  useEffect(() => {
    let comboTimer;
    if (gameState === 'ready' && combo > 0) {
      comboTimer = setTimeout(() => {
        setCombo(0);
      }, 8000);
    }
    return () => clearTimeout(comboTimer);
  }, [gameState, combo]);

  return (
    <View style={styles.container}>
      <Court />
      <Player 
        position={playerPosition}
        gameState={gameState}
        direction={direction}
      />
      <Ball 
        position={ballPosition}
        gameState={gameState}
      />
      <ScoreBoard 
        score={score}
        combo={Math.floor(combo)}
      />
      <GameControls 
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onDunk={handleDunk}
        onLayup={handleLayup}
        onDribble={handleDribble}
        gameState={gameState}
        isMoving={isMoving}
      />
      
      {/* Hoop indicator */}
      {nearHoop && (
        <View style={[
          styles.hoopIndicator,
          { 
            left: nearHoop === 'left' ? 50 : SCREEN_WIDTH - 100,
            top: SCREEN_HEIGHT * 0.3 
          }
        ]}>
          <View style={styles.hoopIndicatorText}>
            <Text style={styles.hoopText}>🏀 SHOOT!</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  hoopIndicator: {
    position: 'absolute',
    zIndex: 4,
  },
  hoopIndicatorText: {
    backgroundColor: 'rgba(231, 76, 60, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
  hoopText: {
    color: '#ecf0f1',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;