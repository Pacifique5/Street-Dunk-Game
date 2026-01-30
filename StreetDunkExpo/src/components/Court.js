import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Circle, Line, Path, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Court = () => {
  return (
    <View style={styles.container}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={styles.court}>
        <Defs>
          {/* Sky gradient */}
          <LinearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#E6F3FF" />
            <Stop offset="50%" stopColor="#B3D9FF" />
            <Stop offset="100%" stopColor="#80BFFF" />
          </LinearGradient>
          
          {/* Court floor gradient - orange like the reference */}
          <LinearGradient id="courtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF8C42" />
            <Stop offset="50%" stopColor="#FF7A28" />
            <Stop offset="100%" stopColor="#E6691A" />
          </LinearGradient>
          
          {/* Court border gradient */}
          <LinearGradient id="borderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#8B4513" />
            <Stop offset="100%" stopColor="#654321" />
          </LinearGradient>
        </Defs>
        
        {/* Sky background */}
        <Rect 
          width={SCREEN_WIDTH} 
          height={SCREEN_HEIGHT * 0.4} 
          fill="url(#skyGradient)"
        />
        
        {/* Court border/wall */}
        <Rect 
          x={0}
          y={SCREEN_HEIGHT * 0.4} 
          width={SCREEN_WIDTH} 
          height={SCREEN_HEIGHT * 0.1} 
          fill="url(#borderGradient)"
        />
        
        {/* Main court floor - orange like reference */}
        <Rect 
          x={SCREEN_WIDTH * 0.05}
          y={SCREEN_HEIGHT * 0.5} 
          width={SCREEN_WIDTH * 0.9} 
          height={SCREEN_HEIGHT * 0.35} 
          fill="url(#courtGradient)"
          stroke="#FFFFFF"
          strokeWidth={4}
        />
        
        {/* Court floor perspective lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <Line 
            key={`perspective-${i}`}
            x1={SCREEN_WIDTH * 0.05 + (i * SCREEN_WIDTH * 0.9 / 8)} 
            y1={SCREEN_HEIGHT * 0.5} 
            x2={SCREEN_WIDTH * 0.05 + (i * SCREEN_WIDTH * 0.9 / 8)} 
            y2={SCREEN_HEIGHT * 0.85} 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth={1}
          />
        ))}
        
        {/* LEFT BASKETBALL HOOP SETUP */}
        {/* Left hoop support pole */}
        <Rect 
          x={SCREEN_WIDTH * 0.12} 
          y={SCREEN_HEIGHT * 0.15} 
          width={8} 
          height={SCREEN_HEIGHT * 0.35} 
          fill="#4A4A4A"
          stroke="#2F2F2F"
          strokeWidth={2}
        />
        
        {/* Left backboard */}
        <Rect 
          x={SCREEN_WIDTH * 0.08} 
          y={SCREEN_HEIGHT * 0.15} 
          width={15} 
          height={80} 
          fill="#FFFFFF"
          stroke="#FF4444"
          strokeWidth={3}
        />
        
        {/* Left backboard inner square */}
        <Rect 
          x={SCREEN_WIDTH * 0.085} 
          y={SCREEN_HEIGHT * 0.17} 
          width={10} 
          height={35} 
          fill="none"
          stroke="#FF4444"
          strokeWidth={2}
        />
        
        {/* Left hoop rim */}
        <Ellipse 
          cx={SCREEN_WIDTH * 0.125} 
          cy={SCREEN_HEIGHT * 0.25} 
          rx={25} 
          ry={4} 
          fill="none" 
          stroke="#FF4444" 
          strokeWidth={4}
        />
        
        {/* Left hoop net */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = SCREEN_WIDTH * 0.1 + (i * 5);
          return (
            <Line 
              key={`left-net-${i}`}
              x1={x} 
              y1={SCREEN_HEIGHT * 0.25} 
              x2={x + 1} 
              y2={SCREEN_HEIGHT * 0.25 + 15} 
              stroke="#FFFFFF" 
              strokeWidth={2}
              opacity={0.8}
            />
          );
        })}
        
        {/* RIGHT BASKETBALL HOOP SETUP */}
        {/* Right hoop support pole */}
        <Rect 
          x={SCREEN_WIDTH * 0.88 - 8} 
          y={SCREEN_HEIGHT * 0.15} 
          width={8} 
          height={SCREEN_HEIGHT * 0.35} 
          fill="#4A4A4A"
          stroke="#2F2F2F"
          strokeWidth={2}
        />
        
        {/* Right backboard */}
        <Rect 
          x={SCREEN_WIDTH * 0.92 - 15} 
          y={SCREEN_HEIGHT * 0.15} 
          width={15} 
          height={80} 
          fill="#FFFFFF"
          stroke="#FF4444"
          strokeWidth={3}
        />
        
        {/* Right backboard inner square */}
        <Rect 
          x={SCREEN_WIDTH * 0.915 - 10} 
          y={SCREEN_HEIGHT * 0.17} 
          width={10} 
          height={35} 
          fill="none"
          stroke="#FF4444"
          strokeWidth={2}
        />
        
        {/* Right hoop rim */}
        <Ellipse 
          cx={SCREEN_WIDTH * 0.875} 
          cy={SCREEN_HEIGHT * 0.25} 
          rx={25} 
          ry={4} 
          fill="none" 
          stroke="#FF4444" 
          strokeWidth={4}
        />
        
        {/* Right hoop net */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = SCREEN_WIDTH * 0.85 + (i * 5);
          return (
            <Line 
              key={`right-net-${i}`}
              x1={x} 
              y1={SCREEN_HEIGHT * 0.25} 
              x2={x + 1} 
              y2={SCREEN_HEIGHT * 0.25 + 15} 
              stroke="#FFFFFF" 
              strokeWidth={2}
              opacity={0.8}
            />
          );
        })}
        
        {/* SCOREBOARD */}
        <Rect 
          x={SCREEN_WIDTH * 0.4} 
          y={SCREEN_HEIGHT * 0.05} 
          width={SCREEN_WIDTH * 0.2} 
          height={40} 
          fill="#2E4A8B"
          stroke="#1A2E5B"
          strokeWidth={2}
          rx={5}
        />
        
        {/* Scoreboard display */}
        <Rect 
          x={SCREEN_WIDTH * 0.42} 
          y={SCREEN_HEIGHT * 0.07} 
          width={SCREEN_WIDTH * 0.16} 
          height={25} 
          fill="#000000"
          rx={3}
        />
        
        {/* Center court line */}
        <Line 
          x1={SCREEN_WIDTH / 2} 
          y1={SCREEN_HEIGHT * 0.5} 
          x2={SCREEN_WIDTH / 2} 
          y2={SCREEN_HEIGHT * 0.85} 
          stroke="#FFFFFF" 
          strokeWidth={4}
        />
        
        {/* Left free throw area */}
        <Rect 
          x={SCREEN_WIDTH * 0.05} 
          y={SCREEN_HEIGHT * 0.6} 
          width={SCREEN_WIDTH * 0.25} 
          height={SCREEN_HEIGHT * 0.15} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={3}
        />
        
        {/* Left free throw circle */}
        <Circle 
          cx={SCREEN_WIDTH * 0.175} 
          cy={SCREEN_HEIGHT * 0.675} 
          r={25} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={3}
        />
        
        {/* Right free throw area */}
        <Rect 
          x={SCREEN_WIDTH * 0.7} 
          y={SCREEN_HEIGHT * 0.6} 
          width={SCREEN_WIDTH * 0.25} 
          height={SCREEN_HEIGHT * 0.15} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={3}
        />
        
        {/* Right free throw circle */}
        <Circle 
          cx={SCREEN_WIDTH * 0.825} 
          cy={SCREEN_HEIGHT * 0.675} 
          r={25} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={3}
        />
        
        {/* Left three-point arc */}
        <Path 
          d={`M ${SCREEN_WIDTH * 0.05} ${SCREEN_HEIGHT * 0.85} 
              Q ${SCREEN_WIDTH * 0.2} ${SCREEN_HEIGHT * 0.55} 
              ${SCREEN_WIDTH * 0.05} ${SCREEN_HEIGHT * 0.25}`}
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={3}
        />
        
        {/* Right three-point arc */}
        <Path 
          d={`M ${SCREEN_WIDTH * 0.95} ${SCREEN_HEIGHT * 0.85} 
              Q ${SCREEN_WIDTH * 0.8} ${SCREEN_HEIGHT * 0.55} 
              ${SCREEN_WIDTH * 0.95} ${SCREEN_HEIGHT * 0.25}`}
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={3}
        />
        
        {/* Center court circle */}
        <Circle 
          cx={SCREEN_WIDTH / 2} 
          cy={SCREEN_HEIGHT * 0.7} 
          r={30} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={3}
        />
        
        {/* Court shadows under hoops */}
        <Ellipse 
          cx={SCREEN_WIDTH * 0.125} 
          cy={SCREEN_HEIGHT * 0.52} 
          rx={30} 
          ry={5} 
          fill="rgba(0,0,0,0.2)"
        />
        
        <Ellipse 
          cx={SCREEN_WIDTH * 0.875} 
          cy={SCREEN_HEIGHT * 0.52} 
          rx={30} 
          ry={5} 
          fill="rgba(0,0,0,0.2)"
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