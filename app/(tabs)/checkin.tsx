import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Check, TriangleAlert as AlertTriangle, Play, Square, Settings } from 'lucide-react-native';

interface CheckIn {
  id: string;
  time: string;
  status: 'completed' | 'missed' | 'pending';
  location?: string;
}

export default function CheckInScreen() {
  const [isScheduleActive, setIsScheduleActive] = useState(true);
  const [nextCheckIn, setNextCheckIn] = useState('2:00 PM');
  const [checkInHistory, setCheckInHistory] = useState<CheckIn[]>([
    {
      id: '1',
      time: '12:00 PM',
      status: 'completed',
      location: 'Home',
    },
    {
      id: '2',
      time: '10:00 AM',
      status: 'completed',
      location: 'Office',
    },
    {
      id: '3',
      time: '8:00 AM',
      status: 'missed',
    },
  ]);

  const handleCheckIn = () => {
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      location: 'Current Location',
    };
    
    setCheckInHistory([newCheckIn, ...checkInHistory]);
    Alert.alert(
      'Check-in Successful',
      'Your safety check-in has been recorded and shared with your emergency contacts.',
      [{ text: 'OK' }]
    );
  };

  const handleToggleSchedule = () => {
    setIsScheduleActive(!isScheduleActive);
    const message = isScheduleActive 
      ? 'Automatic check-ins have been disabled. Your emergency contacts will not receive scheduled updates.'
      : 'Automatic check-ins have been enabled. Your emergency contacts will receive regular updates.';
    
    Alert.alert('Schedule Updated', message, [{ text: 'OK' }]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#059669';
      case 'missed':
        return '#EF4444';
      case 'pending':
        return '#D97706';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return Check;
      case 'missed':
        return AlertTriangle;
      case 'pending':
        return Clock;
      default:
        return Clock;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Safety Check-ins</Text>
        <Text style={styles.subtitle}>
          Regular check-ins to keep your loved ones informed
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Check-in Schedule</Text>
            <TouchableOpacity onPress={handleToggleSchedule}>
              {isScheduleActive ? (
                <Square size={24} color="#EF4444" strokeWidth={2} />
              ) : (
                <Play size={24} color="#059669" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.scheduleInfo}>
            <Text style={[styles.scheduleStatus, isScheduleActive && styles.scheduleStatusActive]}>
              {isScheduleActive ? 'Active' : 'Paused'}
            </Text>
            {isScheduleActive && (
              <Text style={styles.nextCheckIn}>
                Next check-in: {nextCheckIn}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
            <Check size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.checkInButtonText}>Check In Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Recent Check-ins</Text>
          
          {checkInHistory.map((checkIn) => {
            const StatusIcon = getStatusIcon(checkIn.status);
            const statusColor = getStatusColor(checkIn.status);
            
            return (
              <View key={checkIn.id} style={styles.historyItem}>
                <View style={[styles.statusIndicator, { backgroundColor: `${statusColor}15` }]}>
                  <StatusIcon size={20} color={statusColor} strokeWidth={2} />
                </View>
                
                <View style={styles.historyContent}>
                  <Text style={styles.historyTime}>{checkIn.time}</Text>
                  <Text style={[styles.historyStatus, { color: statusColor }]}>
                    {checkIn.status.charAt(0).toUpperCase() + checkIn.status.slice(1)}
                  </Text>
                  {checkIn.location && (
                    <Text style={styles.historyLocation}>{checkIn.location}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.settingsCard}>
          <View style={styles.settingsContent}>
            <Settings size={24} color="#6B7280" strokeWidth={2} />
            <View style={styles.settingsText}>
              <Text style={styles.settingsTitle}>Check-in Settings</Text>
              <Text style={styles.settingsSubtitle}>
                Customize frequency and notification preferences
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How Safety Check-ins Work</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>1</Text>
            <Text style={styles.infoText}>
              Set up automatic check-ins at regular intervals (hourly, daily, etc.)
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>2</Text>
            <Text style={styles.infoText}>
              Receive reminders when it's time to check in
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>3</Text>
            <Text style={styles.infoText}>
              Emergency contacts are alerted if you miss consecutive check-ins
            </Text>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    margin: 24,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  scheduleInfo: {
    marginBottom: 20,
  },
  scheduleStatus: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  scheduleStatusActive: {
    color: '#059669',
  },
  nextCheckIn: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  checkInButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  historyContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyContent: {
    flex: 1,
  },
  historyTime: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  historyStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  historyLocation: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 24,
    marginTop: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsText: {
    marginLeft: 16,
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  infoContainer: {
    margin: 24,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
});