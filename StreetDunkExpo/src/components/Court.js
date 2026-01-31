import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Circle, Line, Path, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Court = () => {
  return (
    <View style={styles.container}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={styles.court}>
        <Defs>
          {/* Sky gradient - light blue like reference */}
          <LinearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#87CEEB" />
            <Stop offset="100%" stopColor="#4682B4" />
          </LinearGradient>
          
          {/* Court floor gradient - bright orange like reference */}
          <LinearGradient id="courtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF8C00" />
            <Stop offset="100%" stopColor="#FF6347" />
          </LinearGradient>
          
          {/* Hoop gradient */}
          <LinearGradient id="hoopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF4500" />
            <Stop offset="100%" stopColor="#DC143C" />
          </LinearGradient>
        </Defs>
        
        {/* Sky background */}
        <Rect 
          width={SCREEN_WIDTH} 
          height={SCREEN_HEIGHT * 0.4} 
          fill="url(#skyGradient)"
        />
        
        {/* Main court floor - full width landscape */}
        <Rect 
          x={0}
          y={SCREEN_HEIGHT * 0.4} 
          width={SCREEN_WIDTH} 
          height={SCREEN_HEIGHT * 0.6} 
          fill="url(#courtGradient)"
        />
        
        {/* LEFT BASKETBALL HOOP */}
        {/* Left hoop backboard */}
        <Rect 
          x={SCREEN_WIDTH * 0.02} 
          y={SCREEN_HEIGHT * 0.15} 
          width={8} 
          height={50} 
          fill="#FFFFFF"
          stroke="url(#hoopGradient)"
          strokeWidth={3}
        />
        
        {/* Left hoop rim */}
        <Ellipse 
          cx={SCREEN_WIDTH * 0.06} 
          cy={SCREEN_HEIGHT * 0.25} 
          rx={25} 
          ry={4} 
          fill="none" 
          stroke="url(#hoopGradient)" 
          strokeWidth={5}
        />
        
        {/* Left hoop net */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = SCREEN_WIDTH * 0.035 + (i * 5);
          return (
            <Line 
              key={`left-net-${i}`}
              x1={x} 
              y1={SCREEN_HEIGHT * 0.25} 
              x2={x + 2} 
              y2={SCREEN_HEIGHT * 0.25 + 15} 
              stroke="#FFFFFF" 
              strokeWidth={2}
              opacity={0.9}
            />
          );
        })}
        
        {/* RIGHT BASKETBALL HOOP */}
        {/* Right hoop backboard */}
        <Rect 
          x={SCREEN_WIDTH * 0.97} 
          y={SCREEN_HEIGHT * 0.15} 
          width={8} 
          height={50} 
          fill="#FFFFFF"
          stroke="url(#hoopGradient)"
          strokeWidth={3}
        />
        
        {/* Right hoop rim */}
        <Ellipse 
          cx={SCREEN_WIDTH * 0.94} 
          cy={SCREEN_HEIGHT * 0.25} 
          rx={25} 
          ry={4} 
          fill="none" 
          stroke="url(#hoopGradient)" 
          strokeWidth={5}
        />
        
        {/* Right hoop net */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = SCREEN_WIDTH * 0.915 + (i * 5);
          return (
            <Line 
              key={`right-net-${i}`}
              x1={x} 
              y1={SCREEN_HEIGHT * 0.25} 
              x2={x + 2} 
              y2={SCREEN_HEIGHT * 0.25 + 15} 
              stroke="#FFFFFF" 
              strokeWidth={2}
              opacity={0.9}
            />
          );
        })}
        
        {/* Center court line */}
        <Line 
          x1={SCREEN_WIDTH / 2} 
          y1={SCREEN_HEIGHT * 0.4} 
          x2={SCREEN_WIDTH / 2} 
          y2={SCREEN_HEIGHT} 
          stroke="#FFFFFF" 
          strokeWidth={4}
        />
        
        {/* Left three-point arc */}
        <Path 
          d={`M ${SCREEN_WIDTH * 0.05} ${SCREEN_HEIGHT * 0.4} 
              Q ${SCREEN_WIDTH * 0.25} ${SCREEN_HEIGHT * 0.6} 
              ${SCREEN_WIDTH * 0.05} ${SCREEN_HEIGHT}`}
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={4}
        />
        
        {/* Right three-point arc */}
        <Path 
          d={`M ${SCREEN_WIDTH * 0.95} ${SCREEN_HEIGHT * 0.4} 
              Q ${SCREEN_WIDTH * 0.75} ${SCREEN_HEIGHT * 0.6} 
              ${SCREEN_WIDTH * 0.95} ${SCREEN_HEIGHT}`}
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={4}
        />
        
        {/* Left free throw circle */}
        <Circle 
          cx={SCREEN_WIDTH * 0.15} 
          cy={SCREEN_HEIGHT * 0.7} 
          r={30} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={4}
        />
        
        {/* Right free throw circle */}
        <Circle 
          cx={SCREEN_WIDTH * 0.85} 
          cy={SCREEN_HEIGHT * 0.7} 
          r={30} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={4}
        />
        
        {/* Center court circle */}
        <Circle 
          cx={SCREEN_WIDTH / 2} 
          cy={SCREEN_HEIGHT * 0.7} 
          r={40} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={4}
        />
        
        {/* Court boundary lines */}
        <Rect 
          x={SCREEN_WIDTH * 0.05}
          y={SCREEN_HEIGHT * 0.4} 
          width={SCREEN_WIDTH * 0.9} 
          height={SCREEN_HEIGHT * 0.55} 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth={4}
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