import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard as Edit, Heart, FileText, Settings, Bell, Lock, CircleHelp as HelpCircle, Shield } from 'lucide-react-native';

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    emergencyInfo: 'Type 1 Diabetes, Allergic to Penicillin',
    bloodType: 'O+',
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      color: '#3B82F6',
      items: [
        { label: 'Full Name', value: profile.name },
        { label: 'Phone Number', value: profile.phone },
        { label: 'Email Address', value: profile.email },
      ],
    },
    {
      title: 'Medical Information',
      icon: Heart,
      color: '#EF4444',
      items: [
        { label: 'Blood Type', value: profile.bloodType },
        { label: 'Medical Conditions', value: profile.emergencyInfo },
        { label: 'Emergency Contacts', value: '3 contacts added' },
      ],
    },
  ];

  const settingsSections = [
    {
      title: 'App Settings',
      items: [
        {
          icon: Bell,
          title: 'Notifications',
          subtitle: 'Emergency alerts and check-in reminders',
          value: notificationsEnabled,
          onPress: () => setNotificationsEnabled(!notificationsEnabled),
        },
        {
          icon: Lock,
          title: 'Privacy & Security',
          subtitle: 'Manage your data and privacy settings',
          onPress: () => Alert.alert('Privacy Settings', 'Privacy settings coming soon!'),
        },
        {
          icon: Settings,
          title: 'App Preferences',
          subtitle: 'Customize your app experience',
          onPress: () => Alert.alert('Preferences', 'App preferences coming soon!'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          onPress: () => Alert.alert('Support', 'Support center coming soon!'),
        },
        {
          icon: FileText,
          title: 'Legal & Terms',
          subtitle: 'Privacy policy and terms of service',
          onPress: () => Alert.alert('Legal', 'Legal documents coming soon!'),
        },
      ],
    },
  ];

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleEditMedicalInfo = () => {
    Alert.alert('Medical Information', 'Medical information editing feature coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          Manage your personal and emergency information
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#FFFFFF" strokeWidth={2} />
            </View>
            <View style={styles.statusBadge}>
              <Shield size={12} color="#FFFFFF" strokeWidth={2} />
            </View>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
        </View>

        {profileSections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <section.icon size={20} color={section.color} strokeWidth={2} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <TouchableOpacity 
                onPress={section.title === 'Personal Information' ? handleEditProfile : handleEditMedicalInfo}>
                <Edit size={16} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.infoItem}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {settingsSections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={styles.settingItem}
                  onPress={item.onPress}>
                  <View style={styles.settingIcon}>
                    <item.icon size={20} color="#6B7280" strokeWidth={2} />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.value !== undefined && (
                    <View style={[styles.toggle, item.value && styles.toggleActive]}>
                      <Text style={[styles.toggleText, item.value && styles.toggleTextActive]}>
                        {item.value ? 'ON' : 'OFF'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.emergencyInfoContainer}>
          <Text style={styles.emergencyInfoTitle}>Emergency Information Access</Text>
          <Text style={styles.emergencyInfoText}>
            Your medical information and emergency contacts can be accessed from your device's 
            lock screen during emergencies. This helps first responders provide appropriate care.
          </Text>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Raksha Safety App v1.0.0</Text>
          <Text style={styles.versionSubtext}>Your safety is our priority</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  sectionContainer: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
    marginLeft: 8,
  },
  sectionContent: {
    gap: 12,
  },
  infoItem: {
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  toggle: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  toggleActive: {
    backgroundColor: '#059669',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  emergencyInfoContainer: {
    margin: 24,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  emergencyInfoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#991B1B',
    marginBottom: 8,
  },
  emergencyInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
    lineHeight: 20,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
});