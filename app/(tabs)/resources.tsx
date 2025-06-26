import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, MessageCircle, Globe, Heart, Shield, Users, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface Resource {
  id: string;
  title: string;
  subtitle: string;
  phone?: string;
  website?: string;
  category: 'emergency' | 'mental-health' | 'support' | 'safety';
  icon: any;
  color: string;
}

export default function ResourcesScreen() {
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Emergency Services',
      subtitle: '911 - Police, Fire, Medical',
      phone: '911',
      category: 'emergency',
      icon: AlertTriangle,
      color: '#EF4444',
    },
    {
      id: '2',
      title: 'National Suicide Prevention Lifeline',
      subtitle: '24/7 crisis support',
      phone: '988',
      website: 'https://suicidepreventionlifeline.org',
      category: 'mental-health',
      icon: Heart,
      color: '#7C3AED',
    },
    {
      id: '3',
      title: 'Crisis Text Line',
      subtitle: 'Text HOME to 741741',
      phone: '741741',
      website: 'https://crisistextline.org',
      category: 'mental-health',
      icon: MessageCircle,
      color: '#3B82F6',
    },
    {
      id: '4',
      title: 'National Domestic Violence Hotline',
      subtitle: '24/7 confidential support',
      phone: '1-800-799-7233',
      website: 'https://thehotline.org',
      category: 'safety',
      icon: Shield,
      color: '#059669',
    },
    {
      id: '5',
      title: 'SAMHSA National Helpline',
      subtitle: 'Mental health & substance abuse',
      phone: '1-800-662-4357',
      website: 'https://samhsa.gov',
      category: 'mental-health',
      icon: Users,
      color: '#D97706',
    },
    {
      id: '6',
      title: 'National Sexual Assault Hotline',
      subtitle: 'RAINN - 24/7 support',
      phone: '1-800-656-4673',
      website: 'https://rainn.org',
      category: 'support',
      icon: Shield,
      color: '#DC2626',
    },
  ];

  const handleCall = (phone: string, title: string) => {
    Alert.alert(
      'Call Resource',
      `Call ${title} at ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            // In a real app, this would make the call
            console.log(`Calling ${phone}`);
            Alert.alert('Calling...', `Dialing ${phone}`);
          },
        },
      ]
    );
  };

  const handleWebsite = (website: string, title: string) => {
    Alert.alert(
      'Open Website',
      `Open ${title} website?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open',
          onPress: () => {
            // In a real app, this would open the website
            console.log(`Opening ${website}`);
            Alert.alert('Opening...', `Opening ${title} website`);
          },
        },
      ]
    );
  };

  const categories = [
    { key: 'emergency', title: 'Emergency Services', color: '#EF4444' },
    { key: 'mental-health', title: 'Mental Health', color: '#7C3AED' },
    { key: 'safety', title: 'Personal Safety', color: '#059669' },
    { key: 'support', title: 'Support Services', color: '#D97706' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crisis Resources</Text>
        <Text style={styles.subtitle}>
          24/7 helplines and support services for any emergency
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {categories.map((category) => {
          const categoryResources = resources.filter(r => r.category === category.key);
          
          if (categoryResources.length === 0) return null;

          return (
            <View key={category.key} style={styles.categoryContainer}>
              <Text style={[styles.categoryTitle, { color: category.color }]}>
                {category.title}
              </Text>
              
              {categoryResources.map((resource) => (
                <View key={resource.id} style={styles.resourceCard}>
                  <View style={[styles.resourceIcon, { backgroundColor: `${resource.color}15` }]}>
                    <resource.icon size={24} color={resource.color} strokeWidth={2} />
                  </View>
                  
                  <View style={styles.resourceContent}>
                    <Text style={styles.resourceTitle}>{resource.title}</Text>
                    <Text style={styles.resourceSubtitle}>{resource.subtitle}</Text>
                    
                    <View style={styles.resourceActions}>
                      {resource.phone && (
                        <TouchableOpacity 
                          style={[styles.actionButton, styles.callButton]}
                          onPress={() => handleCall(resource.phone!, resource.title)}>
                          <Phone size={16} color="#FFFFFF" strokeWidth={2} />
                          <Text style={styles.actionButtonText}>Call</Text>
                        </TouchableOpacity>
                      )}
                      
                      {resource.website && (
                        <TouchableOpacity 
                          style={[styles.actionButton, styles.websiteButton]}
                          onPress={() => handleWebsite(resource.website!, resource.title)}>
                          <Globe size={16} color="#3B82F6" strokeWidth={2} />
                          <Text style={[styles.actionButtonText, styles.websiteButtonText]}>Website</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          );
        })}

        <View style={styles.emergencyTipContainer}>
          <Text style={styles.emergencyTipTitle}>In Case of Immediate Danger</Text>
          <Text style={styles.emergencyTipText}>
            If you or someone else is in immediate physical danger, call 911 immediately. 
            These resources are for support and crisis intervention, but emergency services 
            should be contacted for life-threatening situations.
          </Text>
          
          <TouchableOpacity 
            style={styles.emergencyCallButton}
            onPress={() => handleCall('911', 'Emergency Services')}>
            <Phone size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.emergencyCallButtonText}>Emergency 911</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About These Resources</Text>
          <Text style={styles.infoText}>
            All listed resources provide free, confidential support. Many are available 24/7 
            and offer multiple ways to get help including phone, text, and online chat. 
            These services are staffed by trained professionals who can provide immediate 
            support and connect you with local resources.
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
  categoryContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  resourceSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  resourceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  callButton: {
    backgroundColor: '#059669',
  },
  websiteButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  websiteButtonText: {
    color: '#3B82F6',
  },
  emergencyTipContainer: {
    margin: 24,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  emergencyTipTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#991B1B',
    marginBottom: 12,
  },
  emergencyTipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyCallButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  emergencyCallButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  infoContainer: {
    margin: 24,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
});