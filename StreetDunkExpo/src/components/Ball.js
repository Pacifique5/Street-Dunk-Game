import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Circle, Line, Path, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Ball = ({ position, gameState }) => {
  const ballAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shadowAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (gameState === 'dribbling') {
      // Dribbling bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(bounceAnim, {
              toValue: -30,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 0.9,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shadowAnim, {
              toValue: 0.5,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1.1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shadowAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Continuous spin while dribbling
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 360,
          duration: 800,
          useNativeDriver: true,
        })
      ).start();
    } else if (gameState === 'dunking') {
      // Epic dunk trajectory
      Animated.sequence([
        // Arc to hoop
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { 
              x: SCREEN_WIDTH / 2 - position.x, 
              y: SCREEN_HEIGHT * 0.18 - position.y 
            },
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        // Through hoop
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { 
              x: SCREEN_WIDTH / 2 - position.x, 
              y: SCREEN_HEIGHT * 0.25 - position.y 
            },
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        // Reset
        Animated.timing(ballAnim, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Fast spin during dunk
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 360,
          duration: 150,
          useNativeDriver: true,
        })
      ).start();

      // Reset spin after dunk
      setTimeout(() => {
        spinAnim.setValue(0);
      }, 2000);
    } else if (gameState === 'layup') {
      // Layup trajectory
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { 
              x: SCREEN_WIDTH / 2 - position.x + 20, 
              y: SCREEN_HEIGHT * 0.19 - position.y 
            },
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { x: 0, y: 0 },
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      // Moderate spin for layup
      Animated.timing(spinAnim, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        spinAnim.setValue(0);
      });
    }
  }, [gameState]);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          left: position.x - 18,
          top: position.y - 18,
          transform: [
            { translateX: ballAnim.x },
            { translateY: Animated.add(ballAnim.y, bounceAnim) },
            { rotate: spinAnim.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })},
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      {/* Ball shadow */}
      <Animated.View 
        style={[
          styles.shadow,
          {
            opacity: shadowAnim,
            transform: [
              { scaleX: scaleAnim },
              { scaleY: shadowAnim.interpolate({
                inputRange: [0.5, 1],
                outputRange: [1.5, 1]
              })}
            ]
          }
        ]}
      />
      
      <Svg width={30} height={30}>
        <Defs>
          {/* Basketball gradient */}
          <RadialGradient id="ballGradient" cx="35%" cy="35%">
            <Stop offset="0%" stopColor="#f39c12" />
            <Stop offset="60%" stopColor="#e67e22" />
            <Stop offset="100%" stopColor="#d35400" />
          </RadialGradient>
        </Defs>
        
        {/* Basketball sphere */}
        <Circle 
          cx={15} 
          cy={15} 
          r={12} 
          fill="url(#ballGradient)"
          stroke="#d35400"
          strokeWidth={1}
        />
        
        {/* Basketball seam lines */}
        <Path 
          d="M 3 15 Q 15 6 27 15 Q 15 24 3 15"
          stroke="#d35400" 
          strokeWidth={1.5}
          fill="none"
        />
        <Path 
          d="M 15 3 Q 6 15 15 27 Q 24 15 15 3"
          stroke="#d35400" 
          strokeWidth={1.5}
          fill="none"
        />
        
        {/* Highlight for 3D effect */}
        <Circle 
          cx={18} 
          cy={12} 
          r={3} 
          fill="#f1c40f"
          opacity={0.3}
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
  shadow: {
    position: 'absolute',
    bottom: -20,
    left: 8,
    width: 20,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
});

export default Ball;