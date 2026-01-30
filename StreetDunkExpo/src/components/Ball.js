import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Ball = ({ position, gameState }) => {
  const ballAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (gameState === 'dunking') {
      // Ball trajectory animation
      Animated.sequence([
        Animated.timing(ballAnim, {
          toValue: { 
            x: SCREEN_WIDTH / 2 - position.x, 
            y: SCREEN_HEIGHT * 0.2 - position.y 
          },
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(ballAnim, {
          toValue: { x: 0, y: 0 },
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Ball spin
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 360,
          duration: 200,
          useNativeDriver: true,
        })
      ).start();

      // Reset spin after dunk
      setTimeout(() => {
        spinAnim.setValue(0);
      }, 1500);
    }
  }, [gameState]);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          left: position.x - 15,
          top: position.y - 15,
          transform: [
            { translateX: ballAnim.x },
            { translateY: ballAnim.y },
            { rotate: spinAnim.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })}
          ]
        }
      ]}
    >
      <Svg width={30} height={30}>
        {/* Basketball */}
        <Circle 
          cx={15} 
          cy={15} 
          r={12} 
          fill="#e67e22"
          stroke="#d35400"
          strokeWidth={1}
        />
        
        {/* Basketball lines */}
        <Line 
          x1={3} 
          y1={15} 
          x2={27} 
          y2={15} 
          stroke="#d35400" 
          strokeWidth={1.5}
        />
        <Line 
          x1={15} 
          y1={3} 
          x2={15} 
          y2={27} 
          stroke="#d35400" 
          strokeWidth={1.5}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default Ball;