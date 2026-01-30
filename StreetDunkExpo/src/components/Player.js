import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Rect, Path, Ellipse, Polygon } from 'react-native-svg';

const Player = ({ position, gameState, moveType = 'dunk', direction = 'right' }) => {
  const jumpAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const armAnim = useRef(new Animated.Value(0)).current;
  const legAnim = useRef(new Animated.Value(0)).current;
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
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(runAnim, {
            toValue: 0,
            duration: 200,
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
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dribbleAnim, {
            toValue: 0,
            duration: 300,
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
          duration: 200,
          useNativeDriver: true,
        }),
        // Explosive jump
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: -120,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: direction === 'right' ? 360 : -360,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        // Landing
        Animated.parallel([
          Animated.timing(jumpAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
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
            toValue: -80,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1,
            duration: 400,
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
        ]),
      ]).start();
    }
  }, [gameState, direction]);

  const getRunTransform = () => {
    return runAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -5]
    });
  };

  const getDribbleTransform = () => {
    return dribbleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -8]
    });
  };

  const getArmRotation = () => {
    return armAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', direction === 'right' ? '45deg' : '-45deg']
    });
  };

  const getLegRotation = () => {
    return runAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '15deg']
    });
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          left: position.x - 25,
          top: position.y - 50,
          transform: [
            { translateY: Animated.add(jumpAnim, getRunTransform()) },
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
          cy={55} 
          rx={12} 
          ry={3} 
          fill="rgba(0,0,0,0.3)"
        />
        
        {/* Legs with running animation */}
        <Animated.View style={{ transform: [{ rotate: getLegRotation() }] }}>
          <Rect 
            x={18} 
            y={35} 
            width={5} 
            height={18} 
            fill="#2c3e50"
            rx={2}
          />
          <Rect 
            x={27} 
            y={35} 
            width={5} 
            height={18} 
            fill="#2c3e50"
            rx={2}
          />
        </Animated.View>
        
        {/* Shoes */}
        <Ellipse 
          cx={20} 
          cy={55} 
          rx={6} 
          ry={3} 
          fill="#e74c3c"
        />
        <Ellipse 
          cx={30} 
          cy={55} 
          rx={6} 
          ry={3} 
          fill="#e74c3c"
        />
        
        {/* Jersey/Body */}
        <Rect 
          x={15} 
          y={20} 
          width={20} 
          height={20} 
          fill="#3498db"
          rx={3}
        />
        
        {/* Jersey Number */}
        <Circle 
          cx={25} 
          cy={28} 
          r={5} 
          fill="#ecf0f1"
        />
        <Circle 
          cx={25} 
          cy={28} 
          r={3} 
          fill="#3498db"
        />
        
        {/* Arms with movement */}
        <Animated.View style={{ transform: [{ rotate: getArmRotation() }] }}>
          {/* Left arm */}
          <Rect 
            x={8} 
            y={22} 
            width={12} 
            height={4} 
            fill="#f39c12"
            rx={2}
          />
          {/* Right arm */}
          <Rect 
            x={30} 
            y={22} 
            width={12} 
            height={4} 
            fill="#f39c12"
            rx={2}
          />
        </Animated.View>
        
        {/* Hands */}
        <Circle 
          cx={6} 
          cy={24} 
          r={3} 
          fill="#f39c12"
        />
        <Circle 
          cx={44} 
          cy={24} 
          r={3} 
          fill="#f39c12"
        />
        
        {/* Head */}
        <Circle 
          cx={25} 
          cy={15} 
          r={8} 
          fill="#f39c12"
        />
        
        {/* Hair */}
        <Path 
          d="M17 10 Q25 5 33 10 Q29 8 25 8 Q21 8 17 10"
          fill="#2c3e50"
        />
        
        {/* Eyes */}
        <Circle 
          cx={22} 
          cy={13} 
          r={1} 
          fill="#2c3e50"
        />
        <Circle 
          cx={28} 
          cy={13} 
          r={1} 
          fill="#2c3e50"
        />
        
        {/* Mouth */}
        <Path 
          d="M22 17 Q25 19 28 17"
          stroke="#2c3e50"
          strokeWidth={1}
          fill="none"
        />
        
        {/* Dribbling motion indicator */}
        {gameState === 'dribbling' && (
          <Animated.View style={{ transform: [{ translateY: getDribbleTransform() }] }}>
            <Circle 
              cx={direction === 'right' ? 35 : 15} 
              cy={45} 
              r={2} 
              fill="#e67e22"
              opacity={0.7}
            />
          </Animated.View>
        )}
        
        {/* Speed lines when running */}
        {gameState === 'running' && (
          <>
            <Line 
              x1={direction === 'right' ? 5 : 45} 
              y1={20} 
              x2={direction === 'right' ? 0 : 50} 
              y2={18} 
              stroke="rgba(255,255,255,0.6)" 
              strokeWidth={2}
            />
            <Line 
              x1={direction === 'right' ? 8 : 42} 
              y1={30} 
              x2={direction === 'right' ? 3 : 47} 
              y2={28} 
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