import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Rect, Path, Ellipse, Line } from 'react-native-svg';

const Player = ({ position, gameState, direction = 'right' }) => {
  const jumpAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const armAnim = useRef(new Animated.Value(0)).current;
  const dribbleAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const runAnim = useRef(new Animated.Value(0)).current;
  const legAnim = useRef(new Animated.Value(0)).current;
  const bodyAnim = useRef(new Animated.Value(0)).current;
  const ballHandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (gameState === 'running') {
      // Smooth running animation with ball handling
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(runAnim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(legAnim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(ballHandAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(runAnim, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(legAnim, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(ballHandAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else if (gameState === 'dribbling') {
      // Enhanced dribbling with realistic ball handling
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(dribbleAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(bodyAnim, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(armAnim, {
              toValue: 0.5,
              duration: 150,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(dribbleAnim, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(bodyAnim, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(armAnim, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else if (gameState === 'dunking') {
      // Epic dunk sequence with multiple phases
      Animated.sequence([
        // Preparation crouch
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.6,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(bodyAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        // Explosive jump with 360 spin
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -140,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: direction === 'right' ? 360 : -360,
            duration: 1100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1.5,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        // Powerful landing
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(bodyAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        rotateAnim.setValue(0);
      });
    } else if (gameState === 'layup') {
      // Graceful layup animation
      Animated.sequence([
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -90,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(bodyAnim, {
            toValue: 0.5,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(bodyAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else if (gameState === 'shooting') {
      // Shooting form with follow-through
      Animated.sequence([
        // Setup shot
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -50,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Release and follow through
        Animated.timing(armAnim, {
          toValue: 1.8,
          duration: 500,
          useNativeDriver: true,
        }),
        // Return to position
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [gameState, direction]);

  const getRunBounce = () => {
    return runAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -6]
    });
  };

  const getDribbleBounce = () => {
    return dribbleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10]
    });
  };

  const getArmRotation = () => {
    return armAnim.interpolate({
      inputRange: [0, 0.5, 1, 1.2, 1.5, 1.8],
      outputRange: ['0deg', '15deg', '45deg', '60deg', '75deg', '90deg']
    });
  };

  const getLegMovement = () => {
    return legAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4]
    });
  };

  const getBodyLean = () => {
    return bodyAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', direction === 'right' ? '8deg' : '-8deg']
    });
  };

  const getBallHandMovement = () => {
    return ballHandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -3]
    });
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          left: position.x - 30,
          top: position.y - 65,
          transform: [
            { translateY: Animated.add(jumpAnim, Animated.add(getRunBounce(), getDribbleBounce())) },
            { rotate: rotateAnim.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })},
            { scale: scaleAnim },
            { scaleX: direction === 'left' ? -1 : 1 }
          ]
        }
      ]}
    >
      <Svg width={60} height={70}>
        {/* Enhanced Player Shadow */}
        <Ellipse 
          cx={30} 
          cy={67} 
          rx={15} 
          ry={4} 
          fill="rgba(0,0,0,0.5)"
        />
        
        {/* Animated Legs with running motion */}
        <Animated.View style={{ 
          transform: [
            { rotate: getBodyLean() },
            { translateY: getLegMovement() }
          ] 
        }}>
          <Rect 
            x={22} 
            y={40} 
            width={6} 
            height={22} 
            fill="#2C3E50"
            rx={3}
          />
          <Rect 
            x={32} 
            y={40} 
            width={6} 
            height={22} 
            fill="#2C3E50"
            rx={3}
          />
        </Animated.View>
        
        {/* Enhanced Basketball Shoes */}
        <Ellipse 
          cx={25} 
          cy={63} 
          rx={8} 
          ry={4} 
          fill="#E74C3C"
        />
        <Ellipse 
          cx={35} 
          cy={63} 
          rx={8} 
          ry={4} 
          fill="#E74C3C"
        />
        
        {/* Jersey/Body with dynamic lean */}
        <Animated.View style={{ transform: [{ rotate: getBodyLean() }] }}>
          <Rect 
            x={18} 
            y={20} 
            width={24} 
            height={24} 
            fill="#3498DB"
            rx={4}
          />
        </Animated.View>
        
        {/* Jersey Number */}
        <Circle 
          cx={30} 
          cy={30} 
          r={6} 
          fill="#FFFFFF"
        />
        <Circle 
          cx={30} 
          cy={30} 
          r={4} 
          fill="#3498DB"
        />
        
        {/* Animated Arms with ball handling */}
        <Animated.View style={{ 
          transform: [
            { rotate: getArmRotation() },
            { translateY: getBallHandMovement() }
          ] 
        }}>
          {/* Left arm */}
          <Rect 
            x={10} 
            y={23} 
            width={14} 
            height={5} 
            fill="#F39C12"
            rx={2}
          />
          {/* Right arm */}
          <Rect 
            x={36} 
            y={23} 
            width={14} 
            height={5} 
            fill="#F39C12"
            rx={2}
          />
        </Animated.View>
        
        {/* Hands */}
        <Circle 
          cx={8} 
          cy={25} 
          r={4} 
          fill="#F39C12"
        />
        <Circle 
          cx={52} 
          cy={25} 
          r={4} 
          fill="#F39C12"
        />
        
        {/* Head */}
        <Circle 
          cx={30} 
          cy={16} 
          r={8} 
          fill="#F39C12"
        />
        
        {/* Hair */}
        <Path 
          d="M22 9 Q30 5 38 9 Q34 7 30 7 Q26 7 22 9"
          fill="#2C3E50"
        />
        
        {/* Eyes with focus */}
        <Circle 
          cx={27} 
          cy={15} 
          r={1.2} 
          fill="#2C3E50"
        />
        <Circle 
          cx={33} 
          cy={15} 
          r={1.2} 
          fill="#2C3E50"
        />
        
        {/* Determined mouth */}
        <Path 
          d="M27 18 Q30 19 33 18"
          stroke="#2C3E50"
          strokeWidth={1.2}
          fill="none"
        />
        
        {/* Speed lines when running */}
        {gameState === 'running' && (
          <>
            <Line 
              x1={direction === 'right' ? 5 : 55} 
              y1={20} 
              x2={direction === 'right' ? 0 : 60} 
              y2={18} 
              stroke="rgba(255,255,255,0.9)" 
              strokeWidth={2.5}
            />
            <Line 
              x1={direction === 'right' ? 8 : 52} 
              y1={35} 
              x2={direction === 'right' ? 3 : 57} 
              y2={33} 
              stroke="rgba(255,255,255,0.7)" 
              strokeWidth={2}
            />
            <Line 
              x1={direction === 'right' ? 12 : 48} 
              y1={50} 
              x2={direction === 'right' ? 7 : 53} 
              y2={48} 
              stroke="rgba(255,255,255,0.5)" 
              strokeWidth={1.5}
            />
          </>
        )}
        
        {/* Power aura during dunk */}
        {gameState === 'dunking' && (
          <>
            <Circle 
              cx={30} 
              cy={35} 
              r={25} 
              fill="none" 
              stroke="rgba(231, 76, 60, 0.7)" 
              strokeWidth={4}
            />
            <Circle 
              cx={30} 
              cy={35} 
              r={18} 
              fill="none" 
              stroke="rgba(241, 196, 15, 0.9)" 
              strokeWidth={3}
            />
            <Circle 
              cx={30} 
              cy={35} 
              r={12} 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.8)" 
              strokeWidth={2}
            />
          </>
        )}
        
        {/* Focus lines during shooting */}
        {gameState === 'shooting' && (
          <>
            <Line 
              x1={30} 
              y1={5} 
              x2={30} 
              y2={0} 
              stroke="rgba(52, 152, 219, 0.8)" 
              strokeWidth={2}
            />
            <Line 
              x1={25} 
              y1={8} 
              x2={20} 
              y2={3} 
              stroke="rgba(52, 152, 219, 0.6)" 
              strokeWidth={1.5}
            />
            <Line 
              x1={35} 
              y1={8} 
              x2={40} 
              y2={3} 
              stroke="rgba(52, 152, 219, 0.6)" 
              strokeWidth={1.5}
            />
          </>
        )}
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
  },
});

export default Player;