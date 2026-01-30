import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Circle, Path, Defs, RadialGradient, Stop } from 'react-native-svg';

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
              toValue: -15,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 0.9,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shadowAnim, {
              toValue: 0.6,
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
          duration: 600,
          useNativeDriver: true,
        })
      ).start();
    } else if (gameState === 'dunking') {
      // Epic dunk trajectory
      const hoopY = SCREEN_HEIGHT * 0.25;
      
      Animated.sequence([
        // Arc to hoop
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { 
              x: 0,
              y: hoopY - position.y - 20
            },
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
        // Through hoop
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { 
              x: 0,
              y: hoopY - position.y + 12
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
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Fast spin during dunk
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 360,
          duration: 100,
          useNativeDriver: true,
        })
      ).start();

      // Reset spin after dunk
      setTimeout(() => {
        spinAnim.setValue(0);
      }, 1300);
    } else if (gameState === 'layup') {
      // Layup trajectory
      const hoopY = SCREEN_HEIGHT * 0.25;
      
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { 
              x: 0,
              y: hoopY - position.y - 12
            },
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(ballAnim, {
            toValue: { 
              x: 0,
              y: hoopY - position.y + 6
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

      // Moderate spin for layup
      Animated.timing(spinAnim, {
        toValue: 180,
        duration: 800,
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
          left: position.x - 12,
          top: position.y - 12,
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
                inputRange: [0.6, 1],
                outputRange: [1.4, 1]
              })}
            ]
          }
        ]}
      />
      
      <Svg width={24} height={24}>
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
          cx={12} 
          cy={12} 
          r={10} 
          fill="url(#ballGradient)"
          stroke="#d35400"
          strokeWidth={1}
        />
        
        {/* Basketball seam lines */}
        <Path 
          d="M 2 12 Q 12 4 22 12 Q 12 20 2 12"
          stroke="#d35400" 
          strokeWidth={1.5}
          fill="none"
        />
        <Path 
          d="M 12 2 Q 4 12 12 22 Q 20 12 12 2"
          stroke="#d35400" 
          strokeWidth={1.5}
          fill="none"
        />
        
        {/* Highlight for 3D effect */}
        <Circle 
          cx={15} 
          cy={9} 
          r={2.5} 
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
    bottom: -12,
    left: 4,
    width: 16,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
  },
});

export default Ball;