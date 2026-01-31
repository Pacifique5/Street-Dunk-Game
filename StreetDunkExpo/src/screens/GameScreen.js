import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
import Court from '../components/Court';
import Player from '../components/Player';
import Ball from '../components/Ball';
import ScoreBoard from '../components/ScoreBoard';
import GameControls from '../components/GameControls';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameState, setGameState] = useState('ready'); // ready, running, dribbling, dunking, layup, shooting
  const [playerPosition, setPlayerPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT * 0.75 });
  const [ballPosition, setBallPosition] = useState({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT * 0.7 });
  const [direction, setDirection] = useState('right');
  const [isMoving, setIsMoving] = useState(null);
  const [nearHoop, setNearHoop] = useState(null); // 'left', 'right', or null
  const [lastShotResult, setLastShotResult] = useState(null);
  
  const moveIntervalRef = useRef(null);

  // Check if player is near a hoop (updated positions for new court)
  useEffect(() => {
    const leftHoopX = SCREEN_WIDTH * 0.06;
    const rightHoopX = SCREEN_WIDTH * 0.94;
    const hoopRange = 80;

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
        const newX = Math.max(SCREEN_WIDTH * 0.08, prev.x - 10);
        if (gameState === 'dribbling') {
          setBallPosition(prevBall => ({ ...prevBall, x: newX }));
        }
        return { ...prev, x: newX };
      });
    }, 40);
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
        const newX = Math.min(SCREEN_WIDTH * 0.92, prev.x + 10);
        if (gameState === 'dribbling') {
          setBallPosition(prevBall => ({ ...prevBall, x: newX }));
        }
        return { ...prev, x: newX };
      });
    }, 40);
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

  // Stop movement when component unmounts
  useEffect(() => {
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
      setBallPosition({ x: playerPosition.x, y: playerPosition.y - 15 });
      
      setTimeout(() => {
        setCombo(prev => prev + 0.5);
        if (gameState === 'dribbling') {
          setGameState('ready');
        }
      }, 2500);
    } else if (gameState === 'dribbling') {
      setGameState('ready');
    }
  };

  const handleDunk = () => {
    if ((gameState === 'ready' || gameState === 'dribbling') && nearHoop) {
      setGameState('dunking');
      
      // Move ball to hoop position
      const hoopX = nearHoop === 'left' ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.94;
      setBallPosition({ x: hoopX, y: SCREEN_HEIGHT * 0.25 });
      
      setTimeout(() => {
        const dunkPoints = 400 * (combo + 1);
        setScore(prev => prev + dunkPoints);
        setCombo(prev => prev + 3);
        setGameState('ready');
        setLastShotResult({ type: 'DUNK', points: dunkPoints });
        
        // Reset ball position
        setBallPosition({ x: playerPosition.x, y: playerPosition.y - 15 });
        
        // Clear shot result after delay
        setTimeout(() => setLastShotResult(null), 2000);
      }, 1300);
    }
  };

  const handleLayup = () => {
    if ((gameState === 'ready' || gameState === 'dribbling') && nearHoop) {
      setGameState('layup');
      
      // Move ball to hoop position
      const hoopX = nearHoop === 'left' ? SCREEN_WIDTH * 0.06 : SCREEN_WIDTH * 0.94;
      setBallPosition({ x: hoopX, y: SCREEN_HEIGHT * 0.25 });
      
      setTimeout(() => {
        const layupPoints = 200 * (combo + 1);
        setScore(prev => prev + layupPoints);
        setCombo(prev => prev + 2);
        setGameState('ready');
        setLastShotResult({ type: 'LAYUP', points: layupPoints });
        
        // Reset ball position
        setBallPosition({ x: playerPosition.x, y: playerPosition.y - 15 });
        
        // Clear shot result after delay
        setTimeout(() => setLastShotResult(null), 2000);
      }, 800);
    }
  };

  const handleShoot = () => {
    if ((gameState === 'ready' || gameState === 'dribbling') && !nearHoop) {
      setGameState('shooting');
      
      // Determine closest hoop
      const leftHoopX = SCREEN_WIDTH * 0.06;
      const rightHoopX = SCREEN_WIDTH * 0.94;
      const distanceToLeft = Math.abs(playerPosition.x - leftHoopX);
      const distanceToRight = Math.abs(playerPosition.x - rightHoopX);
      const targetHoop = distanceToLeft < distanceToRight ? 'left' : 'right';
      const hoopX = targetHoop === 'left' ? leftHoopX : rightHoopX;
      
      // Calculate shooting accuracy based on distance and combo
      const distance = Math.min(distanceToLeft, distanceToRight);
      const baseAccuracy = Math.max(0.4, 1 - (distance / (SCREEN_WIDTH * 0.6)));
      const comboBonus = Math.min(0.3, combo * 0.05);
      const finalAccuracy = Math.min(0.9, baseAccuracy + comboBonus);
      const isSuccessful = Math.random() < finalAccuracy;
      
      // Animate ball to hoop
      setBallPosition({ x: hoopX, y: SCREEN_HEIGHT * 0.25 });
      
      setTimeout(() => {
        if (isSuccessful) {
          const isThreePointer = distance > SCREEN_WIDTH * 0.35;
          const shootPoints = isThreePointer ? 300 * (combo + 1) : 150 * (combo + 1);
          setScore(prev => prev + shootPoints);
          setCombo(prev => prev + (isThreePointer ? 2 : 1));
          setLastShotResult({ 
            type: isThreePointer ? '3-POINTER' : '2-POINTER', 
            points: shootPoints 
          });
        } else {
          // Miss - reset combo
          setCombo(0);
          setLastShotResult({ type: 'MISS', points: 0 });
        }
        setGameState('ready');
        
        // Reset ball position
        setBallPosition({ x: playerPosition.x, y: playerPosition.y - 15 });
        
        // Clear shot result after delay
        setTimeout(() => setLastShotResult(null), 2000);
      }, 1000);
    }
  };

  // Reset combo after inactivity
  useEffect(() => {
    let comboTimer;
    if (gameState === 'ready' && combo > 0) {
      comboTimer = setTimeout(() => {
        setCombo(0);
      }, 10000);
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
        onShoot={handleShoot}
        gameState={gameState}
        isMoving={isMoving}
        stopMovement={stopMovement}
        nearHoop={nearHoop}
      />
      
      {/* Hoop indicator */}
      {nearHoop && (
        <View style={[
          styles.hoopIndicator,
          { 
            left: nearHoop === 'left' ? SCREEN_WIDTH * 0.02 : SCREEN_WIDTH * 0.85,
            top: SCREEN_HEIGHT * 0.12 
          }
        ]}>
          <View style={styles.hoopIndicatorText}>
            <Text style={styles.hoopText}>🏀 AT HOOP!</Text>
          </View>
        </View>
      )}
      
      {/* Shot result indicator */}
      {lastShotResult && (
        <View style={styles.shotResultContainer}>
          <Text style={[
            styles.shotResultText,
            { color: lastShotResult.type === 'MISS' ? '#E74C3C' : '#27AE60' }
          ]}>
            {lastShotResult.type}
            {lastShotResult.points > 0 && ` +${lastShotResult.points}`}
          </Text>
        </View>
      )}
      
      {/* Orientation hint for new users */}
      {SCREEN_WIDTH < SCREEN_HEIGHT && (
        <View style={styles.orientationHint}>
          <Text style={styles.orientationText}>
            📱 Please rotate your device to landscape mode for the best experience! 🔄
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
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
    borderColor: '#ECF0F1',
  },
  hoopText: {
    color: '#ECF0F1',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shotResultContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.3,
    left: SCREEN_WIDTH * 0.35,
    right: SCREEN_WIDTH * 0.35,
    zIndex: 4,
    alignItems: 'center',
  },
  shotResultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  orientationHint: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.4,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    padding: 20,
    borderRadius: 15,
    zIndex: 10,
  },
  orientationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;