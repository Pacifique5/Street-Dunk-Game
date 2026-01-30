import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Circle, Line } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Court = () => {
  return (
    <View style={styles.container}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={styles.court}>
        {/* Court background */}
        <Rect 
          width={SCREEN_WIDTH} 
          height={SCREEN_HEIGHT} 
          fill="#34495e"
        />
        
        {/* Basketball hoop */}
        <Rect 
          x={SCREEN_WIDTH / 2 - 60} 
          y={SCREEN_HEIGHT * 0.15} 
          width={120} 
          height={8} 
          fill="#e74c3c"
          rx={4}
        />
        
        {/* Hoop rim */}
        <Circle 
          cx={SCREEN_WIDTH / 2} 
          cy={SCREEN_HEIGHT * 0.15 + 15} 
          r={45} 
          fill="none" 
          stroke="#e74c3c" 
          strokeWidth={4}
        />
        
        {/* Court lines */}
        <Line 
          x1={50} 
          y1={SCREEN_HEIGHT * 0.9} 
          x2={SCREEN_WIDTH - 50} 
          y2={SCREEN_HEIGHT * 0.9} 
          stroke="#ecf0f1" 
          strokeWidth={3}
        />
        
        {/* Free throw line */}
        <Line 
          x1={SCREEN_WIDTH / 2 - 80} 
          y1={SCREEN_HEIGHT * 0.6} 
          x2={SCREEN_WIDTH / 2 + 80} 
          y2={SCREEN_HEIGHT * 0.6} 
          stroke="#ecf0f1" 
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  court: {
    position: 'absolute',
  },
});

export default Court;