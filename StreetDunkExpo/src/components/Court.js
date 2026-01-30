import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Circle, Line, Path, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Court = () => {
  return (
    <View style={styles.container}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={styles.court}>
        <Defs>
          {/* Court gradient */}
          <LinearGradient id="courtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#87CEEB" />
            <Stop offset="30%" stopColor="#4682B4" />
            <Stop offset="100%" stopColor="#2F4F4F" />
          </LinearGradient>
          
          {/* Floor gradient */}
          <LinearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#8B4513" />
            <Stop offset="100%" stopColor="#654321" />
          </LinearGradient>
        </Defs>
        
        {/* Sky background */}
        <Rect 
          width={SCREEN_WIDTH} 
          height={SCREEN_HEIGHT * 0.7} 
          fill="url(#courtGradient)"
        />
        
        {/* Court floor */}
        <Rect 
          x={0}
          y={SCREEN_HEIGHT * 0.7} 
          width={SCREEN_WIDTH} 
          height={SCREEN_HEIGHT * 0.3} 
          fill="url(#floorGradient)"
        />
        
        {/* Court surface lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <Line 
            key={i}
            x1={i * (SCREEN_WIDTH / 8)} 
            y1={SCREEN_HEIGHT * 0.7} 
            x2={i * (SCREEN_WIDTH / 8)} 
            y2={SCREEN_HEIGHT} 
            stroke="rgba(139, 69, 19, 0.3)" 
            strokeWidth={1}
          />
        ))}
        
        {/* LEFT BASKETBALL HOOP */}
        {/* Left backboard */}
        <Rect 
          x={50} 
          y={SCREEN_HEIGHT * 0.35} 
          width={8} 
          height={80} 
          fill="#ecf0f1"
          stroke="#bdc3c7"
          strokeWidth={2}
        />
        
        {/* Left hoop support */}
        <Rect 
          x={58} 
          y={SCREEN_HEIGHT * 0.45} 
          width={25} 
          height={4} 
          fill="#95a5a6"
        />
        
        {/* Left hoop rim */}
        <Ellipse 
          cx={83} 
          cy={SCREEN_HEIGHT * 0.47} 
          rx={25} 
          ry={4} 
          fill="none" 
          stroke="#e74c3c" 
          strokeWidth={4}
        />
        
        {/* Left hoop net */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 58 + (i * 6);
          return (
            <Line 
              key={i}
              x1={x} 
              y1={SCREEN_HEIGHT * 0.47} 
              x2={x + 2} 
              y2={SCREEN_HEIGHT * 0.47 + 20} 
              stroke="#ecf0f1" 
              strokeWidth={2}
              opacity={0.8}
            />
          );
        })}
        
        {/* RIGHT BASKETBALL HOOP */}
        {/* Right backboard */}
        <Rect 
          x={SCREEN_WIDTH - 58} 
          y={SCREEN_HEIGHT * 0.35} 
          width={8} 
          height={80} 
          fill="#ecf0f1"
          stroke="#bdc3c7"
          strokeWidth={2}
        />
        
        {/* Right hoop support */}
        <Rect 
          x={SCREEN_WIDTH - 83} 
          y={SCREEN_HEIGHT * 0.45} 
          width={25} 
          height={4} 
          fill="#95a5a6"
        />
        
        {/* Right hoop rim */}
        <Ellipse 
          cx={SCREEN_WIDTH - 83} 
          cy={SCREEN_HEIGHT * 0.47} 
          rx={25} 
          ry={4} 
          fill="none" 
          stroke="#e74c3c" 
          strokeWidth={4}
        />
        
        {/* Right hoop net */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = SCREEN_WIDTH - 108 + (i * 6);
          return (
            <Line 
              key={i}
              x1={x} 
              y1={SCREEN_HEIGHT * 0.47} 
              x2={x + 2} 
              y2={SCREEN_HEIGHT * 0.47 + 20} 
              stroke="#ecf0f1" 
              strokeWidth={2}
              opacity={0.8}
            />
          );
        })}
        
        {/* Center court line */}
        <Line 
          x1={SCREEN_WIDTH / 2} 
          y1={SCREEN_HEIGHT * 0.7} 
          x2={SCREEN_WIDTH / 2} 
          y2={SCREEN_HEIGHT} 
          stroke="#ecf0f1" 
          strokeWidth={3}
        />
        
        {/* Court boundaries */}
        <Line 
          x1={0} 
          y1={SCREEN_HEIGHT * 0.7} 
          x2={SCREEN_WIDTH} 
          y2={SCREEN_HEIGHT * 0.7} 
          stroke="#ecf0f1" 
          strokeWidth={4}
        />
        
        {/* Free throw areas */}
        {/* Left free throw area */}
        <Rect 
          x={50} 
          y={SCREEN_HEIGHT * 0.55} 
          width={120} 
          height={SCREEN_HEIGHT * 0.15} 
          fill="none" 
          stroke="#ecf0f1" 
          strokeWidth={2}
        />
        
        {/* Right free throw area */}
        <Rect 
          x={SCREEN_WIDTH - 170} 
          y={SCREEN_HEIGHT * 0.55} 
          width={120} 
          height={SCREEN_HEIGHT * 0.15} 
          fill="none" 
          stroke="#ecf0f1" 
          strokeWidth={2}
        />
        
        {/* Three-point lines */}
        {/* Left three-point arc */}
        <Path 
          d={`M 50 ${SCREEN_HEIGHT * 0.7} 
              Q 150 ${SCREEN_HEIGHT * 0.5} 
              50 ${SCREEN_HEIGHT * 0.3}`}
          fill="none" 
          stroke="#ecf0f1" 
          strokeWidth={2}
        />
        
        {/* Right three-point arc */}
        <Path 
          d={`M ${SCREEN_WIDTH - 50} ${SCREEN_HEIGHT * 0.7} 
              Q ${SCREEN_WIDTH - 150} ${SCREEN_HEIGHT * 0.5} 
              ${SCREEN_WIDTH - 50} ${SCREEN_HEIGHT * 0.3}`}
          fill="none" 
          stroke="#ecf0f1" 
          strokeWidth={2}
        />
        
        {/* Court shadows */}
        <Ellipse 
          cx={83} 
          cy={SCREEN_HEIGHT * 0.72} 
          rx={40} 
          ry={8} 
          fill="rgba(0,0,0,0.2)"
        />
        
        <Ellipse 
          cx={SCREEN_WIDTH - 83} 
          cy={SCREEN_HEIGHT * 0.72} 
          rx={40} 
          ry={8} 
          fill="rgba(0,0,0,0.2)"
        />
        
        {/* Background buildings/cityscape */}
        <Rect x={0} y={SCREEN_HEIGHT * 0.4} width={30} height={SCREEN_HEIGHT * 0.3} fill="rgba(0,0,0,0.1)" />
        <Rect x={SCREEN_WIDTH - 30} y={SCREEN_HEIGHT * 0.45} width={30} height={SCREEN_HEIGHT * 0.25} fill="rgba(0,0,0,0.1)" />
        <Rect x={SCREEN_WIDTH * 0.2} y={SCREEN_HEIGHT * 0.5} width={20} height={SCREEN_HEIGHT * 0.2} fill="rgba(0,0,0,0.08)" />
        <Rect x={SCREEN_WIDTH * 0.8} y={SCREEN_HEIGHT * 0.48} width={25} height={SCREEN_HEIGHT * 0.22} fill="rgba(0,0,0,0.08)" />
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