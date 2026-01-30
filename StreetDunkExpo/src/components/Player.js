import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const Player = ({ position, gameState }) => {
  const jumpAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (gameState === 'dunking') {
      // Jump animation
      Animated.sequence([
        Animated.timing(jumpAnim, {
          toValue: -150,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(jumpAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();

      // Rotation for style
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        rotateAnim.setValue(0);
      });
    }
  }, [gameState]);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          left: position.x - 25,
          top: position.y - 50,
          transform: [
            { translateY: jumpAnim },
            { rotate: rotateAnim.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })}
          ]
        }
      ]}
    >
      <Svg width={50} height={50}>
        {/* Player body */}
        <Rect 
          x={15} 
          y={20} 
          width={20} 
          height={25} 
          fill="#3498db"
          rx={3}
        />
        
        {/* Player head */}
        <Circle 
          cx={25} 
          cy={15} 
          r={8} 
          fill="#f39c12"
        />
        
        {/* Arms */}
        <Rect 
          x={8} 
          y={22} 
          width={34} 
          height={4} 
          fill="#3498db"
          rx={2}
        />
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