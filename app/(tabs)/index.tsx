import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Phone, MapPin, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function EmergencyScreen() {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const pulseScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    if (isSOSActive) {
      pulseScale.value = withRepeat(
        withSequence(
          withSpring(1.1, { duration: 600 }),
          withSpring(1, { duration: 600 })
        ),
        -1,
        false
      );
    } else {
      pulseScale.value = withSpring(1);
    }
  }, [isSOSActive]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleSOSPress = () => {
    buttonScale.value = withSequence(
      withSpring(0.95, { duration: 100 }),
      withSpring(1, { duration: 100 })
    );

    if (!isSOSActive) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            activateSOS();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      deactivateSOS();
    }
  };

  const activateSOS = () => {
    setIsSOSActive(true);
    Alert.alert(
      'SOS Activated',
      'Emergency services have been notified. Your location is being shared with emergency contacts.',
      [{ text: 'OK' }]
    );
  };

  const deactivateSOS = () => {
    setIsSOSActive(false);
    setCountdown(0);
    Alert.alert('SOS Deactivated', 'Emergency alert has been cancelled.', [{ text: 'OK' }]);
  };

  const quickActions = [
    { title: 'Call 911', icon: Phone, color: '#DC2626', action: () => {} },
    { title: 'Share Location', icon: MapPin, color: '#059669', action: () => {} },
    { title: 'Medical Alert', icon: AlertTriangle, color: '#D97706', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency</Text>
        <Text style={styles.subtitle}>
          {isSOSActive ? 'SOS ACTIVE - Help is on the way' : 'Tap SOS button for emergency help'}
        </Text>
      </View>

      <View style={styles.sosContainer}>
        <Animated.View style={[styles.sosButtonOuter, animatedPulseStyle]}>
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity
              style={[styles.sosButton, isSOSActive && styles.sosButtonActive]}
              onPress={handleSOSPress}
              activeOpacity={0.8}>
              <Shield 
                size={60} 
                color="#FFFFFF" 
                strokeWidth={2} 
              />
              <Text style={styles.sosButtonText}>
                {countdown > 0 ? countdown : 'SOS'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        
        {isSOSActive && (
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>EMERGENCY ACTIVE</Text>
            </View>
            <Text style={styles.statusDescription}>
              Location shared • Contacts notified • Emergency services alerted
            </Text>
          </View>
        )}
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.quickActionButton, { borderColor: action.color }]}
              onPress={action.action}>
              <action.icon size={24} color={action.color} strokeWidth={2} />
              <Text style={[styles.quickActionText, { color: action.color }]}>
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Safety Tip</Text>
        <Text style={styles.tipText}>
          Set up your emergency contacts and medical information in your profile for faster emergency response.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  sosContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  sosButtonOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  sosButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  sosButtonActive: {
    backgroundColor: '#DC2626',
  },
  sosButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  statusDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },
  tipContainer: {
    margin: 24,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
});