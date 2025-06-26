import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Share, Navigation, Clock, Users, Wifi, WifiOff } from 'lucide-react-native';

export default function LocationScreen() {
  const [isSharing, setIsSharing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    address: '123 Main St, New York, NY 10001',
    accuracy: '±3 meters',
  });

  const [sharedWith, setSharedWith] = useState([
    { name: 'Mom', status: 'received', time: '2 minutes ago' },
    { name: 'John Smith', status: 'delivered', time: '5 minutes ago' },
  ]);

  const handleToggleSharing = () => {
    if (isSharing) {
      Alert.alert(
        'Stop Sharing Location',
        'Are you sure you want to stop sharing your location with emergency contacts?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Stop Sharing',
            style: 'destructive',
            onPress: () => setIsSharing(false),
          },
        ]
      );
    } else {
      setIsSharing(true);
      Alert.alert(
        'Location Sharing Started',
        'Your location is now being shared with your emergency contacts.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleShareOnce = () => {
    Alert.alert(
      'Share Current Location',
      'Send your current location to emergency contacts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Share',
          onPress: () => {
            Alert.alert('Location Shared', 'Your current location has been sent to your emergency contacts.');
          },
        },
      ]
    );
  };

  const quickActions = [
    {
      title: 'Share Once',
      subtitle: 'Send current location',
      icon: Share,
      color: '#3B82F6',
      action: handleShareOnce,
    },
    {
      title: 'Get Directions',
      subtitle: 'Navigate to safety',
      icon: Navigation,
      color: '#059669',
      action: () => Alert.alert('Navigation', 'Opening navigation app...'),
    },
    {
      title: 'Location History',
      subtitle: 'View past locations',
      icon: Clock,
      color: '#7C3AED',
      action: () => Alert.alert('History', 'Location history feature coming soon!'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Sharing</Text>
        <Text style={styles.subtitle}>
          Share your location with trusted contacts for safety
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIndicator}>
              <MapPin size={24} color={isSharing ? '#059669' : '#6B7280'} strokeWidth={2} />
              <Text style={[styles.statusTitle, isSharing && styles.statusTitleActive]}>
                {isSharing ? 'Location Sharing Active' : 'Location Sharing Off'}
              </Text>
            </View>
            <View style={styles.connectionStatus}>
              {isOnline ? (
                <Wifi size={20} color="#059669" strokeWidth={2} />
              ) : (
                <WifiOff size={20} color="#EF4444" strokeWidth={2} />
              )}
            </View>
          </View>
          
          <View style={styles.locationInfo}>
            <Text style={styles.locationAddress}>{currentLocation.address}</Text>
            <Text style={styles.locationAccuracy}>Accuracy: {currentLocation.accuracy}</Text>
          </View>

          <TouchableOpacity 
            style={[styles.shareButton, isSharing && styles.shareButtonActive]}
            onPress={handleToggleSharing}>
            <Text style={[styles.shareButtonText, isSharing && styles.shareButtonTextActive]}>
              {isSharing ? 'Stop Sharing Location' : 'Start Sharing Location'}
            </Text>
          </TouchableOpacity>
        </View>

        {isSharing && (
          <View style={styles.sharingDetailsCard}>
            <View style={styles.sharingDetailsHeader}>
              <Users size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.sharingDetailsTitle}>Sharing With</Text>
            </View>
            
            {sharedWith.map((contact, index) => (
              <View key={index} style={styles.sharedContact}>
                <Text style={styles.sharedContactName}>{contact.name}</Text>
                <View style={styles.sharedContactStatus}>
                  <View style={[
                    styles.statusDot,
                    contact.status === 'received' && styles.statusDotReceived,
                    contact.status === 'delivered' && styles.statusDotDelivered,
                  ]} />
                  <Text style={styles.sharedContactTime}>{contact.time}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.quickActionCard}
              onPress={action.action}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                <action.icon size={24} color={action.color} strokeWidth={2} />
              </View>
              <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.privacyContainer}>
          <Text style={styles.privacyTitle}>Privacy & Security</Text>
          <Text style={styles.privacyText}>
            Your location data is encrypted and only shared with your selected emergency contacts. 
            Location sharing can be stopped at any time, and location history is automatically 
            deleted after 30 days.
          </Text>
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
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginLeft: 12,
  },
  statusTitleActive: {
    color: '#059669',
  },
  connectionStatus: {
    padding: 8,
  },
  locationInfo: {
    marginBottom: 20,
  },
  locationAddress: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 4,
  },
  locationAccuracy: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  shareButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  shareButtonActive: {
    backgroundColor: '#DC2626',
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  shareButtonTextActive: {
    color: '#FFFFFF',
  },
  sharingDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sharingDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sharingDetailsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginLeft: 8,
  },
  sharedContact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sharedContactName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  sharedContactStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6B7280',
    marginRight: 8,
  },
  statusDotReceived: {
    backgroundColor: '#059669',
  },
  statusDotDelivered: {
    backgroundColor: '#3B82F6',
  },
  sharedContactTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionCard: {
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
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  privacyContainer: {
    margin: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 20,
  },
  privacyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
});