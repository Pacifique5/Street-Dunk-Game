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

  useEffect(() => {
    if (gameState === 'running') {
      // Enhanced running animation with leg movement
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(runAnim, {
              toValue: 1,
              duration: 120,
              useNativeDriver: true,
            }),
            Animated.timing(legAnim, {
              toValue: 1,
              duration: 120,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(runAnim, {
              toValue: 0,
              duration: 120,
              useNativeDriver: true,
            }),
            Animated.timing(legAnim, {
              toValue: 0,
              duration: 120,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else if (gameState === 'dribbling') {
      // Enhanced dribbling animation with body movement
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(dribbleAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(bodyAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(dribbleAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(bodyAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else if (gameState === 'dunking') {
      // Epic dunk animation with multiple phases
      Animated.sequence([
        // Crouch preparation
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.7,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(bodyAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Explosive jump with spin and arm extension
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -120,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: direction === 'right' ? 360 : -360,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.4,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        // Landing with impact
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(bodyAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        rotateAnim.setValue(0);
      });
    } else if (gameState === 'layup') {
      // Smooth layup animation
      Animated.sequence([
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -80,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: 0,
            duration: 400,
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
    } else if (gameState === 'shooting') {
      // Shooting animation with follow-through
      Animated.sequence([
        // Shooting preparation
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -40,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Follow through
        Animated.timing(armAnim, {
          toValue: 1.5,
          duration: 400,
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
        ]),
      ]).start();
    }
  }, [gameState, direction]);

  const getRunBounce = () => {
    return runAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -5]
    });
  };

  const getDribbleBounce = () => {
    return dribbleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -8]
    });
  };

  const getArmRotation = () => {
    return armAnim.interpolate({
      inputRange: [0, 1, 1.5],
      outputRange: ['0deg', direction === 'right' ? '45deg' : '-45deg', direction === 'right' ? '60deg' : '-60deg']
    });
  };

  const getLegMovement = () => {
    return legAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 3]
    });
  };

  const getBodyLean = () => {
    return bodyAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', direction === 'right' ? '5deg' : '-5deg']
    });
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          left: position.x - 25,
          top: position.y - 55,
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
      <Svg width={50} height={60}>
        {/* Player Shadow */}
        <Ellipse 
          cx={25} 
          cy={57} 
          rx={12} 
          ry={3} 
          fill="rgba(0,0,0,0.4)"
        />
        
        {/* Animated Legs */}
        <Animated.View style={{ transform: [{ rotate: getBodyLean() }] }}>
          <Rect 
            x={18} 
            y={35} 
            width={5} 
            height={18} 
            fill="#2C3E50"
            rx={2}
          />
          <Rect 
            x={27} 
            y={35} 
            width={5} 
            height={18} 
            fill="#2C3E50"
            rx={2}
          />
        </Animated.View>
        
        {/* Enhanced Shoes */}
        <Ellipse 
          cx={20} 
          cy={54} 
          rx={6} 
          ry={3} 
          fill="#E74C3C"
        />
        <Ellipse 
          cx={30} 
          cy={54} 
          rx={6} 
          ry={3} 
          fill="#E74C3C"
        />
        
        {/* Jersey/Body with animation */}
        <Animated.View style={{ transform: [{ rotate: getBodyLean() }] }}>
          <Rect 
            x={15} 
            y={18} 
            width={20} 
            height={20} 
            fill="#3498DB"
            rx={3}
          />
        </Animated.View>
        
        {/* Jersey Number */}
        <Circle 
          cx={25} 
          cy={26} 
          r={5} 
          fill="#FFFFFF"
        />
        <Circle 
          cx={25} 
          cy={26} 
          r={3} 
          fill="#3498DB"
        />
        
        {/* Animated Arms */}
        <Animated.View style={{ transform: [{ rotate: getArmRotation() }] }}>
          {/* Left arm */}
          <Rect 
            x={8} 
            y={20} 
            width={12} 
            height={4} 
            fill="#F39C12"
            rx={2}
          />
          {/* Right arm */}
          <Rect 
            x={30} 
            y={20} 
            width={12} 
            height={4} 
            fill="#F39C12"
            rx={2}
          />
        </Animated.View>
        
        {/* Hands */}
        <Circle 
          cx={6} 
          cy={22} 
          r={3} 
          fill="#F39C12"
        />
        <Circle 
          cx={44} 
          cy={22} 
          r={3} 
          fill="#F39C12"
        />
        
        {/* Head */}
        <Circle 
          cx={25} 
          cy={14} 
          r={7} 
          fill="#F39C12"
        />
        
        {/* Hair */}
        <Path 
          d="M18 8 Q25 4 32 8 Q28 6 25 6 Q22 6 18 8"
          fill="#2C3E50"
        />
        
        {/* Eyes */}
        <Circle 
          cx={22} 
          cy={13} 
          r={1} 
          fill="#2C3E50"
        />
        <Circle 
          cx={28} 
          cy={13} 
          r={1} 
          fill="#2C3E50"
        />
        
        {/* Mouth */}
        <Path 
          d="M22 16 Q25 17 28 16"
          stroke="#2C3E50"
          strokeWidth={1}
          fill="none"
        />
        
        {/* Speed lines when running */}
        {gameState === 'running' && (
          <>
            <Line 
              x1={direction === 'right' ? 2 : 48} 
              y1={18} 
              x2={direction === 'right' ? -3 : 53} 
              y2={16} 
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth={2}
            />
            <Line 
              x1={direction === 'right' ? 5 : 45} 
              y1={30} 
              x2={direction === 'right' ? 0 : 50} 
              y2={28} 
              stroke="rgba(255,255,255,0.6)" 
              strokeWidth={1.5}
            />
          </>
        )}
        
        {/* Power aura during dunk */}
        {gameState === 'dunking' && (
          <>
            <Circle 
              cx={25} 
              cy={30} 
              r={20} 
              fill="none" 
              stroke="rgba(231, 76, 60, 0.6)" 
              strokeWidth={3}
            />
            <Circle 
              cx={25} 
              cy={30} 
              r={15} 
              fill="none" 
              stroke="rgba(241, 196, 15, 0.8)" 
              strokeWidth={2}
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