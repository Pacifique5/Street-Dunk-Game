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

  useEffect(() => {
    if (gameState === 'running') {
      // Running animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(runAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(runAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (gameState === 'dribbling') {
      // Dribbling animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(dribbleAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(dribbleAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (gameState === 'dunking') {
      // Epic dunk animation
      Animated.sequence([
        // Crouch before jump
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        // Explosive jump with spin
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -100,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: direction === 'right' ? 360 : -360,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
        // Landing
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
        ]),
      ]).start(() => {
        rotateAnim.setValue(0);
      });
    } else if (gameState === 'layup') {
      // Layup animation
      Animated.sequence([
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -60,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 0,
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
      outputRange: [0, -3]
    });
  };

  const getDribbleBounce = () => {
    return dribbleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -5]
    });
  };

  const getArmRotation = () => {
    return armAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', direction === 'right' ? '30deg' : '-30deg']
    });
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          left: position.x - 20,
          top: position.y - 45,
          transform: [
            { translateY: Animated.add(jumpAnim, getRunBounce()) },
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
      <Svg width={40} height={50}>
        {/* Player Shadow */}
        <Ellipse 
          cx={20} 
          cy={47} 
          rx={10} 
          ry={2} 
          fill="rgba(0,0,0,0.3)"
        />
        
        {/* Legs */}
        <Rect 
          x={15} 
          y={30} 
          width={4} 
          height={15} 
          fill="#2c3e50"
          rx={2}
        />
        <Rect 
          x={21} 
          y={30} 
          width={4} 
          height={15} 
          fill="#2c3e50"
          rx={2}
        />
        
        {/* Shoes */}
        <Ellipse 
          cx={17} 
          cy={46} 
          rx={5} 
          ry={2} 
          fill="#e74c3c"
        />
        <Ellipse 
          cx={23} 
          cy={46} 
          rx={5} 
          ry={2} 
          fill="#e74c3c"
        />
        
        {/* Jersey/Body */}
        <Rect 
          x={12} 
          y={15} 
          width={16} 
          height={18} 
          fill="#3498db"
          rx={2}
        />
        
        {/* Jersey Number */}
        <Circle 
          cx={20} 
          cy={22} 
          r={4} 
          fill="#ecf0f1"
        />
        <Circle 
          cx={20} 
          cy={22} 
          r={2} 
          fill="#3498db"
        />
        
        {/* Arms with animation */}
        <Animated.View style={{ transform: [{ rotate: getArmRotation() }] }}>
          {/* Left arm */}
          <Rect 
            x={6} 
            y={17} 
            width={10} 
            height={3} 
            fill="#f39c12"
            rx={1}
          />
          {/* Right arm */}
          <Rect 
            x={24} 
            y={17} 
            width={10} 
            height={3} 
            fill="#f39c12"
            rx={1}
          />
        </Animated.View>
        
        {/* Hands */}
        <Circle 
          cx={4} 
          cy={18} 
          r={2} 
          fill="#f39c12"
        />
        <Circle 
          cx={36} 
          cy={18} 
          r={2} 
          fill="#f39c12"
        />
        
        {/* Head */}
        <Circle 
          cx={20} 
          cy={12} 
          r={6} 
          fill="#f39c12"
        />
        
        {/* Hair */}
        <Path 
          d="M14 8 Q20 4 26 8 Q23 6 20 6 Q17 6 14 8"
          fill="#2c3e50"
        />
        
        {/* Eyes */}
        <Circle 
          cx={18} 
          cy={11} 
          r={0.8} 
          fill="#2c3e50"
        />
        <Circle 
          cx={22} 
          cy={11} 
          r={0.8} 
          fill="#2c3e50"
        />
        
        {/* Mouth */}
        <Path 
          d="M18 14 Q20 15 22 14"
          stroke="#2c3e50"
          strokeWidth={0.8}
          fill="none"
        />
        
        {/* Speed lines when running */}
        {gameState === 'running' && (
          <>
            <Line 
              x1={direction === 'right' ? 2 : 38} 
              y1={15} 
              x2={direction === 'right' ? -2 : 42} 
              y2={13} 
              stroke="rgba(255,255,255,0.6)" 
              strokeWidth={1.5}
            />
            <Line 
              x1={direction === 'right' ? 4 : 36} 
              y1={25} 
              x2={direction === 'right' ? 0 : 40} 
              y2={23} 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth={1}
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